"use client";

import React, { useState } from 'react';

export type SplitButtonSize = 'XS' | 'S' | 'M' | 'L';
export type SplitButtonType = 'Primary' | 'Secondary' | 'Info' | 'Success' | 'Warning' | 'Danger';

export type SplitButtonProps = {
  label?: string;
  size?: SplitButtonSize;
  type?: SplitButtonType;
  disabled?: boolean;
  onClick?: () => void;
  options?: string[];
};

type ColorTokens = { main: string; divider: string; hover: string; text: string };

const typeTokens: Record<SplitButtonType, ColorTokens> = {
  Primary:   { main: 'bg-surface-accent',          divider: 'bg-line-accent',   hover: 'hover:opacity-90',       text: 'text-ink-on-accent' },
  Secondary: { main: 'bg-surface-secondary',        divider: 'bg-line-focus',    hover: 'hover:bg-surface-tertiary', text: 'text-ink-accent' },
  Info:      { main: 'bg-surface-info',             divider: 'bg-blue-400',      hover: 'hover:opacity-90',       text: 'text-ink-info' },
  Success:   { main: 'bg-surface-success',          divider: 'bg-green-500',     hover: 'hover:opacity-90',       text: 'text-ink-success' },
  Warning:   { main: 'bg-surface-warning',          divider: 'bg-amber-400',     hover: 'hover:opacity-90',       text: 'text-ink-warning' },
  Danger:    { main: 'bg-surface-error',            divider: 'bg-red-400',       hover: 'hover:opacity-90',       text: 'text-ink-error' },
};

const sizeTokens: Record<SplitButtonSize, { px: string; py: string; text: string; chevronPx: string }> = {
  XS: { px: 'px-2',  py: 'py-1',   text: 'text-xs',   chevronPx: 'px-1.5' },
  S:  { px: 'px-3',  py: 'py-1.5', text: 'text-sm',   chevronPx: 'px-2' },
  M:  { px: 'px-4',  py: 'py-2',   text: 'text-sm',   chevronPx: 'px-2.5' },
  L:  { px: 'px-5',  py: 'py-2.5', text: 'text-base', chevronPx: 'px-3' },
};

const CHEVRON_DOWN = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function SplitButton({
  label = 'Action',
  size = 'M',
  type = 'Primary',
  disabled = false,
  onClick,
  options = ['Edit', 'Duplicate', 'Archive', 'Delete'],
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const { main, divider, hover, text } = typeTokens[type];
  const { px, py, text: textSize, chevronPx } = sizeTokens[size];
  const disabledClass = disabled ? 'opacity-40 cursor-not-allowed' : '';

  return (
    <div className="relative inline-flex font-body">
      <button disabled={disabled} onClick={onClick} className={`${px} ${py} ${textSize} font-medium ${main} ${text} ${!disabled ? hover : ''} ${disabledClass} rounded-l-lg transition-colors`}>
        {label}
      </button>
      <span className={`w-px self-stretch ${divider} opacity-40`} />
      <button disabled={disabled} onClick={() => !disabled && setOpen(v => !v)} className={`${chevronPx} ${py} ${main} ${text} ${!disabled ? hover : ''} ${disabledClass} rounded-r-lg transition-colors`} aria-label="More options">
        {CHEVRON_DOWN}
      </button>
      {open && !disabled && (
        <div className="absolute top-full left-0 mt-1 min-w-[140px] bg-surface-primary border border-line-primary rounded-lg shadow-md z-10 overflow-hidden">
          {options.map(opt => (
            <button key={opt} onClick={() => setOpen(false)} className="w-full text-left px-3 py-2 text-sm text-ink-primary hover:bg-surface-secondary transition-colors">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
