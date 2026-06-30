"use client";

import React from 'react';

export type IconButtonState = 'Normal' | 'Outline' | 'Disable' | 'Glow';

export type IconButtonProps = {
  icon: React.ReactNode;
  state?: IconButtonState;
  onClick?: () => void;
  'aria-label': string;
  className?: string;
};

// Figma node 747-8438 — 32×32px icon-only button, 4 states
const STATE_STYLES: Record<IconButtonState, string> = {
  Normal:  'bg-surface-accent  text-icon-on-accent',
  Outline: 'border border-line-accent text-icon-accent',
  Glow:    'text-icon-accent   [filter:drop-shadow(0_0_6px_#0043ff88)]',
  Disable: 'bg-surface-disable text-icon-disable cursor-not-allowed',
};

export function IconButton({
  icon,
  state = 'Normal',
  onClick,
  'aria-label': ariaLabel,
  className = '',
}: IconButtonProps) {
  return (
    <button
      type="button"
      disabled={state === 'Disable'}
      onClick={state !== 'Disable' ? onClick : undefined}
      aria-label={ariaLabel}
      className={[
        'inline-flex items-center justify-center',
        'size-8 rounded-md',
        'transition-colors',
        state !== 'Disable' && state !== 'Glow' ? 'hover:opacity-85 active:opacity-70' : '',
        STATE_STYLES[state],
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="size-[14px] flex items-center justify-center shrink-0">
        {icon}
      </span>
    </button>
  );
}
