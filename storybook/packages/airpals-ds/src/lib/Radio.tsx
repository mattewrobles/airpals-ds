"use client";

import React from 'react';

export type RadioState = 'Default' | 'Hover' | 'Selected' | 'Disabled';
export type RadioSize = '16px' | '14px';

export type RadioIndicatorProps = {
  state?: RadioState;
  size?: RadioSize;
};

export type RadioButtonProps = RadioIndicatorProps & {
  label?: string;
};

const ringColor: Record<RadioState, string> = {
  Default:  'border-[#64748b]',
  Hover:    'border-[#0043ff]',
  Selected: 'border-[#0043ff] bg-[#0043ff]',
  Disabled: 'border-[#cbd5e1]',
};

export function RadioIndicator({ state = 'Default', size = '16px' }: RadioIndicatorProps) {
  const outerSize = size === '16px' ? 'w-6 h-6' : 'w-[22px] h-[22px]';
  const ringSize  = size === '16px' ? 'w-[18px] h-[18px]' : 'w-4 h-4';
  const cls = ringColor[state];

  return (
    <div className={`${outerSize} flex items-center justify-center`}>
      <div className={`${ringSize} rounded-full border-2 ${cls} flex items-center justify-center transition-colors`}>
        {state === 'Selected' && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </div>
  );
}

export function RadioButton({ state = 'Default', size = '16px', label = 'Label' }: RadioButtonProps) {
  const gap = size === '16px' ? 'gap-2' : 'gap-1';
  const textSize = size === '16px' ? 'text-base' : 'text-sm';
  const cursor = state === 'Disabled' ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <label className={`inline-flex items-center ${gap} ${cursor}`}>
      <RadioIndicator state={state} size={size} />
      <span className={`${textSize} text-[#1b306c]`}>{label}</span>
    </label>
  );
}