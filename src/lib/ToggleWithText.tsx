"use client";

import React, { useState } from 'react';
import { ToggleSimple, ToggleShort } from './Toggle';

// ─── Icons ────────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="2.5" fill="currentColor" />
    <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.42 1.42M11.18 11.18l1.42 1.42M3.4 12.6l1.42-1.42M11.18 4.82l1.42-1.42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13.5 8.9A5.5 5.5 0 1 1 7.1 2.5 4 4 0 0 0 13.5 8.9Z" fill="currentColor" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToggleWithTextStyle = '1' | '2' | '3';
export type ToggleWithTextSize = 'default' | 'compact'; // legacy, unused

export type ToggleWithTextProps = {
  style?: ToggleWithTextStyle;
  active?: boolean;
  onChange?: (v: boolean) => void;
  onToggle?: (v: boolean) => void;
  // Style 1
  labelOff?: string;
  labelOn?: string;
  // Style 2
  labelLeft?: string;
  labelRight?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  // Style 3
  labelA?: string;
  labelB?: string;
  // Legacy
  size?: ToggleWithTextSize;
};

// ─── ToggleWithText — Figma 625-3720 ─────────────────────────────────────────
export function ToggleWithText({
  style = '1',
  active = false,
  onChange,
  onToggle,
  labelOff = 'Off',
  labelOn = 'On',
  labelLeft = 'Light mode',
  labelRight = 'Dark mode',
  iconLeft = <SunIcon />,
  iconRight = <MoonIcon />,
  labelA = 'Light',
  labelB = 'Dark',
}: ToggleWithTextProps) {
  const [isOn, setIsOn] = useState(active);

  const handle = (v: boolean) => {
    setIsOn(v);
    onChange?.(v);
    onToggle?.(v);
  };

  // ── Style 1: ToggleSimple + text label ───────────────────────────────────────
  // [toggle] Auto Saver Off / Auto Saver On
  if (style === '1') {
    return (
      <div className="inline-flex items-center gap-[7px]">
        <ToggleSimple checked={isOn} onChange={handle} />
        <span className="text-sm font-medium leading-[22px] text-ink-primary whitespace-nowrap">
          {isOn ? labelOn : labelOff}
        </span>
      </div>
    );
  }

  // ── Style 2: Segmented control — card with two labeled options ───────────────
  // Light mode [☀] | Dark mode [🌙]  (275px × 48px card)
  if (style === '2') {
    return (
      <div
        role="group"
        className="flex w-[275px] h-[48px] rounded-[6px] bg-surface-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.12)] p-1 gap-1"
      >
        <button
          type="button"
          onClick={() => handle(false)}
          className={`flex flex-1 items-center justify-center gap-[6px] rounded-[4px] transition-colors duration-150 text-ink-primary ${!isOn ? 'bg-surface-secondary' : 'bg-transparent hover:bg-surface-tertiary'}`}
        >
          <span className="shrink-0 text-ink-primary">{iconLeft}</span>
          <span className="text-sm font-medium leading-[22px] whitespace-nowrap">{labelLeft}</span>
        </button>
        <button
          type="button"
          onClick={() => handle(true)}
          className={`flex flex-1 items-center justify-center gap-[6px] rounded-[4px] transition-colors duration-150 text-ink-primary ${isOn ? 'bg-surface-secondary' : 'bg-transparent hover:bg-surface-tertiary'}`}
        >
          <span className="shrink-0 text-ink-primary">{iconRight}</span>
          <span className="text-sm font-medium leading-[22px] whitespace-nowrap">{labelRight}</span>
        </button>
      </div>
    );
  }

  // ── Style 3: label + ToggleShort + label ─────────────────────────────────────
  // Light [toggle] Dark
  return (
    <div className="inline-flex items-center gap-[15px]">
      <span className="text-sm font-medium leading-[22px] text-ink-primary whitespace-nowrap">{labelA}</span>
      <ToggleShort checked={isOn} onChange={handle} />
      <span className="text-sm font-medium leading-[22px] text-ink-primary whitespace-nowrap">{labelB}</span>
    </div>
  );
}
