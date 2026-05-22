"use client";

import React, { useState } from 'react';

export type PaginationProps = {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
};

const CHEVRON_LEFT = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CHEVRON_RIGHT = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CHEVRON_DBL_LEFT = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 12L4 8L8 4M12 12L8 8L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CHEVRON_DBL_RIGHT = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4L8 8L4 12M8 4L12 8L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export function Pagination({ totalPages = 10, currentPage: externalPage, onPageChange, showFirstLast = false }: PaginationProps) {
  const [internalPage, setInternalPage] = useState(1);
  const current = externalPage ?? internalPage;

  const go = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setInternalPage(p);
    onPageChange?.(p);
  };

  const pages = getPages(current, totalPages);
  const btnBase = 'inline-flex items-center justify-center h-9 min-w-9 px-2 rounded-lg text-sm font-medium transition-colors';

  return (
    <div className="inline-flex items-center gap-1 font-body">
      {showFirstLast && (
        <button onClick={() => go(1)} disabled={current === 1} className={`${btnBase} text-slate-500 hover:bg-[#e6f1fd] disabled:text-slate-200 disabled:cursor-not-allowed`} aria-label="First page">
          {CHEVRON_DBL_LEFT}
        </button>
      )}
      <button onClick={() => go(current - 1)} disabled={current === 1} className={`${btnBase} text-slate-500 hover:bg-[#e6f1fd] disabled:text-slate-200 disabled:cursor-not-allowed`} aria-label="Previous page">
        {CHEVRON_LEFT}
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="inline-flex items-center justify-center h-9 min-w-9 text-slate-400 text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => go(p as number)}
            className={`${btnBase} ${p === current ? 'bg-[#0043ff] text-white' : 'text-[#1b306c] hover:bg-[#e6f1fd]'}`}
            aria-current={p === current ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}
      <button onClick={() => go(current + 1)} disabled={current === totalPages} className={`${btnBase} text-slate-500 hover:bg-[#e6f1fd] disabled:text-slate-200 disabled:cursor-not-allowed`} aria-label="Next page">
        {CHEVRON_RIGHT}
      </button>
      {showFirstLast && (
        <button onClick={() => go(totalPages)} disabled={current === totalPages} className={`${btnBase} text-slate-500 hover:bg-[#e6f1fd] disabled:text-slate-200 disabled:cursor-not-allowed`} aria-label="Last page">
          {CHEVRON_DBL_RIGHT}
        </button>
      )}
    </div>
  );
}