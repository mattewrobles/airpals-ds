"use client";

import React, { useState } from 'react';

export type ToggleStyle = 'Standard' | 'Navy' | 'Subtle';

export type ToggleProps = {
  active?: boolean;
  style?: ToggleStyle;
  label?: string;
  onToggle?: (v: boolean) => void;
};

const styleConfig: Record<ToggleStyle, { trackOff: string; trackOn: string; knobOff: string; knobOn: string }> = {
  Standard: { trackOff: 'bg-[#e5e7eb]', trackOn: 'bg-[#e5e7eb]', knobOff: 'bg-white',     knobOn: 'bg-[#0043ff]' },
  Navy:     { trackOff: 'bg-[#1b306c]', trackOn: 'bg-[#0043ff]', knobOff: 'bg-white',     knobOn: 'bg-white' },
  Subtle:   { trackOff: 'bg-[#eaeefb]', trackOn: 'bg-[#eaeefb]', knobOff: 'bg-white',     knobOn: 'bg-[#0043ff]' },
};

export function Toggle({ active = false, style = 'Navy', label, onToggle }: ToggleProps) {
  const [isOn, setIsOn] = useState(active);
  const cfg = styleConfig[style];

  const handleClick = () => {
    const next = !isOn;
    setIsOn(next);
    onToggle?.(next);
  };

  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <button
        role="switch"
        aria-checked={isOn}
        onClick={handleClick}
        className={[
          'relative w-[55px] h-8 rounded-full transition-colors outline-none',
          isOn ? cfg.trackOn : cfg.trackOff,
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 w-7 h-7 rounded-full shadow transition-all',
            isOn ? cfg.knobOn : cfg.knobOff,
            isOn ? 'translate-x-[27px]' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
      {label && <span className="text-sm font-medium text-[#1b306c]">{label}</span>}
    </label>
  );
}