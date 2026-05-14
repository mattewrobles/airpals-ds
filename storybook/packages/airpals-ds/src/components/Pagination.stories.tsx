import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">HTML + Tailwind</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
          className="px-2 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto bg-white dark:bg-slate-900 leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────── */

type PaginationVariant = 'default' | 'compact';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  showPrevNext?: boolean;
  showEllipsis?: boolean;
  variant?: PaginationVariant;
};

function buildPageArray(current: number, total: number, showEllipsis: boolean): (number | '...')[] {
  if (!showEllipsis || total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [];

  if (current <= 4) {
    // Near start: show first 5 + ellipsis + last
    for (let i = 1; i <= Math.min(5, total); i++) pages.push(i);
    if (total > 6) pages.push('...');
    if (total > 5) pages.push(total);
  } else if (current >= total - 3) {
    // Near end: show first + ellipsis + last 5
    pages.push(1);
    if (total > 6) pages.push('...');
    for (let i = Math.max(total - 4, 2); i <= total; i++) pages.push(i);
  } else {
    // Middle: first + ellipsis + current-1, current, current+1 + ellipsis + last
    pages.push(1);
    pages.push('...');
    pages.push(current - 1);
    pages.push(current);
    pages.push(current + 1);
    pages.push('...');
    pages.push(total);
  }

  return pages;
}

function ChevronLeft() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Pagination({
  currentPage: initialPage,
  totalPages,
  showPrevNext = true,
  showEllipsis = false,
  variant = 'default',
}: PaginationProps) {
  const [current, setCurrent] = useState(initialPage);

  const pages = buildPageArray(current, totalPages, showEllipsis);
  const isFirst = current === 1;
  const isLast = current === totalPages;

  const prevDisabledCls = isFirst ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:text-brand-navy dark:hover:text-slate-50';
  const nextDisabledCls = isLast  ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:text-brand-navy dark:hover:text-slate-50';

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">

      {/* Prev */}
      {showPrevNext && (
        <button
          onClick={() => !isFirst && setCurrent(c => c - 1)}
          className={`flex items-center gap-1 px-2 h-8 text-sm text-slate-600 dark:text-slate-400 rounded-lg transition-colors ${prevDisabledCls}`}
          aria-label="Previous page"
        >
          <ChevronLeft />
          {variant === 'default' && <span>Prev</span>}
        </button>
      )}

      {/* Pages */}
      {pages.map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-8 h-8 flex items-center justify-center text-sm text-slate-400 select-none"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrent(page as number)}
            aria-current={current === page ? 'page' : undefined}
            className={[
              'w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-colors',
              current === page
                ? 'bg-brand-blue text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
            ].join(' ')}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      {showPrevNext && (
        <button
          onClick={() => !isLast && setCurrent(c => c + 1)}
          className={`flex items-center gap-1 px-2 h-8 text-sm text-slate-600 dark:text-slate-400 rounded-lg transition-colors ${nextDisabledCls}`}
          aria-label="Next page"
        >
          {variant === 'default' && <span>Next</span>}
          <ChevronRight />
        </button>
      )}
    </nav>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage:   { control: 'number', description: 'Currently active page (1-indexed)' },
    totalPages:    { control: 'number', description: 'Total number of pages' },
    showPrevNext:  { control: 'boolean', description: 'Show Prev/Next buttons' },
    showEllipsis:  { control: 'boolean', description: 'Collapse distant pages into ellipsis' },
    variant:       { control: 'select', options: ['default', 'compact'], description: 'default = labeled prev/next · compact = arrows only' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          'Numbered pagination for Airpals shipment tables and lists.',
          '',
          '| Token | Usage |',
          '|-------|-------|',
          '| `bg-brand-blue text-white` | Active page |',
          '| `text-slate-600 hover:bg-slate-100` | Inactive page |',
          '| `opacity-40 cursor-not-allowed` | Disabled prev/next |',
          '',
          'Interactive — clicking updates the active page internally via `useState`.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = {
  args: { currentPage: 1, totalPages: 5, showPrevNext: true, showEllipsis: false, variant: 'default' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Pagination — page 1 of 5 -->
<nav aria-label="Pagination" class="flex items-center gap-1">
  <!-- Prev (disabled) -->
  <button class="flex items-center gap-1 px-2 h-8 text-sm text-slate-600 rounded-lg opacity-40 cursor-not-allowed">
    <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Prev
  </button>
  <!-- Active page -->
  <button class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg bg-brand-blue text-white" aria-current="page">1</button>
  <!-- Other pages -->
  <button class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">2</button>
  <button class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">3</button>
  <button class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">4</button>
  <button class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">5</button>
  <!-- Next -->
  <button class="flex items-center gap-1 px-2 h-8 text-sm text-slate-600 rounded-lg hover:text-brand-navy">
    Next
    <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</nav>`,
      },
    },
  },
};

export const MiddlePage: Story = {
  name: 'Middle Page (with Ellipsis)',
  args: { currentPage: 6, totalPages: 12, showPrevNext: true, showEllipsis: true, variant: 'default' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Ellipsis pattern: 1 ... 5 [6] 7 ... 12 -->
<nav aria-label="Pagination" class="flex items-center gap-1">
  <button class="flex items-center gap-1 px-2 h-8 text-sm text-slate-600 hover:text-brand-navy rounded-lg">
    <svg class="w-4 h-4" .../>Prev
  </button>
  <button class="w-8 h-8 ... text-slate-600 hover:bg-slate-100">1</button>
  <span class="w-8 h-8 flex items-center justify-center text-slate-400 text-sm select-none">…</span>
  <button class="w-8 h-8 ... text-slate-600 hover:bg-slate-100">5</button>
  <button class="w-8 h-8 ... bg-brand-blue text-white" aria-current="page">6</button>
  <button class="w-8 h-8 ... text-slate-600 hover:bg-slate-100">7</button>
  <span class="w-8 h-8 flex items-center justify-center text-slate-400 text-sm select-none">…</span>
  <button class="w-8 h-8 ... text-slate-600 hover:bg-slate-100">12</button>
  <button class="flex items-center gap-1 px-2 h-8 text-sm text-slate-600 hover:text-brand-navy rounded-lg">
    Next<svg class="w-4 h-4" .../>
  </button>
</nav>`,
      },
    },
  },
};

export const LastPage: Story = {
  name: 'Last Page',
  args: { currentPage: 5, totalPages: 5, showPrevNext: true, showEllipsis: false, variant: 'default' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Next is disabled when on last page -->
<button class="flex items-center gap-1 px-2 h-8 text-sm text-slate-600 rounded-lg opacity-40 cursor-not-allowed">
  Next
  <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>`,
      },
    },
  },
};

export const Compact: Story = {
  args: { currentPage: 3, totalPages: 8, showPrevNext: true, showEllipsis: true, variant: 'compact' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Compact — arrows only, no labels -->
<nav aria-label="Pagination" class="flex items-center gap-1">
  <button class="flex items-center px-2 h-8 text-sm text-slate-600 hover:text-brand-navy rounded-lg">
    <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <!-- page buttons ... -->
  <button class="flex items-center px-2 h-8 text-sm text-slate-600 hover:text-brand-navy rounded-lg">
    <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</nav>`,
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-10">

      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Default — Page 1 of 5</p>
        <Pagination currentPage={1} totalPages={5} />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">With Ellipsis — Page 6 of 12</p>
        <Pagination currentPage={6} totalPages={12} showEllipsis />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Near Start — Page 2 of 12</p>
        <Pagination currentPage={2} totalPages={12} showEllipsis />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Near End — Page 11 of 12</p>
        <Pagination currentPage={11} totalPages={12} showEllipsis />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Compact (arrows only)</p>
        <Pagination currentPage={3} totalPages={8} variant="compact" showEllipsis />
      </div>

      {/* ── Code snippets ── */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Active page button',
              code: `<button
  class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg
         bg-brand-blue text-white"
  aria-current="page"
>
  3
</button>`,
            },
            {
              label: 'Inactive page button',
              code: `<button
  class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg
         text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
>
  4
</button>`,
            },
            {
              label: 'Disabled prev button',
              code: `<button
  class="flex items-center gap-1 px-2 h-8 text-sm text-slate-600 rounded-lg
         opacity-40 cursor-not-allowed pointer-events-none"
  aria-label="Previous page"
>
  <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  Prev
</button>`,
            },
            {
              label: 'Ellipsis',
              code: `<span class="w-8 h-8 flex items-center justify-center text-sm text-slate-400 select-none">
  …
</span>`,
            },
          ].map((s) => (
            <CodeBlock key={s.label} code={s.code} />
          ))}
        </div>
      </div>
    </div>
  ),
};
