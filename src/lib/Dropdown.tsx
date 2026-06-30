"use client";

import React, { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DropdownState = 'Default' | 'Hover' | 'Focused' | 'Disabled'; // legacy compat

export type DropdownOption = {
  label: string;
  value: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  disabled?: boolean;
};

export type DropdownProps = {
  label?: string;
  placeholder?: string;
  options?: DropdownOption[] | string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  // legacy compat
  state?: DropdownState;
  selectedOption?: string;
  id?: string;
  name?: string;
  className?: string;
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── DropdownRow — Figma 738-3450 ─────────────────────────────────────────────
// Row states: default / hover / active (selected) / disabled
// px-4 py-2, gap-2, text-sm/normal. Avatar 32px. Subtitle xs/medium/#6b7280.

type RowState = 'default' | 'hover' | 'active' | 'disabled';

type DropdownRowProps = {
  label: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  rowState?: RowState;
  divider?: boolean;
  onClick?: () => void;
};

function DropdownRow({ label, subtitle, avatar, rowState = 'default', divider = true, onClick }: DropdownRowProps) {
  const [hovered, setHovered] = useState(false);

  const bgCls =
    rowState === 'active'   ? 'bg-surface-accent' :
    rowState === 'disabled' ? 'bg-surface-disable cursor-not-allowed' :
    hovered                 ? 'bg-surface-secondary cursor-pointer' :
                              'bg-surface-primary cursor-pointer';

  const titleCls =
    rowState === 'active'   ? 'text-ink-on-accent' :       // white
    rowState === 'disabled' ? 'text-ink-disable' :
    hovered                 ? 'text-ink-secondary' :
                              'text-ink-primary';

  return (
    <div
      role="option"
      aria-selected={rowState === 'active'}
      aria-disabled={rowState === 'disabled'}
      onClick={rowState === 'disabled' ? undefined : onClick}
      onMouseEnter={() => rowState === 'default' && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col w-full shrink-0 ${bgCls}`}
    >
      <div className="flex items-center gap-2 px-4 py-2 w-full">
        {avatar && (
          <div className="shrink-0 size-8 rounded-full overflow-hidden">
            {avatar}
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0">
          <span className={`text-sm font-normal leading-5 ${titleCls} truncate`}>{label}</span>
          {subtitle && (
            <span className="text-xs font-medium leading-4 text-[#6b7280] truncate">{subtitle}</span>
          )}
        </div>
      </div>
      {divider && <div className="w-full border-b border-line-primary" />}
    </div>
  );
}

// ─── Dropdown — Figma 738-3496 ────────────────────────────────────────────────
// Trigger: label (xs/medium/navy) + field (border-line-primary rounded-md py-3 px-3)
// Menu: rounded-lg shadow-xs overflow-hidden, floats below with mt-2, z-50

function normalizeOption(o: DropdownOption | string): DropdownOption {
  return typeof o === 'string' ? { label: o, value: o } : o;
}

export function Dropdown({
  label,
  placeholder = 'Dropdown',
  options: rawOptions = [],
  value: controlledValue,
  defaultValue,
  onChange,
  disabled: disabledProp = false,
  state,
  selectedOption,
  id,
  name,
  className = '',
}: DropdownProps) {
  // legacy compat: state=Disabled → disabled
  const disabled = disabledProp || state === 'Disabled';

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(controlledValue ?? defaultValue ?? selectedOption ?? '');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue);
  }, [controlledValue]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const options = rawOptions.map(normalizeOption);
  const selected = options.find(o => o.value === value);

  const select = (opt: DropdownOption) => {
    if (opt.disabled) return;
    setValue(opt.value);
    setOpen(false);
    onChange?.(opt.value);
  };

  const triggerId = id ?? (label ? `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const triggerBorder = open
    ? '[border-width:3px] border-[#adbcf2]'
    : 'border border-line-primary hover:border-line-accent';

  return (
    <div ref={wrapRef} className={`relative w-full ${className}`}>
      {/* Hidden input for form compat */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Label */}
      {label && (
        <label
          htmlFor={triggerId}
          className={`block text-xs font-medium leading-4 mb-1 ${disabled ? 'text-ink-disable' : 'text-ink-primary'}`}
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={[
          'w-full flex items-center justify-between gap-[10px] px-3 py-[10px] rounded-md bg-surface-primary transition-colors duration-[var(--motion-fast)] outline-none',
          disabled ? 'border border-line-primary bg-surface-disable cursor-not-allowed' : triggerBorder,
        ].join(' ')}
      >
        <span className={`text-sm font-normal leading-5 truncate ${selected ? 'text-ink-primary' : 'text-ink-secondary'}`}>
          {selected?.label ?? placeholder}
        </span>
        <span className="shrink-0 text-ink-secondary">
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      {/* Menu */}
      {open && !disabled && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-lg overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),0px_4px_8px_rgba(0,0,0,0.08)]"
        >
          {options.map((opt, i) => (
            <DropdownRow
              key={opt.value}
              label={opt.label}
              subtitle={opt.subtitle}
              avatar={opt.avatar}
              rowState={
                opt.disabled   ? 'disabled' :
                opt.value === value ? 'active' :
                'default'
              }
              divider={i < options.length - 1}
              onClick={() => select(opt)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
