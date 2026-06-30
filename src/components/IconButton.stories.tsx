import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { IconButton } from '../lib/IconButton';
import type { IconButtonState, IconButtonProps } from '../lib/IconButton';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=747-8438';

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="7" cy="7" r="4.5" /><line x1="10.5" y1="10.5" x2="14" y2="14" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['Normal', 'Outline', 'Disable', 'Glow'] },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `747-8438` — 32×32px icon-only button.',
          '',
          '| State | Style |',
          '|-------|-------|',
          '| Normal | `bg-surface-accent text-icon-on-accent` |',
          '| Outline | `border border-line-accent text-icon-accent` |',
          '| Glow | `text-icon-accent` + drop-shadow |',
          '| Disable | `bg-surface-disable text-icon-disable cursor-not-allowed` |',
          '',
          'Always pass `aria-label` for accessibility.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'IconButton'}
      types={['IconButtonState', 'IconButtonProps']}
      jsx={`<IconButton icon={<PlusIcon />} aria-label="Add shipment" />`}
      figmaKey=""
    />
  ),
};

export const Normal: Story = { args: { icon: <PlusIcon />, 'aria-label': 'Add', state: 'Normal' } };
export const Outline: Story = { args: { icon: <PlusIcon />, 'aria-label': 'Add', state: 'Outline' } };
export const Glow: Story = { args: { icon: <SearchIcon />, 'aria-label': 'Search', state: 'Glow' } };
export const Disable: Story = { args: { icon: <PlusIcon />, 'aria-label': 'Add', state: 'Disable' } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">States</p>
        <div className="flex items-center gap-4 flex-wrap">
          {(['Normal', 'Outline', 'Glow', 'Disable'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <IconButton icon={<PlusIcon />} aria-label={s} state={s} />
              <span className="text-xs text-slate-400">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<button
  aria-label="Add shipment"
  class="inline-flex items-center justify-center size-8 rounded-md
    bg-[#e6f1fd] text-[#0043ff] hover:opacity-85 transition-colors">
  <!-- icon 16px -->
</button>`}
          jsx={`<IconButton
  icon={<PlusIcon />}
  aria-label="Add shipment"
  state="Normal"
  onClick={handleAdd}
/>`}
        />
      </div>
    </div>
  ),
};
