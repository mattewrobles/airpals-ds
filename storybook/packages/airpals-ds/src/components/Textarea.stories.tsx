import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { Textarea } from '../lib/Textarea';
import type { TextareaState, TextareaProps } from '../lib/Textarea';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-3842';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    state:       { control: 'select', options: ['Default', 'Hover', 'Focused', 'Disabled'] },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    maxLength:   { control: 'number', description: 'Shows character counter when set' },
    rows:        { control: 'number' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `625-3842` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Textarea — 4 states. Padding: 20px all sides. Radius: 6px.',
          '',
          '| State | Border | Width |',
          '|-------|--------|-------|',
          '| Default | `#dfe4ea` | 1px |',
          '| Hover | `#0043ff` | 1.5px |',
          '| Focused | `#c3cef6` | 3px |',
          '| Disabled | `#dfe4ea` · bg `#f3f4f6` | 1px |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = {
  args: { label: 'Delivery Notes', placeholder: 'Add any special instructions…' },
};

export const Focused: Story = {
  args: { label: 'Delivery Notes', placeholder: 'Add any special instructions…', state: 'Focused' },
};

export const WithHelperText: Story = {
  args: { label: 'Package Description', placeholder: 'Describe the contents…', helperText: 'Accurate description helps with customs clearance.' },
};

export const WithCounter: Story = {
  args: { label: 'Notes', placeholder: 'Type your notes…', maxLength: 50 },
};

export const Disabled: Story = {
  args: { label: 'Notes', placeholder: 'Not editable', state: 'Disabled' },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white p-8 font-body space-y-6 max-w-lg">
      <Textarea label="Default" placeholder="Placeholder" />
      <Textarea label="Hover" placeholder="Placeholder" state="Hover" />
      <Textarea label="Focused" placeholder="Placeholder" state="Focused" />
      <Textarea label="Disabled" placeholder="Placeholder" state="Disabled" />
      <Textarea label="With Helper" placeholder="Placeholder" helperText="Helper text below the field" />
      <Textarea label="With Counter" placeholder="Type here…" maxLength={50} />

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Default',
              html: `<textarea class="w-full rounded-[6px] p-5
  border border-[#dfe4ea] bg-white
  text-base text-[#111928] placeholder:text-[#9ca3af]
  outline-none resize-none"></textarea>`,
              jsx: `<Textarea label="Delivery Notes" placeholder="Add any special instructions…" />`,
            },
            {
              label: 'Hover',
              html: `<textarea class="w-full rounded-[6px] p-5
  border-[1.5px] border-[#0043ff] bg-white
  text-base outline-none resize-none"></textarea>`,
              jsx: `<Textarea label="Delivery Notes" state="Hover" />`,
            },
            {
              label: 'Focused',
              html: `<textarea class="w-full rounded-[6px] p-5
  border-[3px] border-[#c3cef6] bg-white
  text-base outline-none resize-none"></textarea>`,
              jsx: `<Textarea label="Delivery Notes" state="Focused" />`,
            },
            {
              label: 'Disabled',
              html: `<textarea disabled class="w-full rounded-[6px] p-5
  border border-[#dfe4ea] bg-[#f3f4f6]
  text-base cursor-not-allowed outline-none resize-none"></textarea>`,
              jsx: `<Textarea label="Notes" state="Disabled" />`,
            },
            {
              label: 'With Counter',
              html: `<div class="flex flex-col gap-2.5">
  <label class="text-base font-medium text-[#111928]">Notes</label>
  <textarea maxlength="50" class="w-full rounded-[6px] p-5 border border-[#dfe4ea] bg-white
    text-base text-[#111928] placeholder:text-[#9ca3af]
    outline-none resize-none" rows="5"></textarea>
  <div class="flex justify-end">
    <span class="text-sm text-[#637381]">0/50</span>
  </div>
</div>`,
              jsx: `<Textarea label="Notes" placeholder="Type your notes…" maxLength={50} />`,
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
