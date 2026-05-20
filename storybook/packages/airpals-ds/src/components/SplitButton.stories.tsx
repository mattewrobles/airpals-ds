import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { SplitButton } from '../lib/SplitButton';
import type { SplitButtonSize, SplitButtonType, SplitButtonProps } from '../lib/SplitButton';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof SplitButton> = {
  title: 'Components/Split Button',
  component: SplitButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['XS', 'S', 'M', 'L'] },
    type: { control: 'select', options: ['Primary', 'Secondary', 'Info', 'Success', 'Warning', 'Danger'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `ccd1ef4b71562bc9f214b6bbe7c75f0d5fff4be2` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '24 variants — `Size` (XS/S/M/L) × `Type` (Primary/Secondary/Info/Success/Warning/Danger).',
          '',
          'Left = main action. Right = chevron that opens a dropdown. Divided by a 1px separator.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SplitButton>;

/* ── Stories ─────────────────────────────────────────────── */

export const Primary: Story = { args: { label: 'New Shipment', type: 'Primary', size: 'M' } };
export const Secondary: Story = { args: { label: 'New Shipment', type: 'Secondary', size: 'M' } };
export const Success: Story = { args: { label: 'Confirm', type: 'Success', size: 'M' } };
export const Warning: Story = { args: { label: 'Review', type: 'Warning', size: 'M' } };
export const Danger: Story = { args: { label: 'Delete', type: 'Danger', size: 'M' } };
export const Disabled: Story = { args: { label: 'New Shipment', type: 'Primary', size: 'M', disabled: true } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Types — Size M</p>
        <div className="flex flex-wrap gap-3">
          {(['Primary', 'Secondary', 'Info', 'Success', 'Warning', 'Danger'] as const).map((t) => (
            <SplitButton key={t} label={t} type={t} size="M" />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Sizes — Primary</p>
        <div className="flex items-center gap-3">
          {(['XS', 'S', 'M', 'L'] as const).map((s) => (
            <SplitButton key={s} label={s} type="Primary" size={s} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Disabled state</p>
        <div className="flex flex-wrap gap-3">
          {(['Primary', 'Success', 'Danger'] as const).map((t) => (
            <SplitButton key={t} label={t} type={t} size="M" disabled />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet</p>
        <CodeBlock
          code={`<div class="relative inline-flex">
  <button class="px-4 py-2 text-sm font-medium bg-[#0043ff] text-white hover:bg-blue-700 rounded-l-lg">
    New Shipment
  </button>
  <span class="w-px self-stretch bg-blue-500 opacity-40"></span>
  <button class="px-2.5 py-2 bg-[#0043ff] text-white hover:bg-blue-700 rounded-r-lg">
    <!-- chevron icon -->
  </button>
</div>`}
          jsx={`<SplitButton label="New Shipment" type="Primary" size="M" />`}
        />
      </div>
    </div>
  ),
};
