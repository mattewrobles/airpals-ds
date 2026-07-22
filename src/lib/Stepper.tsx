"use client";

import React, { useEffect, useState } from 'react';

// Figma node 742-64856 — FormsNumberInputStepper
// Default: icon buttons with container padding, no btn bg
// Hover: buttons fill height with #e2e8f0 bg, outer corners rounded

export type StepperProps = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: number) => void;
  className?: string;
};

const MinusIcon = () => (
  <svg width="8" height="2" viewBox="0 0 8 2" fill="none" aria-hidden="true">
    <path d="M1 1h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
    <path d="M4 1v6M1 4h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function Stepper({
  value: controlledValue,
  min,
  max,
  step = 1,
  onChange,
  className = '',
}: StepperProps) {
  const [value, setValue] = useState(controlledValue ?? 0);

  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue);
  }, [controlledValue]);

  const canDec = min === undefined || value - step >= min;
  const canInc = max === undefined || value + step <= max;

  const decrement = () => {
    if (!canDec) return;
    const next = value - step;
    setValue(next);
    onChange?.(next);
  };

  const increment = () => {
    if (!canInc) return;
    const next = value + step;
    setValue(next);
    onChange?.(next);
  };

  return (
    <div
      className={`flex items-center justify-between bg-[#f3f3f5] rounded-[6px] w-[127px] h-[27px] ${className}`}
    >
      {/* Minus — hover applies to THIS button only (not group) */}
      <button
        type="button"
        onClick={decrement}
        aria-label="Decrease"
        disabled={!canDec}
        className={[
          'flex items-center justify-center h-full text-ink-primary transition-colors duration-150 rounded-l-[6px]',
          'px-[9px] hover:bg-[#e2e8f0] hover:px-[10px]',
          !canDec ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <MinusIcon />
      </button>

      {/* Value */}
      <span className="text-[16px] font-normal leading-[29px] text-ink-primary text-center w-[28px] shrink-0 select-none tabular-nums">
        {value}
      </span>

      {/* Plus — hover applies to THIS button only (not group) */}
      <button
        type="button"
        onClick={increment}
        aria-label="Increase"
        disabled={!canInc}
        className={[
          'flex items-center justify-center h-full text-ink-primary transition-colors duration-150 rounded-r-[6px]',
          'px-[9px] hover:bg-[#e2e8f0] hover:px-[10px]',
          !canInc ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
