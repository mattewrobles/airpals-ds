"use client";

import React from 'react';

export type ButtonType = 'Primary' | 'Secondary' | 'Ghost' | 'Ghost II' | 'Negative' | 'Accent';
export type ButtonState = 'Default' | 'Disabled';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  label: string;
  type?: ButtonType;
  state?: ButtonState;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
  id?: string;
  'aria-label'?: string;
};

const typeClasses: Record<ButtonType, string> = {
  Primary:   'bg-surface-accent text-ink-on-accent hover:opacity-90 active:opacity-80',
  Secondary: 'border border-line-accent text-ink-accent bg-transparent hover:bg-surface-secondary',
  Ghost:     'bg-transparent text-ink-primary hover:bg-slate-100',
  'Ghost II':'bg-slate-100 text-ink-primary hover:bg-slate-200',
  Negative:  'bg-surface-error text-ink-error border border-line-error hover:opacity-90',
  Accent:    'bg-surface-accent-contrast text-ink-on-accent hover:opacity-90',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label, type = 'Primary', state = 'Default', size = 'md',
      onClick, className = '', id,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const disabled = state === 'Disabled';
    return (
      <button
        ref={ref}
        type="button"
        id={id}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={[
          'inline-flex items-center justify-center font-medium rounded-lg transition-all',
          typeClasses[type],
          sizeClasses[size],
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ].join(' ')}
      >
        {label}
      </button>
    );
  }
);
Button.displayName = 'Button';
