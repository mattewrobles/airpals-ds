"use client";

import React, { useEffect, useState } from 'react';

export type DropdownState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

export type DropdownProps = {
  label?: string;
  placeholder?: string;
  state?: DropdownState;
  expanded?: boolean;
  options?: string[];
  selectedOption?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
};

const CHEVRON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CHEVRON_UP = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function Dropdown({
  label, placeholder = 'Select an option', state = 'Default',
  expanded = false, options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  selectedOption, onChange,
  id, name, className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(expanded);
  const [selected, setSelected] = useState(selectedOption ?? '');
  const disabled = state === 'Disabled';

  useEffect(() => {
    if (selectedOption !== undefined) setSelected(selectedOption);
  }, [selectedOption]);

  const handleSelect = (opt: string) => {
    setSelected(opt);
    setOpen(false);
    onChange?.(opt);
  };

  const dropdownId = id ?? (label ? `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const borderClass =
    state === 'Focused' ? 'border-2 border-line-accent' :
    state === 'Hover'   ? 'border-line-secondary' :
                          'border-line-primary';
  const bgClass = disabled ? 'bg-surface-disable cursor-not-allowed' : 'bg-surface-primary cursor-pointer';
  const textClass = disabled ? 'text-ink-disable' : selected ? 'text-ink-primary' : 'text-ink-tertiary';
  const iconClass = disabled ? 'text-ink-disable' : 'text-ink-secondary';

  return (
    <div className={`relative w-64 font-body ${className}`}>
      {label && (
        <label htmlFor={dropdownId} className="block text-sm font-medium text-ink-primary mb-1">
          {label}
        </label>
      )}
      {name && (
        <input type="hidden" name={name} value={selected} />
      )}
      <button
        id={dropdownId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border ${borderClass} ${bgClass} text-sm transition-colors`}
      >
        <span className={textClass}>{selected || placeholder}</span>
        <span className={iconClass}>{open ? CHEVRON_UP : CHEVRON}</span>
      </button>
      {open && !disabled && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-surface-primary border border-line-primary rounded-lg shadow-md z-20 overflow-hidden"
        >
          {options.map(opt => (
            <li key={opt} role="option" aria-selected={selected === opt}>
              <button
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${selected === opt ? 'bg-surface-secondary text-ink-accent' : 'text-ink-primary hover:bg-surface-secondary'}`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
