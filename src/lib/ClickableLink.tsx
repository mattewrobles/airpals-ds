"use client";

import React from 'react';

export type LinkColor = 'Blue' | 'Dark Blue';
export type LinkForm  = 'Normal' | 'Line';
export type LinkSize  = 'sm' | 'lg';
export type LinkState = 'Default' | 'Hover';

export type ClickableLinkProps = {
  label: string;
  href?: string;
  color?: LinkColor;
  form?: LinkForm;
  size?: LinkSize;
  state?: LinkState;
  external?: boolean;
  onClick?: () => void;
  className?: string;
};

// Figma node 574-60 — inline link, 2 colors × 2 forms × 2 sizes
const EXTERNAL_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline ml-0.5 -mt-0.5" aria-hidden="true">
    <path d="M10 6.5V10a.5.5 0 01-.5.5h-7A.5.5 0 012 10V3a.5.5 0 01.5-.5H6M8 1.5h2.5M10.5 1.5v2.5M10.5 1.5L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function ClickableLink({
  label,
  href,
  color = 'Blue',
  form = 'Normal',
  size = 'sm',
  state,
  external = false,
  onClick,
  className = '',
}: ClickableLinkProps) {
  const colorCls = color === 'Blue'
    ? 'text-ink-accent hover:opacity-75'
    : 'text-ink-primary hover:opacity-75';

  const sizeCls = size === 'lg' ? 'text-lg leading-5' : 'text-sm leading-5';

  const underline = form === 'Line' || state === 'Hover'
    ? 'underline underline-offset-2'
    : 'hover:underline hover:underline-offset-2';

  const cls = `font-medium whitespace-nowrap transition-opacity cursor-pointer ${colorCls} ${sizeCls} ${underline} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cls}
      >
        {label}
        {external && EXTERNAL_ICON}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${cls} bg-transparent border-0 p-0`}>
      {label}
    </button>
  );
}
