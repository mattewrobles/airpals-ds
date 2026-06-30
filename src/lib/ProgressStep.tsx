"use client";

import React from 'react';

// Figma 878-2129 — ProgressStep (Advance)
// Active:   bg #fc4575 (brand/pink), shadow pink, label #fc4575
// Inactive: bg white, border #e2e8f0, shadow slate-blue, label #cbd5e1 (text/disable)
// Icon: 15px · Label: 8px semibold uppercase tracking-[1.3375px]
// Pill height: 27px · padding: 6px · rounded-full

export type ProgressStepProps = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  className?: string;
};

export function ProgressStep({ label, icon, active = false, className = '' }: ProgressStepProps) {
  return (
    <div className={`flex flex-col gap-2 items-center ${className}`}>
      {/* Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 27,
          padding: 6,
          borderRadius: 999,
          ...(active
            ? {
                backgroundColor: '#fc4575',
                boxShadow: '1px 1.5px 2px rgba(252,69,117,0.55)',
                border: 'none',
              }
            : {
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '1px 1.5px 2px rgba(102,128,201,0.29)',
              }),
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 15,
            height: 15,
            color: active ? '#ffffff' : '#cbd5e1',
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: 8,
          fontWeight: 600,
          fontFamily: 'Inter',
          letterSpacing: '1.3375px',
          textTransform: 'uppercase',
          color: active ? '#fc4575' : '#cbd5e1',
          whiteSpace: 'nowrap',
          lineHeight: 'normal',
        }}
      >
        {label}
      </span>
    </div>
  );
}
