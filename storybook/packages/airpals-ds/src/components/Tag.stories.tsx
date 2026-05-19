import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';

/* ── Component ───────────────────────────────────────────── */
/*
  Figma specs (node 625:xxx, file 3oMpon9bh8T8d0hFQt7l2g):
  key: 4d4781ffd56138317c8ea0b29e5f0258143dcab7
  4 variants — State: Default / Hover / Focus / Disable
  Used for: selectable filters, tags in tables
  Height: ~32px · px-3 py-1 · rounded-lg · border border-slate-200
  Default: bg-white text-[#1b306c] border-slate-200
  Hover: bg-[#e6f1fd] border-slate-200
  Focus/Active: bg-[#e6f1fd] border-[#0043ff] text-[#0043ff]
  Disabled: bg-gray-100 text-slate-300 border-slate-200
  Closable: optional × icon
*/

type TagState = 'Default' | 'Hover' | 'Focus' | 'Disable';

type TagProps = {
  label: string;
  state?: TagState;
  closable?: boolean;
  onClose?: () => void;
};

const X_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function Tag({ label, state = 'Default', closable = false, onClose }: TagProps) {
  const stateClasses: Record<TagState, string> = {
    Default: 'bg-white text-[#1b306c] border-slate-200',
    Hover:   'bg-[#e6f1fd] text-[#1b306c] border-slate-200',
    Focus:   'bg-[#e6f1fd] text-[#0043ff] border-[#0043ff] border-2',
    Disable: 'bg-gray-100 text-slate-300 border-slate-200 cursor-not-allowed',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-sm font-medium h-8 transition-colors ${stateClasses[state]}`}
    >
      {label}
      {closable && state !== 'Disable' && (
        <button
          onClick={onClose}
          className="opacity-60 hover:opacity-100 transition-opacity"
          aria-label={`Remove ${label}`}
        >
          {X_ICON}
        </button>
      )}
    </span>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-2011';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    state:    { control: 'select', options: ['Default', 'Hover', 'Focus', 'Disable'] },
    label:    { control: 'text' },
    closable: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `4d4781ffd56138317c8ea0b29e5f0258143dcab7` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '4 variants — `State`: Default / Hover / Focus / Disable.',
          '',
          'Used for selectable filters, labels in tables, category tags.',
          '',
          '| State | Style |',
          '|-------|-------|',
          '| Default | `bg-white border-slate-200 text-[#1b306c]` |',
          '| Hover | `bg-[#e6f1fd] border-slate-200` |',
          '| Focus | `bg-[#e6f1fd] border-[#0043ff] text-[#0043ff] border-2` |',
          '| Disable | `bg-gray-100 text-slate-300` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = { args: { label: 'Same-Day' } };
export const Hover:   Story = { args: { label: 'Same-Day', state: 'Hover' } };
export const Focus:   Story = { args: { label: 'Same-Day', state: 'Focus' } };
export const Disable: Story = { args: { label: 'Same-Day', state: 'Disable' } };
export const Closable: Story = { args: { label: 'Same-Day', closable: true } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">States</p>
        <div className="flex flex-wrap gap-2">
          {(['Default', 'Hover', 'Focus', 'Disable'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <Tag label={s} state={s} />
              <span className="text-xs text-slate-400">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Filter group example</p>
        <div className="flex flex-wrap gap-2">
          <Tag label="All" state="Focus" />
          <Tag label="Same-Day" state="Default" />
          <Tag label="Multi-Carrier" state="Default" />
          <Tag label="Delivered" state="Default" />
          <Tag label="In Transit" state="Default" />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Closable tags</p>
        <div className="flex flex-wrap gap-2">
          <Tag label="NYC" closable />
          <Tag label="FedEx" closable />
          <Tag label="This month" closable />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet</p>
        <CodeBlock
          code={`<!-- Default -->
<span class="inline-flex items-center px-3 py-1 h-8 rounded-lg border border-slate-200 bg-white text-sm font-medium text-[#1b306c]">
  Same-Day
</span>

<!-- Active/Focus -->
<span class="inline-flex items-center px-3 py-1 h-8 rounded-lg border-2 border-[#0043ff] bg-[#e6f1fd] text-sm font-medium text-[#0043ff]">
  All
</span>`}
          jsx={`<Tag label="Same-Day" />
<Tag label="All" state="Focus" />`}
        />
      </div>
    </div>
  ),
};
