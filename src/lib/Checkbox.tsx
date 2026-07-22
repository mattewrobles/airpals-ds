"use client";

import React, { useRef, useState, useEffect } from 'react';

export type CheckboxSize = 'md' | 'sm';

export type CheckboxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSize;
  label?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
};

// Figma node 594-98
// Visual architecture (Figma-exact):
//   Unchecked → outer colored bg square + inner white box with shadow
//   Checked / Indeterminate → outer blue bg + icon (no white inner box)
// Color per interaction:
//   off  default → #cbd5e1   on default → #0043ff
//   off  hover   → #94a3b8   on hover   → #1773ff
//   off  focus   → #115fd8   on focus   → #115fd8
//   disabled (any) → #cbd5e1

function getBg(isActive: boolean, hovered: boolean, focused: boolean, disabled: boolean): string {
  if (disabled) return '#cbd5e1';
  if (isActive) return focused ? '#115fd8' : hovered ? '#1773ff' : '#0043ff';
  return focused ? '#115fd8' : hovered ? '#94a3b8' : '#cbd5e1';
}

const CheckIcon = () => (
  <svg viewBox="0 0 9 7" fill="none" width="9" height="7" aria-hidden="true">
    <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DashIcon = () => (
  <svg viewBox="0 0 8 2" fill="none" width="8" height="2" aria-hidden="true">
    <path d="M1 1H7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export function Checkbox({
  checked = false,
  indeterminate = false,
  size = 'md',
  label,
  disabled = false,
  onChange,
  id,
  name,
  value,
  className = '',
}: CheckboxProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set DOM indeterminate property — React doesn't handle this via props
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const isActive = checked || indeterminate;
  const bg = getBg(isActive, hovered, focused, disabled);

  // Size tokens (Figma-exact)
  const outerPx = size === 'md' ? 20 : 16;
  const insetOuter = size === 'md' ? '10%' : '6.25%';   // bg div inset
  const insetInner = size === 'md' ? '17.5%' : '15.63%'; // white box inset

  const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <label
      className={`inline-flex items-center gap-2 select-none ${cursor} ${className}`}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hidden native input — provides accessibility + keyboard support */}
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        readOnly={!onChange}
        onChange={e => onChange?.(e.target.checked)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="sr-only"
        aria-checked={indeterminate ? 'mixed' : checked}
      />

      {/* Custom visual */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{ width: outerPx, height: outerPx }}
        aria-hidden="true"
      >
        {/* Outer bg — always present */}
        <div
          className="absolute rounded-[4px] transition-colors"
          style={{ inset: insetOuter, background: bg }}
        />

        {/* Inner white box — only when unchecked */}
        {!isActive && (
          <div
            className="absolute bg-white rounded-[2.6px] shadow-[0px_2px_2px_0px_rgba(27,28,29,0.12)]"
            style={{ inset: insetInner }}
          />
        )}

        {/* Checkmark */}
        {checked && !indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckIcon />
          </div>
        )}

        {/* Indeterminate dash */}
        {indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <DashIcon />
          </div>
        )}
      </div>

      {label && (
        <span className={`text-sm font-normal leading-5 ${disabled ? 'text-ink-disable' : 'text-ink-primary'}`}>
          {label}
        </span>
      )}
    </label>
  );
}
