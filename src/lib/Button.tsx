"use client";

import React from 'react';

export type ButtonType = 'Primary' | 'Secondary' | 'Ghost' | 'Ghost II' | 'Negative' | 'Accent';
export type ButtonState = 'Default' | 'Disabled';

export type ButtonProps = {
  label: string;
  type?: ButtonType;
  state?: ButtonState;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
  'aria-label'?: string;
};

// Figma node 596-24 — DS token mapping + exact hover/active from Figma
const ENABLED: Record<ButtonType, string> = {
  Primary:
    'bg-surface-accent text-ink-on-accent hover:bg-[#1773ff] active:bg-[#115fd8]',
  Secondary:
    'bg-surface-secondary text-ink-primary hover:bg-[#cde5ff] active:bg-[#afd0f2]',
  Ghost:
    'bg-transparent border border-line-primary text-ink-primary ' +
    'hover:border-line-accent hover:text-ink-accent active:border-[#115fd8] active:text-[#115fd8]',
  'Ghost II':
    'bg-transparent border border-brand-navy text-ink-primary ' +
    'hover:border-line-accent hover:text-ink-accent active:border-[#115fd8] active:text-[#115fd8]',
  Negative:
    'bg-[#f87171] text-white hover:bg-[#ff4e4e] active:bg-[#de3838]',
  Accent:
    'bg-brand-pink text-white hover:bg-[#f23063] active:bg-[#d80e43]',
};

const DISABLED: Record<ButtonType, string> = {
  Primary:    'bg-surface-disable text-ink-disable',
  Secondary:  'bg-surface-disable text-ink-disable',
  Ghost:      'bg-transparent border border-line-primary text-ink-disable',
  'Ghost II': 'bg-transparent border border-line-primary text-ink-disable',
  Negative:   'bg-[#f9c9c6] text-white',
  Accent:     'bg-[#fec3d2] text-white',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      type = 'Primary',
      state = 'Default',
      iconLeft,
      iconRight,
      onClick,
      className = '',
      id,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const disabled = state === 'Disabled';
    const hasIcon = Boolean(iconLeft || iconRight);

    return (
      <button
        ref={ref}
        type="button"
        id={id}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={[
          'inline-flex items-center justify-center min-w-[140px] overflow-hidden',
          'p-3 rounded-md',
          'text-sm leading-5 font-semibold',
          'transition-colors',
          hasIcon ? 'gap-2' : '',
          disabled
            ? `${DISABLED[type]} cursor-not-allowed`
            : ENABLED[type],
          className,
        ].filter(Boolean).join(' ')}
      >
        {iconLeft && (
          <span className="shrink-0 size-[18px] flex items-center justify-center">
            {iconLeft}
          </span>
        )}
        <span className={hasIcon ? 'flex-1 text-center' : ''}>{label}</span>
        {iconRight && (
          <span className="shrink-0 size-[18px] flex items-center justify-center">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';
