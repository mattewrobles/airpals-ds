import React from 'react';
import './Card.css';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardVariant = 'default' | 'elevated' | 'outlined';

export interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  padding?: CardPadding;
  variant?: CardVariant;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  padding = 'md',
  variant = 'default',
  onClick,
}) => {
  const isClickable = Boolean(onClick);

  const classNames = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    isClickable ? 'card--clickable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); } : undefined}
    >
      {(title || description) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {description && <p className="card__description">{description}</p>}
        </div>
      )}
      {children && <div className="card__content">{children}</div>}
    </div>
  );
};

export default Card;
