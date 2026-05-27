"use client";

import React, { useEffect, useState } from 'react';

export type ToggleStyle = 'Standard' | 'Navy' | 'Subtle';

export type ToggleProps = {
  active?: boolean;
  style?: ToggleStyle;
  label?: string;
  onToggle?: (v: boolean) => void;
};

// Track off uses surface-disable (slate-200). On state varies per style.
// Navy: track always shows the brand color (off=navy, on=accent).
// Standard/Subtle: track stays neutral, knob shows the accent color when on.
const styleConfig: Record<ToggleStyle, { trackOff: string; trackOn: string; knobOff: string; knobOn: string }> = {
  Standard: { trackOff: 'bg-surface-disable', trackOn: 'bg-surface-disable',   knobOff: 'bg-surface-primary', knobOn: 'bg-surface-accent' },
  Navy:     { trackOff: 'bg-surface-accent-contrast', trackOn: 'bg-surface-accent', knobOff: 'bg-surface-primary', knobOn: 'bg-surface-primary' },
  Subtle:   { trackOff: 'bg-surface-secondary',       trackOn: 'bg-surface-secondary', knobOff: 'bg-surface-primary', knobOn: 'bg-surface-accent' },
};

export function Toggle({ active = false, style = 'Navy', label, onToggle }: ToggleProps) {
  const [isOn, setIsOn] = useState(active);
  const cfg = styleConfig[style];

  useEffect(() => { setIsOn(active); }, [active]);

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
          'relative w-[55px] h-8 rounded-full transition-colors outline-none overflow-hidden',
          isOn ? cfg.trackOn : cfg.trackOff,
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 left-0 w-7 h-7 rounded-full shadow transition-all',
            isOn ? cfg.knobOn : cfg.knobOff,
            isOn ? 'translate-x-[25px]' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
      {label && <span className="text-sm font-medium text-ink-primary">{label}</span>}
    </label>
  );
}
