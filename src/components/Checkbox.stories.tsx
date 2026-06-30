import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Checkbox } from '../lib/Checkbox';
import type { CheckboxSize, CheckboxProps } from '../lib/Checkbox';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=594-98';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked:       { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled:      { control: 'boolean' },
    size:          { control: 'select', options: ['md', 'sm'], description: 'md = 20×20 · sm = 16×16' },
    label:         { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `594-98` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Checkbox with 3 states (unchecked / checked / indeterminate) × 2 sizes.',
          '',
          '| State | Bg color |',
          '|-------|----------|',
          '| Unchecked | `#cbd5e1` |',
          '| Checked | `#0043ff` |',
          '| Hover unchecked | `#94a3b8` |',
          '| Hover checked | `#1773ff` |',
          '| Disabled | `#cbd5e1` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Checkbox'}
      types={['CheckboxSize', 'CheckboxProps']}
      jsx={`<Checkbox label="Express delivery" />`}
      figmaKey="bc11ab166204aa70d32348853ff1f4e09c4c699a"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const Unchecked: Story = {
  args: { checked: false, label: 'Accept terms' },
};

export const Checked: Story = {
  args: { checked: true, label: 'Accept terms' },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Not available' },
};

export const DisabledChecked: Story = {
  name: 'Disabled — Checked',
  args: { disabled: true, checked: true, label: 'Not available' },
};

export const WithInteraction: Story = {
  name: 'Interactive',
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="p-4">
        <Checkbox
          checked={checked}
          onChange={setChecked}
          label={checked ? 'Checked ✓' : 'Click to check'}
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">States</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox checked={false} label="Unchecked" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={true} label="Checked" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox indeterminate={true} label="Indeterminate" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox disabled={true} label="Disabled" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox disabled={true} checked={true} label="Disabled + Checked" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Sizes</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox checked={true} size="md" />
            <span className="text-xs text-slate-500">md — 20×20</span>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={true} size="sm" />
            <span className="text-xs text-slate-500">sm — 16×16</span>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-400 mb-1">Unchecked</p>
            <CodeBlock
              code={`<input type="checkbox" class="w-5 h-5 rounded accent-[#0043ff]" />`}
              jsx={`<Checkbox label="Accept terms" />`}
            />
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Checked</p>
            <CodeBlock
              code={`<input type="checkbox" checked class="w-5 h-5 rounded accent-[#0043ff]" />`}
              jsx={`<Checkbox checked label="Accept terms" />`}
            />
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Disabled</p>
            <CodeBlock
              code={`<input type="checkbox" disabled class="w-5 h-5 rounded accent-[#0043ff] cursor-not-allowed opacity-50" />`}
              jsx={`<Checkbox disabled label="Not available" />`}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
