import React from 'react';
import './Badge.css';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  label: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  label,
  dot = false,
}) => {
  const classNames = ['badge', `badge--${variant}`, `badge--${size}`]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      <span className="badge__label">{label}</span>
    </span>
  );
};

export default Badge;
