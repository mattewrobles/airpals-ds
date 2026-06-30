import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { RadioIndicator, RadioButton } from '../lib/Radio';
import type { RadioState, RadioSize, RadioIndicatorProps, RadioButtonProps } from '../lib/Radio';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=583-215';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/Radio',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    checked:  { control: 'boolean' },
    disabled: { control: 'boolean' },
    size:     { control: 'select', options: ['16px', '14px'] },
    label: { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma nodes:** `583-55` (indicator) · `583-215` (radio button) · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Radio button — 4 states × 2 sizes.',
          '',
          '| State | Ring color |',
          '|-------|-----------|',
          '| Default | `#64748b` |',
          '| Hover | `#0043ff` |',
          '| Selected | `#0043ff` fill + white 8px inner dot |',
          '| Disabled | `#cbd5e1` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={['RadioIndicator', 'RadioButton']}
      types={['RadioState', 'RadioSize', 'RadioIndicatorProps', 'RadioButtonProps']}
      jsx={`<RadioButton label="Standard (3–5 days)" name="shipping" />`}
      figmaKey="a65c3087afa61e7fdd518f16012fb0875c0aaca8"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = {
  args: { size: '16px', label: 'Standard Shipping' },
};

export const Selected: Story = {
  args: { checked: true, size: '16px', label: 'Express Shipping' },
};

export const Disabled: Story = {
  args: { disabled: true, size: '16px', label: 'Overnight (unavailable)' },
};

export const RadioGroup: Story = {
  name: 'Radio Group',
  render: () => {
    const [selected, setSelected] = useState('standard');
    const options = [
      { id: 'standard', label: 'Standard Shipping — 5-7 days' },
      { id: 'express',  label: 'Express Shipping — 2-3 days' },
      { id: 'overnight', label: 'Overnight — Next day' },
    ];
    return (
      <div className="bg-white p-8 font-body">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Shipping Method</p>
        <div className="flex flex-col gap-3">
          {options.map(opt => (
            <RadioButton
              key={opt.id}
              checked={selected === opt.id}
              onChange={() => setSelected(opt.id)}
              name="shipping"
              value={opt.id}
              label={opt.label}
              size="16px"
            />
          ))}
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">States — 16px</p>
        <div className="flex flex-col gap-3">
          {(['Default', 'Selected', 'Disabled'] as const).map(s => (
            <div key={s} className="flex items-center gap-4">
              <RadioButton checked={s === 'Selected'} disabled={s === 'Disabled'} size="16px" label={s} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Sizes</p>
        <div className="flex flex-col gap-3">
          <RadioButton checked size="16px" label="16px size" />
          <RadioButton checked size="14px" label="14px size" />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Default',
              html: `<div class="w-[18px] h-[18px] rounded-full border-2 border-[#64748b]"></div>`,
              jsx: `<RadioButton state="Default" size="16px" label="Standard Shipping" />`,
            },
            {
              label: 'Hover',
              html: `<div class="w-[18px] h-[18px] rounded-full border-2 border-[#0043ff]"></div>`,
              jsx: `<RadioButton state="Hover" size="16px" label="Standard Shipping" />`,
            },
            {
              label: 'Selected',
              html: `<div class="w-[18px] h-[18px] rounded-full border-2 border-[#0043ff] bg-[#0043ff] flex items-center justify-center">
  <div class="w-2 h-2 rounded-full bg-white"></div>
</div>`,
              jsx: `<RadioButton state="Selected" size="16px" label="Express Shipping" />`,
            },
            {
              label: 'Disabled',
              html: `<div class="w-[18px] h-[18px] rounded-full border-2 border-[#cbd5e1] cursor-not-allowed"></div>`,
              jsx: `<RadioButton state="Disabled" size="16px" label="Overnight (unavailable)" />`,
            },
            {
              label: 'Radio Group',
              html: `<div class="flex flex-col gap-3">
  <!-- Unselected -->
  <label class="inline-flex items-center gap-2 cursor-pointer">
    <div class="w-6 h-6 flex items-center justify-center">
      <div class="w-[18px] h-[18px] rounded-full border-2 border-[#64748b]"></div>
    </div>
    <span class="text-base text-[#1b306c]">Standard Shipping — 5-7 days</span>
  </label>
  <!-- Selected -->
  <label class="inline-flex items-center gap-2 cursor-pointer">
    <div class="w-6 h-6 flex items-center justify-center">
      <div class="w-[18px] h-[18px] rounded-full border-2 border-[#0043ff] bg-[#0043ff] flex items-center justify-center">
        <div class="w-2 h-2 rounded-full bg-white"></div>
      </div>
    </div>
    <span class="text-base text-[#1b306c]">Express Shipping — 2-3 days</span>
  </label>
</div>`,
              jsx: `// Controlled group
const [selected, setSelected] = useState('standard');
<div className="flex flex-col gap-3">
  {options.map(opt => (
    <RadioButton
      key={opt.id}
      state={selected === opt.id ? 'Selected' : 'Default'}
      label={opt.label}
    />
  ))}
</div>`,
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
