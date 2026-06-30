"use client";

import React, { useState, useRef, useEffect } from 'react';

export type SplitButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type SplitButtonType = 'Primary' | 'Secondary' | 'Info' | 'Success' | 'Warning' | 'Danger';

export type SplitButtonProps = {
  label?: string;
  icon?: React.ReactNode;
  size?: SplitButtonSize;
  type?: SplitButtonType;
  disabled?: boolean;
  onAction?: () => void;
  options?: string[];
  onOptionSelect?: (option: string) => void;
  className?: string;
};

// Figma node 625-1704 — exact specs per size
const SIZE = {
  xs: { h: 'h-6',  actionPx: 'px-2.5',      gap: 'gap-1.5', iconPx: 12, radiusL: 'rounded-l',    radiusR: 'rounded-r',    chevronW: 'w-[22px]', font: 'text-xs  font-medium  leading-4' },
  sm: { h: 'h-8',  actionPx: 'px-2.5',      gap: 'gap-1.5', iconPx: 16, radiusL: 'rounded-l-md', radiusR: 'rounded-r-md', chevronW: 'w-[30px]', font: 'text-sm  font-semibold leading-5' },
  md: { h: 'h-9',  actionPx: 'pl-3.5 pr-2', gap: 'gap-2',   iconPx: 18, radiusL: 'rounded-l-md', radiusR: 'rounded-r-md', chevronW: 'w-8',      font: 'text-base font-semibold leading-6' },
  lg: { h: 'h-10', actionPx: 'pl-4 pr-3',   gap: 'gap-2',   iconPx: 20, radiusL: 'rounded-l-lg', radiusR: 'rounded-r-lg', chevronW: 'w-9',      font: 'text-base font-semibold leading-6' },
} as const;

// Type → DS tokens. Colors match Figma exactly:
// Primary = brand blue solid · Secondary = white outlined · Info = blue-light outlined
// Success = mint light · Warning = brand-pink solid · Danger = red-600 solid
const TYPE = {
  Primary:   { bg: 'bg-surface-accent',    border: 'border-surface-accent',    text: 'text-ink-on-accent', divider: 'rgba(255,255,255,0.25)' },
  Secondary: { bg: 'bg-surface-primary',   border: 'border-line-primary',      text: 'text-ink-primary',   divider: '#e2e8f0' },
  Info:      { bg: 'bg-surface-secondary', border: 'border-line-secondary',    text: 'text-ink-primary',   divider: '#cbd5e1' },
  Success:   { bg: 'bg-[#e9fcf4]',         border: 'border-[#e9fcf4]',         text: 'text-ink-primary',   divider: '#a7f3d0' },
  Warning:   { bg: 'bg-brand-pink',         border: 'border-brand-pink',         text: 'text-white',         divider: 'rgba(255,255,255,0.25)' },
  Danger:    { bg: 'bg-[#dc2626]',          border: 'border-[#dc2626]',          text: 'text-white',         divider: 'rgba(255,255,255,0.25)' },
} as const;

const ChevronDown = ({ px }: { px: number }) => (
  <svg width={px} height={px} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export function SplitButton({
  label = 'Split',
  icon,
  size = 'sm',
  type = 'Primary',
  disabled = false,
  onAction,
  options = ['Edit', 'Duplicate', 'Archive', 'Delete'],
  onOptionSelect,
  className = '',
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const s = SIZE[size];
  const t = TYPE[type];

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const base = `${t.bg} ${t.text} border ${t.border} ${s.h} inline-flex items-center transition-colors ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`;

  return (
    <div ref={wrapRef} className={`relative inline-flex ${className}`}>

      {/* Action part — left-rounded */}
      <button
        type="button"
        disabled={disabled}
        onClick={onAction}
        className={`${base} ${s.actionPx} ${s.gap} ${s.radiusL} ${s.font} border-r-0 hover:opacity-90 active:opacity-80`}
      >
        {icon && (
          <span className="shrink-0 flex items-center justify-center" style={{ width: s.iconPx, height: s.iconPx }}>
            {icon}
          </span>
        )}
        {label}
      </button>

      {/* Divider — 1px vertical line between halves */}
      <span className="w-px self-stretch shrink-0" style={{ background: t.divider }} aria-hidden="true" />

      {/* Chevron part — right-rounded */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(v => !v)}
        aria-label="More options"
        aria-expanded={open}
        className={`${base} ${s.chevronW} justify-center ${s.radiusR} border-l-0 hover:opacity-90 active:opacity-80`}
      >
        <ChevronDown px={s.iconPx} />
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div className="absolute top-full left-0 mt-1 min-w-[160px] bg-surface-primary border border-line-primary rounded-md shadow-md z-10 overflow-hidden py-1">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onOptionSelect?.(opt); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-ink-primary hover:bg-surface-secondary transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
