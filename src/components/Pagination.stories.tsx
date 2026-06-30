import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Pagination } from '../lib/Pagination';
import type { PaginationProps } from '../lib/Pagination';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalPages:   { control: { type: 'number', min: 1, max: 50 } },
    currentPage:  { control: { type: 'number', min: 1 } },
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

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Pagination'}
      types={['PaginationProps']}
      jsx={`<Pagination total={50} page={1} perPage={10} onChange={(p) => console.log(p)} />`}
      figmaKey="4446b332c09cbed4a66d914148a05862a3f25851"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = { args: { totalPages: 10, currentPage: 1 } };
export const MiddlePage: Story = { name: 'Middle Page', args: { totalPages: 10, currentPage: 5 } };
export const LastPage: Story = { name: 'Last Page', args: { totalPages: 10, currentPage: 10 } };
export const FewPages: Story = { name: 'Few Pages', args: { totalPages: 4, currentPage: 2 } };
export const ManyPages: Story = { name: 'Many Pages', args: { totalPages: 20, currentPage: 10 } };

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
