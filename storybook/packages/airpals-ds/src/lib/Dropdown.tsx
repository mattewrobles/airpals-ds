"use client";

import React, { useState } from 'react';

export type DropdownState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

export type DropdownProps = {
  label?: string;
  placeholder?: string;
  state?: DropdownState;
  expanded?: boolean;
  options?: string[];
  selectedOption?: string;
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
  label,
  placeholder = 'Select an option',
  state = 'Default',
  expanded = false,
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  selectedOption,
}: DropdownProps) {
  const [open, setOpen] = useState(expanded);
  const [selected, setSelected] = useState(selectedOption ?? '');
  const disabled = state === 'Disabled';

  const borderClass =
    state === 'Focused' ? 'border-2 border-[#0043ff]' :
    state === 'Hover'   ? 'border-slate-300' :
                          'border-slate-200';
  const bgClass = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer';
  const textClass = disabled ? 'text-slate-300' : selected ? 'text-[#1b306c]' : 'text-slate-400';
  const iconClass = disabled ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className="relative w-64 font-body">
      {label && <label className="block text-sm font-medium text-[#1b306c] mb-1">{label}</label>}
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border ${borderClass} ${bgClass} text-sm transition-colors`}
      >
        <span className={textClass}>{selected || placeholder}</span>
        <span className={iconClass}>{open ? CHEVRON_UP : CHEVRON}</span>
      </button>
      {open && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-md z-20 overflow-hidden">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${selected === opt ? 'bg-[#e6f1fd] text-[#0043ff]' : 'text-[#1b306c] hover:bg-[#e6f1fd]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}