import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Dropdown } from '../lib/Dropdown';
import type { DropdownState, DropdownProps } from '../lib/Dropdown';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    state:    { control: 'select', options: ['Default', 'Hover', 'Focused', 'Disabled'] },
    expanded: { control: 'boolean' },
    label:    { control: 'text' },
    placeholder: { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `686-680` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '14 variants — `State` × `Expanded` × `Label`.',
          '',
          '| State | Border |',
          '|-------|--------|',
          '| Default | `border-slate-200` |',
          '| Hover | `border-slate-300` |',
          '| Focused | `border-2 border-[#0043ff]` |',
          '| Disabled | `bg-gray-100` text & icon `slate-300` |',
          '',
          'Active item in expanded list: `bg-[#e6f1fd] text-[#0043ff]`.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Dropdown'}
      types={['DropdownState', 'DropdownProps']}
      jsx={`<Dropdown
  label="Carrier"
  options={['UPS', 'FedEx', 'DHL', 'USPS']}
  placeholder="Select carrier"
/>`}
      figmaKey="ab6bdf420ef071648dce629158fdf9f013d2a10b"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = { args: { placeholder: 'Select an option' } };
export const WithLabel: Story = { name: 'With Label', args: { label: 'Carrier', placeholder: 'Select carrier' } };
export const Expanded: Story = { args: { label: 'Carrier', expanded: true, options: ['FedEx', 'UPS', 'USPS', 'Same-Day'] } };
export const Focused: Story = { args: { label: 'Carrier', state: 'Focused' } };
export const Disabled: Story = { args: { label: 'Carrier', state: 'Disabled', placeholder: 'Select carrier' } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div className="grid grid-cols-2 gap-8">
        {(['Default', 'Hover', 'Focused', 'Disabled'] as const).map((state) => (
          <div key={state}>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">{state}</p>
            <Dropdown label="Carrier" placeholder="Select carrier" state={state} />
          </div>
        ))}
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Expanded</p>
          <Dropdown label="Carrier" expanded={true} options={['FedEx', 'UPS', 'USPS', 'Same-Day']} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">No Label</p>
          <Dropdown placeholder="Select an option" />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          <CodeBlock
            code={`<div class="relative w-64">
  <label class="block text-sm font-medium text-[#1b306c] mb-1">Carrier</label>
  <button class="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-400">
    <span>Select carrier</span>
    <svg><!-- chevron --></svg>
  </button>
</div>`}
            jsx={`<Dropdown label="Carrier" placeholder="Select carrier" />`}
          />
        </div>
      </div>
    </div>
  ),
};
