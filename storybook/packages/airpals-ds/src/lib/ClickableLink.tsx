import React from 'react';

export type LinkColor = 'Blue' | 'Dark Blue';
export type LinkState = 'Default' | 'Hover';

export type ClickableLinkProps = {
  label: string;
  href?: string;
  color?: LinkColor;
  state?: LinkState;
  external?: boolean;
};

const EXTERNAL_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline ml-0.5 -mt-0.5">
    <path d="M10 6.5V10a.5.5 0 01-.5.5h-7A.5.5 0 012 10V3a.5.5 0 01.5-.5H6M8 1.5h2.5M10.5 1.5v2.5M10.5 1.5L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function ClickableLink({ label, href = '#', color = 'Blue', state, external = false }: ClickableLinkProps) {
  const colorClass =
    color === 'Blue'
      ? 'text-[#0043ff] hover:underline'
      : 'text-[#1b306c] hover:text-[#0043ff] hover:underline';
  const hoverOverride = state === 'Hover' ? 'underline' : '';

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`text-sm font-medium transition-colors ${colorClass} ${hoverOverride}`}
    >
      {label}
      {external && EXTERNAL_ICON}
    </a>
  );
}
