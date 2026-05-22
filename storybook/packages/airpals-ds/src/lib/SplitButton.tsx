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
  Primary:   { main: 'bg-[#0043ff]', divider: 'bg-blue-500',  hover: 'hover:bg-blue-700',  text: 'text-white' },
  Secondary: { main: 'bg-[#e6f1fd]', divider: 'bg-blue-200',  hover: 'hover:bg-blue-200',  text: 'text-[#0043ff]' },
  Info:      { main: 'bg-[#00a0ff]', divider: 'bg-sky-400',   hover: 'hover:bg-sky-600',   text: 'text-white' },
  Success:   { main: 'bg-[#22ad5c]', divider: 'bg-green-500', hover: 'hover:bg-green-700', text: 'text-white' },
  Warning:   { main: 'bg-[#f59e0b]', divider: 'bg-amber-400', hover: 'hover:bg-amber-600', text: 'text-white' },
  Danger:    { main: 'bg-[#ef4444]', divider: 'bg-red-400',   hover: 'hover:bg-red-600',   text: 'text-white' },
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
        <div className="absolute top-full left-0 mt-1 min-w-[140px] bg-white border border-slate-200 rounded-lg shadow-md z-10 overflow-hidden">
          {options.map(opt => (
            <button key={opt} onClick={() => setOpen(false)} className="w-full text-left px-3 py-2 text-sm text-[#1b306c] hover:bg-[#e6f1fd] transition-colors">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}