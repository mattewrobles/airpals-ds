import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';

/* ── Component ───────────────────────────────────────────── */
/*
  Figma specs (file 3oMpon9bh8T8d0hFQt7l2g):
  key: 4446b332c09cbed4a66d914148a05862a3f25851
  5 variants — Style 1–5
  Active page: bg-[#0043ff] text-white rounded-lg
  Default page: text-[#1b306c] hover:bg-[#e6f1fd] rounded-lg
  Prev/Next arrows: text-slate-500 disabled:text-slate-200
  Container: gap-1 · h-9 (36px) per button · min-w-9
*/

type PaginationProps = {
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

function Pagination({ totalPages = 10, currentPage: externalPage, onPageChange, showFirstLast = false }: PaginationProps) {
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
        <button
          onClick={() => go(1)}
          disabled={current === 1}
          className={`${btnBase} text-slate-500 hover:bg-[#e6f1fd] disabled:text-slate-200 disabled:cursor-not-allowed`}
          aria-label="First page"
        >
          {CHEVRON_DBL_LEFT}
        </button>
      )}
      <button
        onClick={() => go(current - 1)}
        disabled={current === 1}
        className={`${btnBase} text-slate-500 hover:bg-[#e6f1fd] disabled:text-slate-200 disabled:cursor-not-allowed`}
        aria-label="Previous page"
      >
        {CHEVRON_LEFT}
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="h-9 min-w-9 inline-flex items-center justify-center text-sm text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => go(p as number)}
            className={`${btnBase} ${
              current === p
                ? 'bg-[#0043ff] text-white'
                : 'text-[#1b306c] hover:bg-[#e6f1fd]'
            }`}
            aria-current={current === p ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => go(current + 1)}
        disabled={current === totalPages}
        className={`${btnBase} text-slate-500 hover:bg-[#e6f1fd] disabled:text-slate-200 disabled:cursor-not-allowed`}
        aria-label="Next page"
      >
        {CHEVRON_RIGHT}
      </button>
      {showFirstLast && (
        <button
          onClick={() => go(totalPages)}
          disabled={current === totalPages}
          className={`${btnBase} text-slate-500 hover:bg-[#e6f1fd] disabled:text-slate-200 disabled:cursor-not-allowed`}
          aria-label="Last page"
        >
          {CHEVRON_DBL_RIGHT}
        </button>
      )}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalPages:   { control: { type: 'number', min: 1, max: 50 } },
    currentPage:  { control: { type: 'number', min: 1 } },
    showFirstLast: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `4446b332c09cbed4a66d914148a05862a3f25851` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '5 variants (Style 1–5). Used for tables and paginated lists in the dashboard.',
          '',
          '| Element | Style |',
          '|---------|-------|',
          '| Active page | `bg-[#0043ff] text-white rounded-lg` |',
          '| Default page | `text-[#1b306c] hover:bg-[#e6f1fd]` |',
          '| Prev/Next | `text-slate-500` · disabled: `text-slate-200` |',
          '| Height | `h-9` (36px) |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = { args: { totalPages: 10, currentPage: 1 } };
export const MiddlePage: Story = { name: 'Middle Page', args: { totalPages: 10, currentPage: 5 } };
export const LastPage: Story = { name: 'Last Page', args: { totalPages: 10, currentPage: 10 } };
export const FewPages: Story = { name: 'Few Pages', args: { totalPages: 4, currentPage: 2 } };
export const WithFirstLast: Story = { name: 'With First/Last', args: { totalPages: 20, currentPage: 10, showFirstLast: true } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      {[
        { label: 'Page 1 of 10', totalPages: 10, currentPage: 1 },
        { label: 'Page 5 of 10', totalPages: 10, currentPage: 5 },
        { label: 'Page 10 of 10', totalPages: 10, currentPage: 10 },
        { label: 'Few pages (4)', totalPages: 4, currentPage: 2 },
      ].map(({ label, totalPages, currentPage }) => (
        <div key={label}>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">{label}</p>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      ))}

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Interactive</p>
        <Pagination totalPages={10} />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet</p>
        <CodeBlock
          code={`<nav class="inline-flex items-center gap-1">
  <button class="h-9 min-w-9 px-2 rounded-lg text-sm text-slate-500 hover:bg-[#e6f1fd]">‹</button>
  <button class="h-9 min-w-9 px-2 rounded-lg text-sm text-[#1b306c] hover:bg-[#e6f1fd]">1</button>
  <button class="h-9 min-w-9 px-2 rounded-lg text-sm bg-[#0043ff] text-white">2</button>
  <button class="h-9 min-w-9 px-2 rounded-lg text-sm text-[#1b306c] hover:bg-[#e6f1fd]">3</button>
  <button class="h-9 min-w-9 px-2 rounded-lg text-sm text-slate-500 hover:bg-[#e6f1fd]">›</button>
</nav>`}
          jsx={`<Pagination totalPages={10} currentPage={2} />`}
        />
      </div>
    </div>
  ),
};
