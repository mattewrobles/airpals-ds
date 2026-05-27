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
  Primary:   {
    fill:    'bg-surface-accent text-ink-on-accent',
    outline: 'border border-line-accent text-ink-accent',
    duo:     'bg-surface-secondary text-ink-accent',
  },
  Secondary: {
    fill:    'bg-brand-pink text-white',
    outline: 'border border-brand-pink text-brand-pink',
    duo:     'bg-brand-pink/10 text-brand-pink',
  },
  Dark: {
    fill:    'bg-surface-accent-contrast text-ink-on-accent',
    outline: 'border border-surface-accent-contrast text-ink-primary',
    duo:     'bg-surface-accent-contrast/10 text-ink-primary',
  },
  Gray: {
    fill:    'bg-slate-500 text-white',
    outline: 'border border-slate-500 text-slate-500',
    duo:     'bg-slate-500/10 text-slate-500',
  },
  Light: {
    fill:    'bg-surface-disable text-ink-secondary',
    outline: 'border border-line-primary text-ink-secondary',
    duo:     'bg-surface-disable/50 text-ink-secondary',
  },
  Warning: {
    fill:    'bg-surface-warning text-ink-warning',
    outline: 'border border-line-error text-ink-warning',
    duo:     'bg-surface-warning text-ink-warning',
  },
  Danger: {
    fill:    'bg-surface-error text-ink-error',
    outline: 'border border-line-error text-ink-error',
    duo:     'bg-surface-error text-ink-error',
  },
  Success: {
    fill:    'bg-surface-success text-ink-success',
    outline: 'border border-line-success text-ink-success',
    duo:     'bg-surface-success text-ink-success',
  },
  Info: {
    fill:    'bg-surface-info text-ink-info',
    outline: 'border border-line-accent text-ink-info',
    duo:     'bg-surface-info text-ink-info',
  },
};

export function Badge({ label, color = 'Primary', variant = 'Fill', shape = 'Full' }: BadgeProps) {
  const key = variant === 'Duo Tone' ? 'duo' : variant === 'Outline' ? 'outline' : 'fill';
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium h-7 ${shape === 'Full' ? 'rounded-full' : 'rounded-[4px]'} ${colorTokens[color][key]}`}>
      {label}
    </span>
  );
}
