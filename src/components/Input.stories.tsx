import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Input } from '../lib/Input';
import type { InputStatus, InputProps } from '../lib/Input';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-2537';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    status:      { control: 'select', options: ['Default', 'Error', 'Success'] },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    value:       { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `625-2537` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Input field — 4 states × 3 statuses. Padding: `12/16/12/20px`. Radius: `6px`.',
          '',
          '| Token | Value |',
          '|-------|-------|',
          '| Default border | `#dfe4ea` 1px |',
          '| Hover border | `#0043ff` 1px |',
          '| Focus border | `#adbcf2` **3px** |',
          '| Error border + helper | `#f23030` |',
          '| Success border + helper | `#22ad5c` |',
          '| Disabled bg + border | `#f3f4f6` |',
          '| Label | `#111928` · 16px/500 |',
          '| Helper | `#4b5563` · 14px/400 |',
          '| Placeholder | `#9ca3af` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Input'}
      types={['InputState', 'InputStatus', 'InputProps']}
      jsx={`<Input
  label="Recipient"
  placeholder="Full name"
  helperText="As shown on ID"
/>`}
      figmaKey="d8b9c1ffd324575a54c030c43023a3b4360bdcfd"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = { args: { label: 'Origin Address', placeholder: 'Start typing…' } };
export const WithError: Story = { args: { label: 'Weight (lbs)', value: '0', status: 'Error', helperText: 'Weight must be greater than 0' } };
export const WithSuccess: Story = { args: { label: 'ZIP Code', value: '11201', status: 'Success', helperText: 'Brooklyn, NY' } };
export const Disabled: Story = { args: { label: 'Account Number', value: '••••••••', disabled: true } };

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div className="grid gap-6 max-w-sm">
        <Input label="Default" placeholder="Origin address…" />
        <Input label="Focused" value="101 Pacific Street, Brooklyn" />
        <Input label="Disabled" value="••••••••" disabled />
        <Input label="Error"   value="0" status="Error"   helperText="Weight must be greater than 0" />
        <Input label="Success" value="11201" status="Success" helperText="Brooklyn, NY" />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Default',
              html: `<div class="flex flex-col gap-1.5">
  <label class="text-base font-medium text-[#111928]">Label</label>
  <input type="text" placeholder="Placeholder"
    class="w-full rounded-[6px] pt-3 pr-4 pb-3 pl-5
           border border-[#dfe4ea] bg-white
           text-base text-[#111928] placeholder:text-[#9ca3af] outline-none" />
</div>`,
              jsx: `<Input label="Label" placeholder="Placeholder" />`,
            },
            {
              label: 'Hover',
              html: `<input type="text" class="w-full rounded-[6px] pt-3 pr-4 pb-3 pl-5
  border border-[#0043ff] bg-white text-base outline-none" />`,
              jsx: `<Input label="Label" state="Hover" />`,
            },
            {
              label: 'Focused',
              html: `<input type="text" class="w-full rounded-[6px] pt-3 pr-4 pb-3 pl-5
  border-[3px] border-[#adbcf2] bg-white text-base outline-none" />`,
              jsx: `<Input label="Label" state="Focused" />`,
            },
            {
              label: 'Error',
              html: `<div class="flex flex-col gap-1.5">
  <label class="text-base font-medium text-[#111928]">Label</label>
  <input type="text" class="w-full rounded-[6px] pt-3 pr-4 pb-3 pl-5
    border border-[#f23030] bg-white text-base outline-none" />
  <p class="text-sm text-[#f23030]">Helper Text</p>
</div>`,
              jsx: `<Input label="Label" status="Error" helperText="Helper Text" />`,
            },
            {
              label: 'Success',
              html: `<div class="flex flex-col gap-1.5">
  <label class="text-base font-medium text-[#111928]">Label</label>
  <input type="text" class="w-full rounded-[6px] pt-3 pr-4 pb-3 pl-5
    border border-[#22ad5c] bg-white text-base outline-none" />
  <p class="text-sm text-[#22ad5c]">Helper Text</p>
</div>`,
              jsx: `<Input label="Label" status="Success" helperText="Helper Text" />`,
            },
            {
              label: 'Disabled',
              html: `<div class="flex flex-col gap-1.5">
  <label class="text-base font-medium text-[#6b7280]">Label</label>
  <input type="text" disabled class="w-full rounded-[6px] pt-3 pr-4 pb-3 pl-5
    border border-[#f3f4f6] bg-[#f3f4f6] text-base cursor-not-allowed outline-none" />
</div>`,
              jsx: `<Input label="Label" state="Disabled" />`,
            },
          ].map((s) => (
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
