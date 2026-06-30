"use client";

import React from 'react';

// Figma 688-1424 — Avatar
// Sizes: xs=24 sm=38 md=42 lg=52 xl=80
// Corners: Square=0 / Semi Radius=4 / Radius=8,8,12,16,16 / Full Radius=9999
// Badge: green dot, size & offset vary by avatar size

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarCorner = 'Square' | 'Semi' | 'Semi Radius' | 'Radius' | 'Full' | 'Full Radius';
export type AvatarVariant = 'Image' | 'Initials';

export type AvatarProps = {
  size?: AvatarSize;
  corner?: AvatarCorner;
  variant?: AvatarVariant;
  initials?: string;
  badge?: boolean;
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
};

const SIZE: Record<AvatarSize, { px: number; fontSize: number; lineHeight: number; badgePx: number }> = {
  xs: { px: 24, fontSize: 10, lineHeight: 18, badgePx: 8  },
  sm: { px: 38, fontSize: 14, lineHeight: 22, badgePx: 14 },
  md: { px: 42, fontSize: 16, lineHeight: 24, badgePx: 16 },
  lg: { px: 52, fontSize: 20, lineHeight: 28, badgePx: 18 },
  xl: { px: 80, fontSize: 28, lineHeight: 40, badgePx: 22 },
};

// Radius per corner type × size
const RADIUS: Record<string, Record<AvatarSize, number>> = {
  Square:         { xs: 0,    sm: 0,    md: 0,    lg: 0,    xl: 0    },
  'Semi Radius':  { xs: 4,    sm: 4,    md: 4,    lg: 4,    xl: 4    },
  Radius:         { xs: 8,    sm: 8,    md: 12,   lg: 16,   xl: 16   },
  'Full Radius':  { xs: 9999, sm: 9999, md: 9999, lg: 9999, xl: 9999 },
};
// legacy aliases
RADIUS['Semi'] = RADIUS['Semi Radius'];
RADIUS['Full'] = RADIUS['Full Radius'];

function badgeOffset(badgePx: number, isFullRadius: boolean): number {
  return isFullRadius ? -Math.round(badgePx * 0.15) : -Math.round(badgePx * 0.45);
}

const PLACEHOLDER_SVG = (
  <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
    <rect width="40" height="40" fill="#e2e8f0"/>
    <circle cx="20" cy="15" r="7" fill="#94a3b8"/>
    <ellipse cx="20" cy="35" rx="13" ry="10" fill="#94a3b8"/>
  </svg>
);

export function Avatar({
  size = 'md',
  corner = 'Full Radius',
  variant = 'Initials',
  initials = 'TG',
  badge = false,
  src,
  alt,
  className = '',
  style: styleProp,
}: AvatarProps) {
  const cfg = SIZE[size];
  const cornerKey = corner in RADIUS ? corner : 'Full Radius';
  const radius = RADIUS[cornerKey][size];
  const isFullRadius = cornerKey === 'Full Radius' || cornerKey === 'Full';
  const offset = badge ? badgeOffset(cfg.badgePx, isFullRadius) : 0;

  return (
    <div
      className={`relative inline-flex flex-shrink-0 ${className}`}
      style={{ width: cfg.px, height: cfg.px, ...styleProp }}
    >
      {/* Avatar body */}
      <div
        style={{
          width: cfg.px,
          height: cfg.px,
          borderRadius: radius,
          overflow: 'hidden',
          backgroundColor: '#0043ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {variant === 'Image' ? (
          src ? (
            <img src={src} alt={alt ?? initials} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : PLACEHOLDER_SVG
        ) : (
          <span style={{
            fontSize: cfg.fontSize,
            lineHeight: `${cfg.lineHeight}px`,
            fontWeight: 600,
            color: '#ffffff',
            userSelect: 'none',
          }}>
            {initials}
          </span>
        )}
      </div>

      {/* Badge */}
      {badge && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: cfg.badgePx,
            height: cfg.badgePx,
            borderRadius: '50%',
            backgroundColor: '#22ad5c',
            border: '2px solid #ffffff',
            top: offset,
            right: offset,
          }}
        />
      )}
    </div>
  );
}
