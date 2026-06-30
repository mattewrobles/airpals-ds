"use client";

import React from 'react';

export type AlertUseCase = 'warning' | 'success' | 'info' | 'error' | 'alert';

export type AlertAction = {
  label: string;
  onClick: () => void;
};

export type AlertDetails = {
  label?: string;
  href?: string;
  onClick?: () => void;
};

export type AlertProps = {
  useCase?: AlertUseCase;
  /** Bold headline row */
  title?: string;
  /** Body description text */
  description?: string;
  /** Additional bullet list */
  items?: string[];
  /**
   * Left accent bar. Always visible for `error` and `success`.
   * Controls visibility for `warning`, `info`, `alert`.
   */
  border?: boolean;
  /** Inline action buttons (e.g. "View Status", "Dismiss") */
  actions?: AlertAction[];
  /** Right-side link with arrow (e.g. "Details →") */
  details?: AlertDetails;
};

// DS Semantic Tailwind classes — all resolved through CSS vars
const THEME = {
  error:   { bg: 'bg-surface-error',   text: 'text-ink-error',   icon: 'text-icon-error',   bar: 'bg-icon-error'   },
  warning: { bg: 'bg-surface-warning', text: 'text-ink-warning', icon: 'text-icon-warning', bar: 'bg-icon-warning' },
  success: { bg: 'bg-surface-success', text: 'text-ink-success', icon: 'text-icon-success', bar: 'bg-icon-success' },
  info:    { bg: 'bg-surface-info',    text: 'text-ink-info',    icon: 'text-icon-info',    bar: 'bg-icon-info'    },
  alert:   { bg: 'bg-surface-error',   text: 'text-ink-error',   icon: 'text-icon-error',   bar: 'bg-icon-error'   },
} as const satisfies Record<AlertUseCase, { bg: string; text: string; icon: string; bar: string }>;

// Per Figma: error/success always show bar — warning/info/alert follow `border` prop
function showBar(useCase: AlertUseCase, border: boolean): boolean {
  return useCase === 'error' || useCase === 'success' || border;
}

const ICONS: Record<AlertUseCase, React.ReactNode> = {
  error: (
    <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
  alert: (
    <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
};

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10h11M10.5 5l5 5-5 5" />
  </svg>
);

export function Alert({
  useCase = 'error',
  title,
  description,
  items,
  border = false,
  actions,
  details,
}: AlertProps) {
  const c = THEME[useCase];
  const bar = showBar(useCase, border);
  const hasItems = items && items.length > 0;
  const hasActions = actions && actions.length > 0;

  return (
    <div className={`flex overflow-hidden rounded-[var(--radius-md)] ${c.bg}`}>

      {/* Accent bar — 4px = var(--spacing-1) */}
      {bar && <div className={`w-[var(--spacing-1)] flex-shrink-0 self-stretch ${c.bar}`} />}

      {/* Alert frame — p-4, gap-4 */}
      <div
        className="flex flex-1 items-start min-w-0"
        style={{ padding: 'var(--spacing-4)', gap: 'var(--spacing-4)' }}
      >

        {/* Icon 20×20 — aligned to first text line */}
        <span className={`${c.icon} flex-shrink-0 mt-0.5`}>
          {ICONS[useCase]}
        </span>

        {/* Main content — gap-2 vertical */}
        <div
          className="flex-1 flex flex-col items-start min-w-0"
          style={{ gap: 'var(--spacing-2)' }}
        >
          {/* Title + description + items — gap-1 vertical */}
          <div className="flex flex-col w-full" style={{ gap: 'var(--spacing-1)' }}>
            {title && (
              <p
                className={`font-semibold ${c.text}`}
                style={{ fontSize: 'var(--type-sm-size)', lineHeight: 'var(--type-sm-lh)' }}
              >
                {title}
              </p>
            )}
            {description && (
              <p
                className={`font-normal ${c.text}`}
                style={{ fontSize: 'var(--type-sm-size)', lineHeight: 'var(--type-sm-lh)' }}
              >
                {description}
              </p>
            )}
            {hasItems && (
              <ul className="flex flex-col" style={{ gap: 'var(--spacing-0-5)', marginTop: 'var(--spacing-0-5)' }}>
                {items!.map((item, i) => (
                  <li
                    key={i}
                    className={`font-normal list-disc ml-[var(--spacing-4)] ${c.text}`}
                    style={{ fontSize: 'var(--type-sm-size)', lineHeight: 'var(--type-sm-lh)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Actions — gap-6, font-medium */}
          {hasActions && (
            <div className="flex" style={{ gap: 'var(--spacing-6)' }}>
              {actions!.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className={`font-medium hover:underline focus:outline-none ${c.text}`}
                  style={{ fontSize: 'var(--type-sm-size)', lineHeight: 'var(--type-sm-lh)' }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details link — right side, gap-2 */}
        {details && (
          <div className="flex-shrink-0 flex items-start">
            {details.href ? (
              <a
                href={details.href}
                className={`flex items-center hover:underline ${c.text}`}
                style={{ gap: 'var(--spacing-2)', fontSize: 'var(--type-sm-size)', lineHeight: 'var(--type-sm-lh)' }}
              >
                <span>{details.label ?? 'Details'}</span>
                <ArrowIcon />
              </a>
            ) : (
              <button
                onClick={details.onClick}
                className={`flex items-center hover:underline focus:outline-none ${c.text}`}
                style={{ gap: 'var(--spacing-2)', fontSize: 'var(--type-sm-size)', lineHeight: 'var(--type-sm-lh)' }}
              >
                <span>{details.label ?? 'Details'}</span>
                <ArrowIcon />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
