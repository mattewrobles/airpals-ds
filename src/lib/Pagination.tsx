"use client";

import React, { useState } from 'react';

// Figma 625-3520 — Pagination
// Default style: 34px square buttons, border #dfe4ea, active bg #0043ff text-white
// Labeled variant: "← Previous" / "Next →" text links flanking page numbers
// Ellipsis shown when range > 7 pages
// Font: Inter Regular 16px, color #1b306c

export type PaginationVariant = 'default' | 'labeled';

export type PaginationProps = {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  variant?: PaginationVariant;
  className?: string;
};

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M11 13L7 9l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M7 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M9 6H3M5 4L3 6l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 6h6M7 4l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

// Shared button styles
const BTN_SIZE = { height: 34, minWidth: 34 } as const;

const navBtn = (disabled: boolean): React.CSSProperties => ({
  ...BTN_SIZE,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  border: '1px solid #dfe4ea',
  borderRadius: 6,
  backgroundColor: '#ffffff',
  color: disabled ? '#cbd5e1' : '#1b306c',
  cursor: disabled ? 'not-allowed' : 'pointer',
  flexShrink: 0,
  transition: 'background-color var(--motion-fast) var(--ease-std)',
});

const pageBtn = (active: boolean): React.CSSProperties => ({
  ...BTN_SIZE,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 13px',
  border: active ? 'none' : '1px solid #dfe4ea',
  borderRadius: 6,
  backgroundColor: active ? '#0043ff' : '#ffffff',
  color: active ? '#ffffff' : '#1b306c',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 400,
  fontFamily: 'Inter',
  lineHeight: '18px',
  flexShrink: 0,
  transition: 'background-color var(--motion-fast) var(--ease-std)',
});

export function Pagination({
  totalPages = 10,
  currentPage: externalPage,
  onPageChange,
  variant = 'default',
  className = '',
}: PaginationProps) {
  const [internalPage, setInternalPage] = useState(1);
  const current = externalPage ?? internalPage;

  const go = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setInternalPage(p);
    onPageChange?.(p);
  };

  const pages = getPages(current, totalPages);
  const isFirst = current === 1;
  const isLast = current === totalPages;

  if (variant === 'labeled') {
    return (
      <div className={`inline-flex items-center gap-4 ${className}`} style={{ fontFamily: 'Inter' }}>
        {/* Previous */}
        <button
          onClick={() => go(current - 1)}
          disabled={isFirst}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '5px 8px', borderRadius: 4,
            border: 'none', background: 'none',
            fontSize: 10, fontWeight: 400, color: isFirst ? '#cbd5e1' : '#1b306c',
            cursor: isFirst ? 'not-allowed' : 'pointer',
            flexShrink: 0,
          }}
          aria-label="Previous page"
        >
          <ArrowLeft />
          Previous
        </button>

        {/* Pages */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`e-${i}`} style={{ fontSize: 16, color: '#1b306c', padding: '0 4px' }}>…</span>
            ) : (
              <button
                key={p}
                onClick={() => go(p as number)}
                style={pageBtn(p === current)}
                aria-current={p === current ? 'page' : undefined}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => go(current + 1)}
          disabled={isLast}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '5px 8px', borderRadius: 4,
            backgroundColor: isLast ? 'transparent' : '#f3f4f6',
            border: 'none',
            fontSize: 10, fontWeight: 400, color: isLast ? '#cbd5e1' : '#1b306c',
            cursor: isLast ? 'not-allowed' : 'pointer',
            flexShrink: 0,
          }}
          aria-label="Next page"
        >
          Next
          <ArrowRight />
        </button>
      </div>
    );
  }

  // Default style
  return (
    <div className={`inline-flex items-center gap-1 ${className}`} style={{ fontFamily: 'Inter' }}>
      <button
        onClick={() => go(current - 1)}
        disabled={isFirst}
        style={navBtn(isFirst)}
        aria-label="Previous page"
        onMouseEnter={e => { if (!isFirst) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e6f1fd'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'; }}
      >
        <ChevronLeft />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`e-${i}`}
            style={{ height: 34, minWidth: 34, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#1b306c' }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => go(p as number)}
            style={pageBtn(p === current)}
            aria-current={p === current ? 'page' : undefined}
            onMouseEnter={e => { if (p !== current) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e6f1fd'; }}
            onMouseLeave={e => { if (p !== current) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'; }}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => go(current + 1)}
        disabled={isLast}
        style={navBtn(isLast)}
        aria-label="Next page"
        onMouseEnter={e => { if (!isLast) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e6f1fd'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'; }}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
