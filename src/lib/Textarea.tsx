"use client";

import React, { useState, useEffect } from 'react';

export type TextareaProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

// Figma node 625-3842
// Border states (CSS-driven):
//   Default  → 1px #dfe4ea (hairline)
//   Hover    → 1.5px #0043ff (accent)
//   Focused  → 3px #a5b4fc (indigo-300)
//   Disabled → 1px #cbd5e1 + bg-surface-disable
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label, placeholder = 'Placeholder', helperText,
      disabled = false, maxLength, rows = 5,
      value, defaultValue, onChange,
      id, name, className = '',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    // Track char count for counter display
    const [charCount, setCharCount] = useState((defaultValue ?? value ?? '').length);

    // Sync charCount when controlled value changes externally
    useEffect(() => {
      if (value !== undefined) setCharCount(value.length);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e.target.value);
    };

    const textareaId = id ?? (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const helperId = helperText && textareaId ? `${textareaId}-helper` : undefined;

    const fieldCls = disabled
      ? 'bg-surface-disable border border-[#cbd5e1] cursor-not-allowed'
      : [
          'bg-surface-primary border border-[#dfe4ea]',
          'hover:[border-width:1.5px] hover:border-line-accent',
          'focus:[border-width:3px] focus:border-[#a5b4fc]',
        ].join(' ');

    const showFooter = helperText || maxLength;

    return (
      <div className={`flex flex-col gap-[10px] w-full ${className}`}>

        {/* Label — text-base/medium/navy */}
        {label && (
          <label
            htmlFor={textareaId}
            className={`text-base font-medium leading-6 ${disabled ? 'text-ink-disable' : 'text-ink-primary'}`}
          >
            {label}
          </label>
        )}

        {/* Native textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          {...(value !== undefined ? { value } : { defaultValue })}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy ?? helperId}
          className={[
            'w-full rounded-md p-5',
            'text-base font-normal leading-6 text-ink-primary',
            'placeholder:text-ink-disable',
            'outline-none transition-colors resize-none',
            fieldCls,
          ].join(' ')}
        />

        {/* Footer: helper text (left) + counter (right) */}
        {showFooter && (
          <div className="flex items-center justify-between text-sm font-normal leading-5 text-ink-primary">
            {helperText
              ? <p id={helperId} className="flex-1 min-w-0">{helperText}</p>
              : <span />
            }
            {maxLength && (
              <p className="shrink-0 text-right">{charCount}/{maxLength}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
