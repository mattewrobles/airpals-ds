"use client";

import React from 'react';

export type CheckboxState = 'Default' | 'Hover' | 'Focused' | 'Disabled';
export type CheckboxActive = 'Off' | 'On' | 'Indeterminate';
export type CheckboxSize = 'Medium' | 'Small';

export type CheckboxProps = {
  state?: CheckboxState;
  active?: CheckboxActive;
  size?: CheckboxSize;
  label?: string;
  onChange?: (active: CheckboxActive) => void;
};

const stateBg: Record<CheckboxState, { off: string; on: string }> = {
  Default:  { off: 'bg-[#cbd5e1]', on: 'bg-[#0043ff]' },
  Hover:    { off: 'bg-[#94a3b8]', on: 'bg-[#1773ff]' },
  Focused:  { off: 'bg-[#115fd8]', on: 'bg-[#115fd8]' },
  Disabled: { off: 'bg-[#cbd5e1]', on: 'bg-[#cbd5e1]' },
};

export function Checkbox({ state = 'Default', active = 'Off', size = 'Medium', label, onChange }: CheckboxProps) {
  const isOn = active === 'On';
  const isIndeterminate = active === 'Indeterminate';
  const isChecked = isOn || isIndeterminate;
  const bg = isChecked ? stateBg[state].on : stateBg[state].off;
  const outerSize = size === 'Medium' ? 'w-5 h-5' : 'w-4 h-4';
  const innerSize = size === 'Medium' ? 'w-4 h-4' : 'w-[14px] h-[14px]';
  const cursor = state === 'Disabled' ? 'cursor-not-allowed' : 'cursor-pointer';

  const handleClick = () => {
    if (state === 'Disabled' || !onChange) return;
    onChange(isOn ? 'Off' : 'On');
  };

  return (
    <label className={`inline-flex items-center gap-2 ${cursor}`} onClick={handleClick}>
      <div className={`${outerSize} flex items-center justify-center ${cursor}`}>
        <div className={`${innerSize} rounded-[4px] ${bg} flex items-center justify-center transition-colors`}>
          {isOn && (
            <svg viewBox="0 0 9 7" fill="none" className="w-[9px] h-[7px]">
              <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {isIndeterminate && (
            <svg viewBox="0 0 8 2" fill="none" className="w-[8px] h-[2px]">
              <path d="M1 1H7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>
      </div>
      {label && <span className="text-sm text-[#111928]">{label}</span>}
    </label>
  );
}