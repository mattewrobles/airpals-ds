import React from 'react';

export type ButtonType = 'Primary' | 'Secondary' | 'Ghost' | 'Ghost II' | 'Negative' | 'Accent';
export type ButtonState = 'Default' | 'Disabled';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  label: string;
  type?: ButtonType;
  state?: ButtonState;
  size?: ButtonSize;
  onClick?: () => void;
};

const typeClasses: Record<ButtonType, string> = {
  Primary:   'bg-[#0043ff] text-white hover:opacity-90 active:opacity-80',
  Secondary: 'border border-[#0043ff] text-[#0043ff] bg-transparent hover:bg-[#e6f1fd]',
  Ghost:     'bg-transparent text-[#1b306c] hover:bg-slate-100',
  'Ghost II':'bg-slate-100 text-[#1b306c] hover:bg-slate-200',
  Negative:  'bg-red-600 text-white hover:opacity-90',
  Accent:    'bg-[#1b306c] text-white hover:opacity-90',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({ label, type = 'Primary', state = 'Default', size = 'md', onClick }: ButtonProps) {
  const disabled = state === 'Disabled';
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center font-medium rounded-lg transition-all',
        typeClasses[type],
        sizeClasses[size],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
