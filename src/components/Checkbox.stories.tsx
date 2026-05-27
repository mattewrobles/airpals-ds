import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Checkbox } from '../lib/Checkbox';
import type { CheckboxState, CheckboxActive, CheckboxSize, CheckboxProps } from '../lib/Checkbox';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=594-98';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    state:  { control: 'select', options: ['Default', 'Hover', 'Focused', 'Disabled'] },
    active: { control: 'select', options: ['Off', 'On', 'Indeterminate'] },
    size:   { control: 'select', options: ['Medium', 'Small'], description: 'Medium = 20×20 · Small = 16×16' },
    label:  { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `594-98` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Checkbox with 5 states × 3 active modes × 2 sizes = 30 variants.',
          '',
          '| State | Off bg | On bg |',
          '|-------|--------|-------|',
          '| Default | `#cbd5e1` | `#0043ff` |',
          '| Hover | `#94a3b8` | `#1773ff` |',
          '| Focused | `#115fd8` | `#115fd8` |',
          '| Disabled | `#cbd5e1` | `#cbd5e1` |',
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
      types={['CheckboxState', 'CheckboxActive', 'CheckboxSize', 'CheckboxProps']}
      jsx={`<Checkbox label="Express delivery" />`}
      figmaKey="bc11ab166204aa70d32348853ff1f4e09c4c699a"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const Unchecked: Story = {
  args: { state: 'Default', active: 'Off', size: 'Medium', label: 'Accept terms' },
};

export const Checked: Story = {
  args: { state: 'Default', active: 'On', size: 'Medium', label: 'Accept terms' },
};

export const Indeterminate: Story = {
  args: { state: 'Default', active: 'Indeterminate', size: 'Medium', label: 'Select all' },
};

export const DisabledUnchecked: Story = {
  name: 'Disabled — Unchecked',
  args: { state: 'Disabled', active: 'Off', size: 'Medium', label: 'Not available' },
};

export const DisabledChecked: Story = {
  name: 'Disabled — Checked',
  args: { state: 'Disabled', active: 'On', size: 'Medium', label: 'Not available' },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">States × Active</p>
        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
          {(['Default', 'Hover', 'Focused', 'Disabled'] as const).map(st =>
            (['Off', 'On', 'Indeterminate'] as const).map(a => (
              <div key={`${st}-${a}`} className="flex items-center gap-3">
                <Checkbox state={st} active={a} size="Medium" />
                <span className="text-xs text-slate-500">{st} / {a}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Sizes</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox active="On" size="Medium" />
            <span className="text-xs text-slate-500">Medium 20×20</span>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox active="On" size="Small" />
            <span className="text-xs text-slate-500">Small 16×16</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Unchecked (Default)',
              html: `<div class="w-5 h-5 flex items-center justify-center">
  <div class="w-4 h-4 rounded-[4px] bg-[#cbd5e1]"></div>
</div>`,
              jsx: `<Checkbox state="Default" active="Off" size="Medium" label="Accept terms" />`,
            },
            {
              label: 'Checked',
              html: `<div class="w-5 h-5 flex items-center justify-center">
  <div class="w-4 h-4 rounded-[4px] bg-[#0043ff] flex items-center justify-center">
    <!-- white checkmark SVG -->
  </div>
</div>`,
              jsx: `<Checkbox state="Default" active="On" size="Medium" label="Accept terms" />`,
            },
            {
              label: 'Hover Off',
              html: `<div class="w-4 h-4 rounded-[4px] bg-[#94a3b8]"></div>`,
              jsx: `<Checkbox state="Hover" active="Off" />`,
            },
            {
              label: 'Hover On',
              html: `<div class="w-4 h-4 rounded-[4px] bg-[#1773ff]"><!-- checkmark --></div>`,
              jsx: `<Checkbox state="Hover" active="On" />`,
            },
            {
              label: 'Focused',
              html: `<div class="w-4 h-4 rounded-[4px] bg-[#115fd8]"><!-- checkmark if on --></div>`,
              jsx: `<Checkbox state="Focused" active="On" />`,
            },
            {
              label: 'Disabled',
              html: `<div class="w-4 h-4 rounded-[4px] bg-[#cbd5e1] cursor-not-allowed"></div>`,
              jsx: `<Checkbox state="Disabled" active="Off" />`,
            },
          ].map(s => (
            <div key={s.label}>
              <p className="text-xs text-slate-400 mb-1">{s.label}</p>
              <CodeBlock code={s.html} jsx={s.jsx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
