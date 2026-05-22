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

  // Default size: 55×32 track (matches Toggle Style=1 from DS)
  // Compact size: segmented-style, see SegmentedToggle for that pattern
  const trackW = size === 'compact' ? 'w-[50px]' : 'w-[55px]';
  const trackH = size === 'compact' ? 'h-[26px]' : 'h-8';
  const knobSize = size === 'compact' ? 'w-[18px] h-[18px]' : 'w-7 h-7';
  const knobOn = size === 'compact' ? 'translate-x-[28px]' : 'translate-x-[27px]';
  const trackOff = size === 'compact' ? 'bg-[#ccccce]' : 'bg-[#e5e7eb]';
  const trackOn = size === 'compact' ? 'bg-[#0043ff]' : 'bg-[#e5e7eb]';
  const knobOnColor = size === 'compact' ? 'bg-white' : 'bg-[#0043ff]';

  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <button
        role="switch"
        aria-checked={isOn}
        onClick={handleClick}
        className={[
          'relative rounded-full transition-colors outline-none flex-shrink-0',
          trackW,
          trackH,
          isOn ? trackOn : trackOff,
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 rounded-full shadow transition-all',
            knobSize,
            isOn ? knobOnColor : 'bg-white',
            isOn ? knobOn : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
      <span className="text-sm font-medium text-[#1b306c]">
        {isOn ? labelOn : labelOff}
      </span>
    </label>
  );
}