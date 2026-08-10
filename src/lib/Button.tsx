"use client";

import React from 'react';

// DS v2.5 — aligned with ↘︎ Buttons Figma component (node 1448:25153)
// 6 variants × 4 states = 24 combinations
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'accent-pink';
export type ButtonStatus = 'default' | 'disabled';

export type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
  'aria-label'?: string;
};

const ENABLED: Record<ButtonVariant, string> = {
  primary:
    'bg-background-accent text-text-on-accent ' +
    'hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
  secondary:
    'bg-background-secondary text-text-primary border border-border-subtle ' +
    'hover:bg-background-secondary-hover active:bg-background-secondary-pressed',
  ghost:
    'bg-transparent text-text-primary ' +
    'hover:bg-background-secondary-hover active:bg-background-secondary-pressed',
  outline:
    'bg-transparent border border-border-ghost text-text-primary ' +
    'hover:border-border-accent hover:text-text-accent hover:bg-background-secondary-hover ' +
    'active:border-border-interactive-pressed active:text-text-interactive-pressed active:bg-background-secondary-pressed',
  destructive:
    'bg-background-danger text-text-on-accent ' +
    'hover:bg-background-danger-hover active:bg-background-danger-pressed',
  'accent-pink':
    'bg-background-accent-pink text-text-on-accent ' +
    'hover:bg-background-accent-pink-hover active:bg-background-accent-pink-pressed',
};

const DISABLED: Record<ButtonVariant, string> = {
  primary:       'bg-background-disable text-text-disable',
  secondary:     'bg-background-disable text-text-disable',
  ghost:         'bg-transparent text-text-disable',
  outline:       'bg-transparent border border-border-disable text-text-disable',
  destructive:   'bg-background-disable text-text-disable',
  'accent-pink': 'bg-background-disable text-text-disable',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, variant = 'primary', disabled = false, iconLeft, iconRight, onClick, className = '', id, 'aria-label': ariaLabel }, ref) => {
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
          'px-4 py-2.5 rounded-lg',
          'text-sm leading-5 font-semibold',
          'transition-colors',
          hasIcon ? 'gap-2' : '',
          disabled
            ? `${DISABLED[variant]} cursor-not-allowed`
            : ENABLED[variant],
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
