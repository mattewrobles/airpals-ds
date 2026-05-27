import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Tag } from '../lib/Tag';
import type { TagState, TagProps } from '../lib/Tag';

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

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Tag'}
      types={['TagState', 'TagProps']}
      jsx={`<Tag label="Priority" />`}
      figmaKey="4d4781ffd56138317c8ea0b29e5f0258143dcab7"
    />
  ),
};

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
