"use client";

import React from 'react';

export type AlertUseCase = 'warning' | 'success' | 'info' | 'error' | 'alert';

export type AlertProps = {
  useCase?: AlertUseCase;
  title: string;
  description?: string;
  items?: string[];
  border?: boolean;
};

const ICONS: Record<AlertUseCase, React.ReactNode> = {
  error: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
  alert: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
  ),
};

const config: Record<AlertUseCase, { bg: string; iconColor: string; titleColor: string; borderColor: string }> = {
  error:   { bg: 'bg-surface-error',   iconColor: 'text-icon-error',   titleColor: 'text-ink-error',   borderColor: 'border-line-error' },
  warning: { bg: 'bg-surface-warning', iconColor: 'text-icon-warning', titleColor: 'text-ink-warning', borderColor: 'border-line-error' },
  success: { bg: 'bg-surface-success', iconColor: 'text-icon-success', titleColor: 'text-ink-success', borderColor: 'border-line-success' },
  info:    { bg: 'bg-surface-info',    iconColor: 'text-icon-info',    titleColor: 'text-ink-info',    borderColor: 'border-line-accent' },
  alert:   { bg: 'bg-surface-warning', iconColor: 'text-icon-warning', titleColor: 'text-ink-warning', borderColor: 'border-line-error' },
};

export function Alert({ useCase = 'error', title, description, items, border = false }: AlertProps) {
  const cfg = config[useCase];
  const hasBody = description || (items && items.length > 0);
  return (
    <div className={[
      'flex gap-3 rounded-[6px] p-4',
      cfg.bg,
      border ? `border ${cfg.borderColor}` : '',
    ].join(' ')}>
      <span className={cfg.iconColor}>{ICONS[useCase]}</span>
      <div className="flex flex-col gap-2 min-w-0">
        <p className={`text-sm ${hasBody ? 'font-medium' : 'font-normal'} ${cfg.titleColor} leading-5`}>{title}</p>
        {description && (
          <p className="text-sm text-ink-secondary leading-5">{description}</p>
        )}
        {items && items.length > 0 && (
          <ul className="flex flex-col gap-1">
            {items.map((item, i) => (
              <li key={i} className="text-sm text-ink-secondary leading-5 list-disc ml-4">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
