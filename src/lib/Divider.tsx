"use client";

import React from 'react';

// Figma 750-3189 — Divider / Separator
// Horizontal: 1px border-t, full width
// Vertical:   1px border-l, full height (self-stretch in flex containers)
// Color: border/border-light #e5e7eb (slate-200)

export type DividerDirection = 'Horizontal' | 'Vertical';

export type DividerProps = {
  direction?: DividerDirection;
  className?: string;
};

export function Divider({ direction = 'Horizontal', className = '' }: DividerProps) {
  if (direction === 'Vertical') {
    return (
      <div
        aria-hidden="true"
        role="separator"
        className={`w-px self-stretch bg-[#e5e7eb] shrink-0 ${className}`}
      />
    );
  }
  return (
    <hr
      aria-hidden="true"
      className={`border-0 border-t border-[#e5e7eb] w-full m-0 ${className}`}
    />
  );
}
