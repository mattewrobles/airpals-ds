"use client";

import React, { useEffect, useState } from 'react';

export type TextareaState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

export type TextareaProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  state?: TextareaState;
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

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label, placeholder = 'Placeholder', helperText,
      state = 'Default', maxLength, rows = 5,
      value, defaultValue, onChange,
      id, name, className = '',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    useEffect(() => {
      if (isControlled) setInternalValue(value!);
    }, [value, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e.target.value);
    };

    const displayValue = isControlled ? value! : internalValue;
    const disabled = state === 'Disabled';
    const textareaId = id ?? (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const helperId = helperText && textareaId ? `${textareaId}-helper` : undefined;

    const borderClass =
      state === 'Focused'  ? 'border-[3px] border-[#c3cef6]' :
      state === 'Hover'    ? 'border-[1.5px] border-[#0043ff]' :
                             'border border-[#dfe4ea]';
    const bgClass = state === 'Disabled' ? 'bg-[#f3f4f6]' : 'bg-white';
    const labelColor = state === 'Disabled' ? 'text-[#6b7280]' : 'text-[#111928]';

    return (
      <div className="flex flex-col gap-2.5 w-full">
        {label && (
          <label htmlFor={textareaId} className={`text-base font-medium leading-6 ${labelColor}`}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          value={displayValue}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy ?? helperId}
          className={[
            'w-full rounded-[6px] p-5 text-base text-[#111928]',
            'placeholder:text-[#9ca3af]',
            bgClass, borderClass,
            'outline-none transition-colors resize-none',
            disabled ? 'cursor-not-allowed' : '',
            className,
          ].join(' ')}
        />
        <div className="flex justify-between items-center">
          {helperText && <p id={helperId} className="text-sm text-[#637381]">{helperText}</p>}
          {maxLength && <p className="text-sm text-[#637381] ml-auto">{displayValue.length}/{maxLength}</p>}
        </div>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
