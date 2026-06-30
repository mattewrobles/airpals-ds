"use client";

import React, { useState } from 'react';

export type RadioState = 'Default' | 'Hover' | 'Selected' | 'Disabled';
export type RadioSize = '16px' | '14px';

export type RadioIndicatorProps = {
  state?: RadioState;
  size?: RadioSize;
  className?: string;
};

export type RadioButtonProps = {
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: RadioSize;
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
};

// Figma node 583-55
// Ring colors per state:
//   Default  → border-2 border-slate-300, white bg
//   Hover    → border-2 border-slate-400, white bg
//   Selected → border-2 border-brand-blue, white bg + blue inner dot
//   Disabled → border-2 border-slate-200, white bg
const RING: Record<RadioState, string> = {
  Default:  'border-2 border-[#cbd5e1]',
  Hover:    'border-2 border-[#94a3b8]',
  Selected: 'border-2 border-line-accent',
  Disabled: 'border-2 border-[#e2e8f0]',
};

export function RadioIndicator({ state = 'Default', size = '16px', className = '' }: RadioIndicatorProps) {
  // Outer hit area: 24px (16px) / 22px (14px)
  // Ring circle:   18px (16px) / 16px (14px)
  // Inner dot:      8px both sizes (Selected only)
  const outerSize = size === '16px' ? 'size-6' : 'size-[22px]';
  const ringSize  = size === '16px' ? 'size-[18px]' : 'size-4';

  return (
    <div className={`${outerSize} flex items-center justify-center shrink-0 ${className}`} aria-hidden="true">
      <div className={`${ringSize} rounded-full flex items-center justify-center bg-white transition-colors ${RING[state]}`}>
        {state === 'Selected' && (
          <div className="size-2 rounded-full bg-surface-accent" />
        )}
      </div>
    </div>
  );
}

// Figma node 583-215 — RadioButton = RadioIndicator + label
// Handles its own hover state to update the indicator
export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      labelPosition = 'right',
      size = '16px',
      name, value, checked = false, disabled = false,
      onChange, id, className = '',
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);

    const indicatorState: RadioState =
      disabled  ? 'Disabled' :
      checked   ? 'Selected' :
      hovered   ? 'Hover'    : 'Default';

    const gap     = size === '16px' ? 'gap-2' : 'gap-1';
    const textCls = size === '16px'
      ? 'text-base leading-6'
      : 'text-sm leading-5';
    const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    const inputId = id ?? (label && name
      ? `radio-${name}-${label.toLowerCase().replace(/\s+/g, '-')}`
      : undefined);

    const labelEl = label && (
      <span className={`font-normal ${textCls} ${disabled ? 'text-ink-disable' : 'text-ink-primary'}`}>
        {label}
      </span>
    );

    return (
      <label
        htmlFor={inputId}
        className={`inline-flex items-center ${gap} select-none ${cursor} ${className}`}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {labelPosition === 'left' && labelEl}

        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          readOnly={!onChange}
          onChange={e => onChange?.(e.target.value)}
          className="sr-only"
        />

        <RadioIndicator state={indicatorState} size={size} />

        {labelPosition === 'right' && labelEl}
      </label>
    );
  }
);
RadioButton.displayName = 'RadioButton';
