"use client";

import React from 'react';

export type TagState = 'Default' | 'Hover' | 'Focus' | 'Disable';

export type TagProps = {
  label: string;
  state?: TagState;
  closable?: boolean;
  onClose?: () => void;
};

const X_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const stateClasses: Record<TagState, string> = {
  Default: 'bg-surface-primary text-ink-primary border-line-primary',
  Hover:   'bg-surface-secondary text-ink-primary border-line-primary',
  Focus:   'bg-surface-secondary text-ink-accent border-line-accent border-2',
  Disable: 'bg-surface-disable text-ink-disable border-line-primary cursor-not-allowed',
};

export function Tag({ label, state = 'Default', closable = false, onClose }: TagProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-sm font-medium h-8 transition-colors ${stateClasses[state]}`}>
      {label}
      {closable && state !== 'Disable' && (
        <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity" aria-label={`Remove ${label}`}>
          {X_ICON}
        </button>
      )}
    </span>
  );
}
