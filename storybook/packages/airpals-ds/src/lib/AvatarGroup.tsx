"use client";

import React from 'react';

export type AvatarGroupSize = 'md' | 'lg';

export type AvatarGroupItem = {
  src?: string;
  initials?: string;
  alt?: string;
};

export type AvatarGroupProps = {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: AvatarGroupSize;
  total?: number;
};

const sizeConfig: Record<AvatarGroupSize, { px: number; font: string; offset: number; border: number }> = {
  md: { px: 50, font: 'text-sm font-semibold', offset: 38, border: 2 },
  lg: { px: 60, font: 'text-base font-semibold', offset: 48, border: 2 },
};

export function AvatarGroup({ avatars, max = 4, size = 'lg', total }: AvatarGroupProps) {
  const cfg = sizeConfig[size];
  const visible = avatars.slice(0, max);
  const remaining = (total ?? avatars.length) - visible.length;
  const items = remaining > 0 ? [...visible, null] : visible;
  const totalWidth = cfg.px + (items.length - 1) * cfg.offset;

  return (
    <div className="relative inline-flex" style={{ width: totalWidth, height: cfg.px }}>
      {items.map((item, i) => {
        const left = i * cfg.offset;
        const isCounter = item === null;

        const baseClass = [
          'absolute rounded-full flex items-center justify-center overflow-hidden',
          cfg.font,
        ].join(' ');

        const borderStyle = {
          width: cfg.px,
          height: cfg.px,
          left,
          top: 0,
          border: `${cfg.border}px solid white`,
          zIndex: items.length - i,
        };

        if (isCounter) {
          return (
            <div
              key="counter"
              className={`${baseClass} bg-surface-secondary text-ink-accent`}
              style={borderStyle}
            >
              +{remaining}
            </div>
          );
        }

        if (item!.src) {
          return (
            <img
              key={i}
              src={item!.src}
              alt={item!.alt ?? ''}
              className="absolute rounded-full object-cover"
              style={borderStyle}
            />
          );
        }

        return (
          <div
            key={i}
            className={`${baseClass} bg-surface-accent text-ink-on-accent`}
            style={borderStyle}
          >
            {item!.initials ?? '?'}
          </div>
        );
      })}
    </div>
  );
}
