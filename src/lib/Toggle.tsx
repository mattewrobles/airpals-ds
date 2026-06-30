"use client";

import React, { useEffect, useState } from 'react';

// ─── Toggle Short — Figma 742-64561 ──────────────────────────────────────────
// 36×20px. Track 16px tall (offset 2px top). Knob 20×20px.
// On: bg-surface-accent (#0043ff). Off: #e5e7eb. Disabled on: #a9c0ff. Disabled off: #f3f4f6.
export type ToggleShortProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
};

export function ToggleShort({ checked = false, disabled = false, onChange, className = '' }: ToggleShortProps) {
  const [isOn, setIsOn] = useState(checked);
  useEffect(() => setIsOn(checked), [checked]);

  const handle = () => {
    if (disabled) return;
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  const trackBg = disabled
    ? (isOn ? 'bg-[#a9c0ff]' : 'bg-[#f3f4f6]')
    : (isOn ? 'bg-surface-accent' : 'bg-[#e5e7eb]');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={handle}
      className={`relative w-[36px] h-[20px] rounded-[10px] outline-none focus-visible:shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#6366f1] transition-shadow shrink-0 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <div className={`absolute left-0 top-[2px] w-[36px] h-[16px] rounded-[8px] transition-colors duration-200 ${trackBg}`} />
      <div
        className={`absolute top-0 size-[20px] rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.06),0px_1px_3px_rgba(0,0,0,0.10)] transition-[left] duration-200 ${isOn ? 'left-[16px]' : 'left-0'}`}
      />
    </button>
  );
}

// ─── Toggle Simple — Figma 742-64548 ─────────────────────────────────────────
// 44×24px. Flex + p-[2px]. Knob 20×20px.
// On: bg #cde5ff + justify-end. Off: bg #e5e7eb.
export type ToggleSimpleProps = {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
};

export function ToggleSimple({ checked = false, onChange, className = '' }: ToggleSimpleProps) {
  const [isOn, setIsOn] = useState(checked);
  useEffect(() => setIsOn(checked), [checked]);

  const handle = () => {
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={handle}
      className={`flex items-center p-[2px] w-[44px] h-[24px] rounded-[12px] outline-none focus-visible:shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#6366f1] transition-colors duration-200 cursor-pointer overflow-hidden shrink-0 ${isOn ? 'bg-[#cde5ff] justify-end' : 'bg-[#e5e7eb]'} ${className}`}
    >
      <div className="shrink-0 size-[20px] rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.06),0px_1px_3px_rgba(0,0,0,0.10)]" />
    </button>
  );
}

// ─── Toggle (legacy alias) ───────────────────────────────────────────────────
// Keep ToggleStyle/ToggleProps exports so existing index.ts doesn't break.
export type ToggleStyle = 'Standard' | 'Navy' | 'Subtle';
export type ToggleProps = {
  checked?: boolean;
  active?: boolean;
  disabled?: boolean;
  style?: ToggleStyle;
  label?: string;
  onChange?: (v: boolean) => void;
  onToggle?: (v: boolean) => void;
  className?: string;
};

export function Toggle({ active, checked, disabled, label, onChange, onToggle, className }: ToggleProps) {
  const handleChange = (v: boolean) => { onChange?.(v); onToggle?.(v); };
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <ToggleShort checked={active ?? checked} disabled={disabled} onChange={handleChange} className={className} />
      {label && <span className="text-sm font-medium text-ink-primary">{label}</span>}
    </label>
  );
}
