"use client";

import React from 'react';

export type InputStatus = 'Default' | 'Error' | 'Success';

export type InputProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  status?: InputStatus;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

// Status icons — rendered automatically when rightIcon not provided
const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5"/>
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="#15803d" strokeWidth="1.5"/>
    <path d="M5 8.5l2.5 2.5 4-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Figma node 625-2537
// Border logic (on wrapper):
//   Default/Default → slate-200 border, hover:accent-blue, focus-within:3px #adbcf2
//   Error           → red-600 border,   hover same,       focus-within:3px #fecaca
//   Success         → green-700 border, hover same,       focus-within:3px #82e6ac
//   Disabled        → surface-disable bg + matching border (no hover/focus)

const WRAPPER: Record<InputStatus, string> = {
  Default: [
    'border border-line-primary bg-surface-primary',
    'hover:border-line-accent',
    'focus-within:[border-width:3px] focus-within:border-line-focus',
  ].join(' '),
  Error: [
    'border border-line-error bg-surface-primary',
    'hover:border-line-error',
    'focus-within:[border-width:3px] focus-within:border-[#fecaca]',
  ].join(' '),
  Success: [
    'border border-line-success bg-surface-primary',
    'hover:border-line-success',
    'focus-within:[border-width:3px] focus-within:border-[#82e6ac]',
  ].join(' '),
};

// border-line-disable (not border-surface-disable — surface is a background token)
const DISABLED_WRAPPER = 'border border-line-disable bg-surface-disable cursor-not-allowed';

const HELPER_COLOR: Record<InputStatus, string> = {
  Default: 'text-ink-secondary',
  Error:   'text-ink-error',
  Success: 'text-ink-success',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label, placeholder = 'Placeholder', helperText,
      status = 'Default', disabled = false,
      leftIcon, rightIcon,
      type = 'text',
      value, defaultValue, onChange,
      id, name, className = '',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const helperId = helperText && inputId ? `${inputId}-helper` : undefined;

    // Auto status icon on the right when no custom rightIcon provided
    const resolvedRightIcon =
      rightIcon !== undefined ? rightIcon
      : status === 'Error'   ? <ErrorIcon />
      : status === 'Success' ? <SuccessIcon />
      : null;

    const wrapperCls = disabled ? DISABLED_WRAPPER : WRAPPER[status];

    return (
      <div className={`flex flex-col gap-1 w-full ${className}`}>

        {/* Label — text-xs/medium/navy (Figma caption style) */}
        {label && (
          <label
            htmlFor={inputId}
            className={`text-xs font-medium leading-4 ${disabled ? 'text-ink-disable' : 'text-ink-primary'}`}
          >
            {label}
          </label>
        )}

        {/* Field wrapper — owns border + bg + layout */}
        <div className={`flex items-center gap-[10px] p-3 rounded-md transition-colors ${wrapperCls}`}>

          {/* Left icon — 16px, inherits color from parent */}
          {leftIcon && (
            <span className={`shrink-0 size-4 flex items-center justify-center ${disabled ? 'text-icon-disable' : 'text-icon-secondary'}`}>
              {leftIcon}
            </span>
          )}

          {/* Native input — no border, transparent bg */}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            disabled={disabled}
            {...(value !== undefined ? { value } : { defaultValue })}
            onChange={e => onChange?.(e.target.value)}
            placeholder={placeholder}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy ?? helperId}
            aria-invalid={status === 'Error' || undefined}
            className={[
              'flex-1 min-w-0 bg-transparent outline-none',
              'text-sm font-normal leading-5',
              disabled
                ? 'text-ink-disable cursor-not-allowed placeholder:text-ink-disable'
                : 'text-ink-primary placeholder:text-ink-tertiary',
            ].join(' ')}
          />

          {/* Right icon — 16px */}
          {resolvedRightIcon && (
            <span className={`shrink-0 size-4 flex items-center justify-center ${disabled ? 'opacity-40' : ''}`}>
              {resolvedRightIcon}
            </span>
          )}
        </div>

        {/* Helper text — text-xs/medium */}
        {helperText && (
          <p id={helperId} className={`text-xs font-medium leading-4 ${disabled ? 'text-ink-secondary' : HELPER_COLOR[status]}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
