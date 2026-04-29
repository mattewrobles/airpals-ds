import React, { useId } from 'react';
import './Input.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'number';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: InputType;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  disabled = false,
  size = 'md',
  leftIcon,
  rightIcon,
  type = 'text',
}) => {
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();

  const wrapperClass = [
    'input-field',
    `input-field--${size}`,
    error ? 'input-field--error' : '',
    disabled ? 'input-field--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const describedBy = [
    error ? errorId : undefined,
    hint && !error ? hintId : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={wrapperClass}>
        {leftIcon && (
          <span className="input-field__icon input-field__icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className="input-field__input"
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
        {rightIcon && (
          <span className="input-field__icon input-field__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <span id={errorId} className="input-message input-message--error" role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={hintId} className="input-message input-message--hint">
          {hint}
        </span>
      )}
    </div>
  );
};

export default Input;
