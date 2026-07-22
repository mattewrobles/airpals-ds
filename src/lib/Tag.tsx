"use client";

import React from 'react';

export type TagState = 'Default' | 'Hover' | 'Focus' | 'Disable';

export type TagProps = {
  label: string;
  state?: TagState;
  closable?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
};

const X_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Figma: node 625-4040 · cornerRadius=6 · padding 14px/5px · text 16px/400
// Default: brand-blue 8% opacity bg, no border
// Hover:   brand-blue solid, white text
// Focus:   same bg as Default + brand-blue ring at 30% opacity
// Disable: slate-200 bg, same navy text (not muted), non-interactive
// Figma exact: Focus=border-2 border-rgba(55,88,249,0.3), Disable=opacity-40
// Brand blue #0043ff = rgb(0,67,255) — previous code used wrong indigo rgb(55,88,249)
const stateClasses: Record<TagState, string> = {
  Default: 'bg-[rgba(0,67,255,0.08)] text-ink-primary',
  Hover:   'bg-surface-accent text-ink-on-accent',
  Focus:   'bg-[rgba(0,67,255,0.08)] text-ink-primary border-2 border-[rgba(0,67,255,0.3)]',
  Disable: 'bg-surface-disable text-ink-primary opacity-40 cursor-not-allowed',
};

export function Tag({
  label,
  state = 'Default',
  closable = false,
  onClose,
  onClick,
  className = '',
}: TagProps) {
  const disabled = state === 'Disable';

  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={onClick && !disabled ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={[
        'inline-flex items-center gap-2 px-3.5 py-[5px] rounded-md text-base font-normal transition-colors',
        stateClasses[state],
        onClick && !disabled ? 'cursor-pointer select-none' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {label}
      {closable && !disabled && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose?.(); }}
          className="opacity-60 hover:opacity-100 transition-opacity leading-none"
          aria-label={`Remove ${label}`}
        >
          {X_ICON}
        </button>
      )}
    </span>
  );
}
