"use client";

import React, { useState } from 'react';

// Figma 745-9986 (Rating) + 748-3995 (Atom star)
// Normal: 28px stars, Sm: 24px stars
// Filled star: #1b306c (navy), Empty: gray outline
// Optional label: "Rating : X/5.0", left or right of stars

export type RatingSize = 'Normal' | 'Sm';

export type RatingProps = {
  value?: number;          // 0–5
  max?: number;            // default 5
  size?: RatingSize;
  label?: string;          // custom label; if true-ish, auto-generates "Rating : X/5.0"
  showLabel?: boolean;     // show auto label
  labelPosition?: 'left' | 'right';
  onChange?: (v: number) => void;
  readOnly?: boolean;
  className?: string;
};

// 5-point star, 18×18 viewBox, center 9,9
const STAR_PATH = 'M9,1 L11.06,6.17 L16.61,6.53 L12.33,10.08 L13.70,15.47 L9,12.50 L4.30,15.47 L5.67,10.08 L1.39,6.53 L6.94,6.17 Z';

function Star({ filled, size, hovered }: { filled: boolean; size: number; hovered?: boolean }) {
  const color = filled || hovered ? '#1b306c' : 'none';
  const stroke = filled || hovered ? 'none' : '#d1d5db';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill={color}
      stroke={stroke}
      strokeWidth={filled || hovered ? 0 : 1.5}
      aria-hidden="true"
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

export function Rating({
  value = 0,
  max = 5,
  size = 'Normal',
  label,
  showLabel = false,
  labelPosition = 'right',
  onChange,
  readOnly = false,
  className = '',
}: RatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const starPx = size === 'Sm' ? 24 : 28;
  const iconPx = size === 'Sm' ? 18 : 20;
  const interactive = !!onChange && !readOnly;

  const displayValue = hover ?? value;
  const autoLabel = label ?? (showLabel ? `Rating : ${value.toFixed(1)}/${max}.0` : undefined);

  const stars = Array.from({ length: max }, (_, i) => (
    <span
      key={i}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Rate ${i + 1} out of ${max}` : undefined}
      onClick={interactive ? () => onChange(i + 1) : undefined}
      onMouseEnter={interactive ? () => setHover(i + 1) : undefined}
      onMouseLeave={interactive ? () => setHover(null) : undefined}
      onKeyDown={interactive ? (e) => e.key === 'Enter' && onChange(i + 1) : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: starPx,
        height: starPx,
        cursor: interactive ? 'pointer' : 'default',
      }}
    >
      <Star filled={i < displayValue} size={iconPx} hovered={hover !== null && i < hover} />
    </span>
  ));

  const labelEl = autoLabel ? (
    <span style={{ fontSize: 14, lineHeight: '20px', color: '#1b306c', whiteSpace: 'nowrap' }}>
      {autoLabel}
    </span>
  ) : null;

  return (
    <div className={`inline-flex items-center ${className}`}>
      {labelEl && labelPosition === 'left' && (
        <span style={{ paddingRight: 12 }}>{labelEl}</span>
      )}
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        {stars}
      </div>
      {labelEl && labelPosition === 'right' && (
        <span style={{ paddingLeft: 12 }}>{labelEl}</span>
      )}
    </div>
  );
}
