"use client";

import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarCorner = 'Square' | 'Semi' | 'Radius' | 'Full';
export type AvatarVariant = 'Image' | 'Initials';

export type AvatarProps = {
  size?: AvatarSize;
  corner?: AvatarCorner;
  variant?: AvatarVariant;
  initials?: string;
  badge?: boolean;
  src?: string;
};

const sizeConfig: Record<AvatarSize, { px: string; textSize: string; badgeSize: string; badgePos: string }> = {
  xs: { px: 'w-6 h-6',           textSize: 'text-[10px] font-semibold', badgeSize: 'w-2 h-2',           badgePos: '-bottom-0.5 -right-0.5' },
  sm: { px: 'w-[38px] h-[38px]', textSize: 'text-sm font-semibold',     badgeSize: 'w-3.5 h-3.5',       badgePos: '-bottom-0.5 -right-0.5' },
  md: { px: 'w-[42px] h-[42px]', textSize: 'text-base font-semibold',   badgeSize: 'w-4 h-4',           badgePos: '-bottom-0.5 -right-0.5' },
  lg: { px: 'w-[52px] h-[52px]', textSize: 'text-xl font-semibold',     badgeSize: 'w-[18px] h-[18px]', badgePos: '-bottom-0.5 -right-0.5' },
  xl: { px: 'w-20 h-20',         textSize: 'text-[28px] font-semibold', badgeSize: 'w-[22px] h-[22px]', badgePos: '-bottom-0.5 -right-0.5' },
};

const cornerRadius: Record<AvatarCorner, Record<AvatarSize, string>> = {
  Square: { xs: 'rounded-none', sm: 'rounded-none', md: 'rounded-none', lg: 'rounded-none', xl: 'rounded-none' },
  Semi:   { xs: 'rounded',      sm: 'rounded',      md: 'rounded',      lg: 'rounded',      xl: 'rounded' },
  Radius: { xs: 'rounded-lg',   sm: 'rounded-lg',   md: 'rounded-xl',   lg: 'rounded-2xl',  xl: 'rounded-2xl' },
  Full:   { xs: 'rounded-full', sm: 'rounded-full', md: 'rounded-full', lg: 'rounded-full', xl: 'rounded-full' },
};

export function Avatar({ size = 'md', corner = 'Full', variant = 'Initials', initials = 'TG', badge = false, src }: AvatarProps) {
  const cfg = sizeConfig[size];
  const radius = cornerRadius[corner][size];

  return (
    <div className="relative inline-flex flex-shrink-0">
      <div className={`${cfg.px} ${radius} overflow-hidden bg-[#0043ff] flex items-center justify-center`}>
        {variant === 'Image' && src ? (
          <img src={src} alt={initials} className="w-full h-full object-cover" />
        ) : variant === 'Image' ? (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <rect width="40" height="40" fill="#e2e8f0"/>
            <circle cx="20" cy="15" r="7" fill="#94a3b8"/>
            <ellipse cx="20" cy="35" rx="13" ry="10" fill="#94a3b8"/>
          </svg>
        ) : (
          <span className={`${cfg.textSize} text-white leading-none`}>{initials}</span>
        )}
      </div>
      {badge && (
        <span className={`absolute ${cfg.badgePos} ${cfg.badgeSize} rounded-full bg-[#22c55e] border-2 border-white`} />
      )}
    </div>
  );
}