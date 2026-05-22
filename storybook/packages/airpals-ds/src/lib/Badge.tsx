"use client";

import React from 'react';

export type BadgeColor = 'Primary' | 'Secondary' | 'Dark' | 'Gray' | 'Light' | 'Warning' | 'Danger' | 'Success' | 'Info';
export type BadgeVariant = 'Fill' | 'Outline' | 'Duo Tone';
export type BadgeShape = 'Semi' | 'Full';

export type BadgeProps = {
  label: string;
  color?: BadgeColor;
  variant?: BadgeVariant;
  shape?: BadgeShape;
};

const colorTokens: Record<BadgeColor, { fill: string; outline: string; duo: string }> = {
  Primary:   { fill: 'bg-[#0043ff] text-white',     outline: 'border border-[#0043ff] text-[#0043ff]', duo: 'bg-[#0043ff]/10 text-[#0043ff]' },
  Secondary: { fill: 'bg-[#fc4575] text-white',     outline: 'border border-[#fc4575] text-[#fc4575]', duo: 'bg-[#fc4575]/10 text-[#fc4575]' },
  Dark:      { fill: 'bg-[#0a0a0a] text-white',     outline: 'border border-[#0a0a0a] text-[#0a0a0a]', duo: 'bg-[#0a0a0a]/10 text-[#0a0a0a]' },
  Gray:      { fill: 'bg-[#637381] text-white',     outline: 'border border-[#637381] text-[#637381]', duo: 'bg-[#637381]/10 text-[#637381]' },
  Light:     { fill: 'bg-[#e5e7eb] text-[#374151]', outline: 'border border-[#e5e7eb] text-[#374151]', duo: 'bg-[#e5e7eb]/50 text-[#374151]' },
  Warning:   { fill: 'bg-[#f59e0b] text-white',     outline: 'border border-[#f59e0b] text-[#f59e0b]', duo: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
  Danger:    { fill: 'bg-[#ef4444] text-white',     outline: 'border border-[#ef4444] text-[#ef4444]', duo: 'bg-[#ef4444]/10 text-[#ef4444]' },
  Success:   { fill: 'bg-[#22ad5c] text-white',     outline: 'border border-[#22ad5c] text-[#22ad5c]', duo: 'bg-[#22ad5c]/10 text-[#22ad5c]' },
  Info:      { fill: 'bg-[#00a0ff] text-white',     outline: 'border border-[#00a0ff] text-[#00a0ff]', duo: 'bg-[#00a0ff]/10 text-[#00a0ff]' },
};

export function Badge({ label, color = 'Primary', variant = 'Fill', shape = 'Full' }: BadgeProps) {
  const key = variant === 'Duo Tone' ? 'duo' : variant === 'Outline' ? 'outline' : 'fill';
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium h-7 ${shape === 'Full' ? 'rounded-full' : 'rounded-[4px]'} ${colorTokens[color][key]}`}>
      {label}
    </span>
  );
}