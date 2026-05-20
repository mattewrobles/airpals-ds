import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { Button } from '../lib/Button';
import type { ButtonType, ButtonState, ButtonSize, ButtonProps } from '../lib/Button';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=3-7';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type:  {
      control: 'select',
      options: ['Primary', 'Secondary', 'Ghost', 'Ghost II', 'Negative', 'Accent'],
      description: 'Visual hierarchy of the button',
    },
    state: {
      control: 'select',
      options: ['Default', 'Disabled'],
      description: 'Interaction state',
    },
    size:  {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'sm = 28px · md = 36px · lg = 48px',
    },
    label: { control: 'text', description: 'Button label text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `1976dd5fb0525a76fb43bf3785fa678114f2c72c`',
          '',
          '56 variants — 14 types × 4 states. Always use `rounded-lg` or `rounded-xl`. Never fixed width.',
          '',
          '| Type | When to use |',
          '|------|-------------|',
          '| Primary | Main CTA — one per view |',
          '| Secondary | Secondary action |',
          '| Ghost | Tertiary / cancel |',
          '| Ghost II | Subtle action on colored bg |',
          '| Negative | Destructive actions |',
          '| Accent | Brand highlight (navy bg) |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

/* ── Stories ─────────────────────────────────────────────── */

export const Primary: Story = {
  args: { label: 'New Shipment', type: 'Primary', size: 'md' },
};

export const Secondary: Story = {
  args: { label: 'View Details', type: 'Secondary', size: 'md' },
};

export const Ghost: Story = {
  args: { label: 'Cancel', type: 'Ghost', size: 'md' },
};

export const Negative: Story = {
  args: { label: 'Delete Shipment', type: 'Negative', size: 'md' },
};

export const Disabled: Story = {
  args: { label: 'New Shipment', type: 'Primary', state: 'Disabled' },
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-slate-900 font-body">
      <Button label="Small — px-3 py-1.5" type="Primary" size="sm" />
      <Button label="Medium (default) — px-4 py-2" type="Primary" size="md" />
      <Button label="Large — px-6 py-3" type="Primary" size="lg" />
    </div>
  ),
};

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div className="p-8 bg-white dark:bg-slate-900 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Default</p>
        <div className="flex flex-wrap gap-3">
          {(['Primary', 'Secondary', 'Ghost', 'Ghost II', 'Negative', 'Accent'] as const).map((t) => (
            <Button key={t} label={t} type={t} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Disabled</p>
        <div className="flex flex-wrap gap-3">
          {(['Primary', 'Secondary', 'Ghost'] as const).map((t) => (
            <Button key={t} label={t} type={t} state="Disabled" />
          ))}
        </div>
      </div>
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
          Figma Component Keys
        </div>
        {[
          { v: 'Primary · Default',   k: '8e685884270ba324a8974d7ad44c4cbce1b2e957' },
          { v: 'Primary · Disabled',  k: 'b40e3899b6d825e6c152153341005934d5d18a9a' },
          { v: 'Secondary · Default', k: 'c1f0d20c8ae35e6f0cbb27ccc09281dbcf42c00b' },
          { v: 'Ghost · Default',     k: 'ca31257106e800cd8faeb2baad4149e3b8d15d58' },
          { v: 'Ghost II · Default',  k: '38eca2c379f7b1f7d6ab900993ecf6db877e54dc' },
          { v: 'Negative · Default',  k: '64e35eab5e26205d5a3ca513354bdcebe38bbfb1' },
          { v: 'Accent · Default',    k: 'f2cec2c457485e4079eb909f9a5bc1a4b7614e15' },
        ].map((row) => (
          <div key={row.v} className="grid grid-cols-[180px_1fr] px-4 py-2.5 border-t border-slate-200 dark:border-slate-700">
            <span className="text-sm font-medium text-brand-navy dark:text-slate-200">{row.v}</span>
            <code className="font-mono text-xs text-slate-500 break-all">{row.k}</code>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Primary',
              html: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-brand-blue text-white hover:opacity-90 active:opacity-80
  px-4 py-2 text-sm">
  New Shipment
</button>`,
              jsx: `<Button label="New Shipment" type="Primary" />`,
            },
            {
              label: 'Secondary',
              html: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  border border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue-light
  px-4 py-2 text-sm">
  View Details
</button>`,
              jsx: `<Button label="View Details" type="Secondary" />`,
            },
            {
              label: 'Ghost',
              html: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-transparent text-brand-navy hover:bg-slate-100
  dark:text-slate-50 dark:hover:bg-slate-800
  px-4 py-2 text-sm">
  Cancel
</button>`,
              jsx: `<Button label="Cancel" type="Ghost" />`,
            },
            {
              label: 'Negative',
              html: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-red-600 text-white hover:opacity-90
  px-4 py-2 text-sm">
  Delete Shipment
</button>`,
              jsx: `<Button label="Delete Shipment" type="Negative" />`,
            },
            {
              label: 'Disabled (any type)',
              html: `<button disabled class="inline-flex items-center justify-center font-medium rounded-lg
  bg-brand-blue text-white px-4 py-2 text-sm
  opacity-50 cursor-not-allowed">
  New Shipment
</button>`,
              jsx: `<Button label="New Shipment" type="Primary" state="Disabled" />`,
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
