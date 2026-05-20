import React from 'react';

export type InputState = 'Default' | 'Hover' | 'Focused' | 'Disabled';
export type InputStatus = 'Default' | 'Error' | 'Success';

export type InputProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  state?: InputState;
  status?: InputStatus;
  value?: string;
};

export function Input({ label, placeholder = 'Placeholder', helperText, state = 'Default', status = 'Default', value }: InputProps) {
  const disabled = state === 'Disabled';
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
      {label && <label className={`text-base font-medium leading-6 ${labelColor}`}>{label}</label>}
      <input
        type="text"
        disabled={disabled}
        defaultValue={value}
        placeholder={placeholder}
        className={[
          'w-full rounded-[6px] pt-3 pr-4 pb-3 pl-5 text-base text-[#111928]',
          'placeholder:text-[#9ca3af] outline-none transition-colors',
          bgClass, borderClass,
          disabled ? 'cursor-not-allowed' : '',
        ].join(' ')}
      />
      {helperText && <p className={`text-sm ${helperColor}`}>{helperText}</p>}
    </div>
  );
}
