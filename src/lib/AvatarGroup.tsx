"use client";

import React from 'react';

// Figma 747-8469 — AvatarGroup
// Sizes: xs=20 sm=24 md=40 lg=48 xl=56 (group-specific, not Avatar sizes)
// Overlap: 10px negative margin (mr-[-10px]) on all except last
// Always Full Radius (circles)

export type AvatarGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'Extra Small' | 'Small' | 'Medium' | 'Large' | 'Extra Large';

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
  className?: string;
};

const SIZE_MAP: Record<string, { px: number; fontSize: number }> = {
  'xs':          { px: 20, fontSize: 9  },
  'sm':          { px: 24, fontSize: 10 },
  'md':          { px: 40, fontSize: 14 },
  'lg':          { px: 48, fontSize: 16 },
  'xl':          { px: 56, fontSize: 18 },
  'Extra Small': { px: 20, fontSize: 9  },
  'Small':       { px: 24, fontSize: 10 },
  'Medium':      { px: 40, fontSize: 14 },
  'Large':       { px: 48, fontSize: 16 },
  'Extra Large': { px: 56, fontSize: 18 },
};

const OVERLAP = 10;

const PLACEHOLDER_SVG = (
  <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
    <rect width="40" height="40" fill="#e2e8f0"/>
    <circle cx="20" cy="15" r="7" fill="#94a3b8"/>
    <ellipse cx="20" cy="35" rx="13" ry="10" fill="#94a3b8"/>
  </svg>
);

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  total,
  className = '',
}: AvatarGroupProps) {
  const cfg = SIZE_MAP[size] ?? SIZE_MAP['md'];
  const visible = avatars.slice(0, max);
  const remaining = (total ?? avatars.length) - visible.length;
  const items: (AvatarGroupItem | null)[] = remaining > 0 ? [...visible, null] : visible;

  const step = cfg.px - OVERLAP;
  const totalWidth = cfg.px + (items.length - 1) * step;

  return (
    <div
      className={`relative inline-flex ${className}`}
      style={{ width: totalWidth, height: cfg.px }}
    >
      {items.map((item, i) => {
        const left = i * step;
        const zIndex = items.length - i;
        const isCounter = item === null;

        const baseStyle: React.CSSProperties = {
          position: 'absolute',
          left,
          top: 0,
          width: cfg.px,
          height: cfg.px,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          zIndex,
        };

        if (isCounter) {
          return (
            <div
              key="counter"
              style={{ ...baseStyle, backgroundColor: '#e6f1fd', color: '#0043ff' }}
            >
              <span style={{ fontSize: cfg.fontSize, fontWeight: 600, lineHeight: 1 }}>
                +{remaining}
              </span>
            </div>
          );
        }

        if (item!.src) {
          return (
            <img
              key={i}
              src={item!.src}
              alt={item!.alt ?? item!.initials ?? ''}
              style={{ ...baseStyle, objectFit: 'cover' }}
            />
          );
        }

        if (item!.initials) {
          return (
            <div key={i} style={{ ...baseStyle, backgroundColor: '#0043ff' }}>
              <span style={{ fontSize: cfg.fontSize, fontWeight: 600, color: '#ffffff', lineHeight: 1, userSelect: 'none' }}>
                {item!.initials}
              </span>
            </div>
          );
        }

        // Image placeholder
        return (
          <div key={i} style={{ ...baseStyle, backgroundColor: '#e2e8f0' }}>
            {PLACEHOLDER_SVG}
          </div>
        );
      })}
    </div>
  );
}
