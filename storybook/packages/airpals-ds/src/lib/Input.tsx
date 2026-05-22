"use client";

import React, { useEffect, useState } from 'react';

export type InputState = 'Default' | 'Hover' | 'Focused' | 'Disabled';
export type InputStatus = 'Default' | 'Error' | 'Success';

export type InputProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  state?: InputState;
  status?: InputStatus;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label, placeholder = 'Placeholder', helperText,
      state = 'Default', status = 'Default',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e.target.value);
    };

    const disabled = state === 'Disabled';
    const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const helperId = helperText && inputId ? `${inputId}-helper` : undefined;

    const borderClass =
      state === 'Focused'  ? 'border-[3px] border-[#adbcf2]' :
      state === 'Hover'    ? 'border border-[#0043ff]' :
      state === 'Disabled' ? 'border border-[#f3f4f6]' :
      status === 'Error'   ? 'border border-[#f23030]' :
      status === 'Success' ? 'border border-[#22ad5c]' :
                             'border border-[#dfe4ea]';
    const bgClass = state === 'Disabled' ? 'bg-[#f3f4f6]' : 'bg-white';
    const labelColor = state === 'Disabled' ? 'text-[#6b7280]' : 'text-[#111928]';
    const helperColor = status === 'Error' ? 'text-[#f23030]' : status === 'Success' ? 'text-[#22ad5c]' : 'text-[#4b5563]';

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className={`text-base font-medium leading-6 ${labelColor}`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="text"
          disabled={disabled}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy ?? helperId}
          aria-invalid={status === 'Error' || undefined}
          className={[
            'w-full rounded-[6px] pt-3 pr-4 pb-3 pl-5 text-base text-[#111928]',
            'placeholder:text-[#9ca3af] outline-none transition-colors',
            bgClass, borderClass,
            disabled ? 'cursor-not-allowed' : '',
            className,
          ].join(' ')}
        />
        {helperText && (
          <p id={helperId} className={`text-sm ${helperColor}`}>{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
