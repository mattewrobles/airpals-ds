import React, { useState } from 'react';

export type TextareaState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

export type TextareaProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  state?: TextareaState;
  maxLength?: number;
  rows?: number;
};

export function Textarea({ label, placeholder = 'Placeholder', helperText, state = 'Default', maxLength, rows = 5 }: TextareaProps) {
  const [value, setValue] = useState('');
  const disabled = state === 'Disabled';

  const borderClass =
    state === 'Focused'  ? 'border-[3px] border-[#c3cef6]' :
    state === 'Hover'    ? 'border-[1.5px] border-[#0043ff]' :
                           'border border-[#dfe4ea]';

  const bgClass = state === 'Disabled' ? 'bg-[#f3f4f6]' : 'bg-white';
  const labelColor = state === 'Disabled' ? 'text-[#6b7280]' : 'text-[#111928]';

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {label && <label className={`text-base font-medium leading-6 ${labelColor}`}>{label}</label>}
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={[
          'w-full rounded-[6px] p-5 text-base text-[#111928]',
          'placeholder:text-[#9ca3af]',
          bgClass, borderClass,
          'outline-none transition-colors resize-none',
          disabled ? 'cursor-not-allowed' : '',
        ].join(' ')}
      />
      <div className="flex justify-between items-center">
        {helperText && <p className="text-sm text-[#637381]">{helperText}</p>}
        {maxLength && <p className="text-sm text-[#637381] ml-auto">{value.length}/{maxLength}</p>}
      </div>
    </div>
  );
}
