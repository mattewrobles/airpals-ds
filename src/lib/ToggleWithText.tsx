"use client";

import React, { useState } from 'react';

export type ToggleWithTextSize = 'default' | 'compact';

export type ToggleWithTextProps = {
  labelOff?: string;
  labelOn?: string;
  active?: boolean;
  size?: ToggleWithTextSize;
  onToggle?: (v: boolean) => void;
};

export function ToggleWithText({
  labelOff = 'Off',
  labelOn = 'On',
  active = false,
  size = 'default',
  onToggle,
}: ToggleWithTextProps) {
  const [isOn, setIsOn] = useState(active);

  const handleClick = () => {
    const next = !isOn;
    setIsOn(next);
    onToggle?.(next);
  };

  const trackW = size === 'compact' ? 'w-[50px]' : 'w-[55px]';
  const trackH = size === 'compact' ? 'h-[26px]' : 'h-8';
  const knobSize = size === 'compact' ? 'w-[18px] h-[18px]' : 'w-7 h-7';
  const knobOn = size === 'compact' ? 'translate-x-[28px]' : 'translate-x-[25px]';
  // compact: full accent bg when on, disable when off
  // default: neutral track, knob gets accent color
  const trackOff = size === 'compact' ? 'bg-surface-disable' : 'bg-surface-disable';
  const trackOn  = size === 'compact' ? 'bg-surface-accent'  : 'bg-surface-disable';
  const knobOnColor = size === 'compact' ? 'bg-surface-primary' : 'bg-surface-accent';

  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <button
        role="switch"
        aria-checked={isOn}
        onClick={handleClick}
        className={[
          'relative rounded-full transition-colors outline-none flex-shrink-0 overflow-hidden',
          trackW,
          trackH,
          isOn ? trackOn : trackOff,
        ].join(' ')}
      >
        <span
          className={[
            'absolute rounded-full shadow transition-all',
            size === 'compact' ? 'top-1 left-0' : 'top-0.5 left-0',
            knobSize,
            isOn ? knobOnColor : 'bg-surface-primary',
            isOn ? knobOn : (size === 'compact' ? 'translate-x-1' : 'translate-x-0.5'),
          ].join(' ')}
        />
      </button>
      <span className="text-sm font-medium text-ink-primary">
        {isOn ? labelOn : labelOff}
      </span>
    </label>
  );
}
