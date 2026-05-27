"use client";

import React from 'react';

export type RadioState = 'Default' | 'Hover' | 'Selected' | 'Disabled';
export type RadioSize = '16px' | '14px';

export type RadioIndicatorProps = {
  state?: RadioState;
  size?: RadioSize;
};

export type RadioButtonProps = RadioIndicatorProps & {
  label?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
};

const ringColor: Record<RadioState, string> = {
  Default:  'border-ink-secondary',
  Hover:    'border-line-accent',
  Selected: 'border-line-accent bg-surface-accent',
  Disabled: 'border-line-disable',
};

export function RadioIndicator({ state = 'Default', size = '16px' }: RadioIndicatorProps) {
  const outerSize = size === '16px' ? 'w-6 h-6' : 'w-[22px] h-[22px]';
  const ringSize  = size === '16px' ? 'w-[18px] h-[18px]' : 'w-4 h-4';
  const cls = ringColor[state];

  return (
    <div className={`${outerSize} flex items-center justify-center`} aria-hidden="true">
      <div className={`${ringSize} rounded-full border-2 ${cls} flex items-center justify-center transition-colors`}>
        {state === 'Selected' && <div className="w-2 h-2 rounded-full bg-surface-primary" />}
      </div>
    </div>
  );
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      state = 'Default', size = '16px', label,
      name, value, checked, onChange,
      id, className = '',
    },
    ref
  ) => {
    const disabled = state === 'Disabled';
    const indicatorState = checked ? 'Selected' : state;
    const gap = size === '16px' ? 'gap-2' : 'gap-1';
    const textSize = size === '16px' ? 'text-base' : 'text-sm';
    const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    const inputId = id ?? (label && name ? `radio-${name}-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <label htmlFor={inputId} className={`inline-flex items-center ${gap} ${cursor} ${className}`}>
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className="sr-only"
        />
        <RadioIndicator state={indicatorState} size={size} />
        {label && <span className={`${textSize} text-ink-primary`}>{label}</span>}
      </label>
    );
  }
);
RadioButton.displayName = 'RadioButton';
