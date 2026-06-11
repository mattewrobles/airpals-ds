"use client";

import React from 'react';

// Figma: node 850-1930 "Button prueba"
// Fill: brand/pink (#FC4575) · text: white (text/on-accent) · radius: 12px · padding: 20/12px
export type ButtonDemoProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function ButtonDemo({
  label = 'hola mundo',
  onClick,
  disabled = false,
  className = '',
}: ButtonDemoProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center gap-2.5',
        'px-5 py-3 rounded-xl',
        'bg-brand-pink text-ink-on-accent',
        'text-base font-normal font-body',
        'transition-opacity',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:opacity-80',
        className,
      ].filter(Boolean).join(' ')}
    >
      {label}
    </button>
  );
}
