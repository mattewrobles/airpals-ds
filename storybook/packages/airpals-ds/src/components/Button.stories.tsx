import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/* ── Component ───────────────────────────────────────────── */

type ButtonProps = {
  label: string;
  type?: 'Primary' | 'Secondary' | 'Ghost' | 'Ghost II' | 'Negative' | 'Accent';
  state?: 'Default' | 'Hover' | 'Disabled';
  size?: 'sm' | 'md' | 'lg';
};

const typeClasses: Record<string, string> = {
  Primary:  'bg-brand-blue text-white hover:opacity-90 active:opacity-80',
  Secondary:'border border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue-light',
  Ghost:    'bg-transparent text-brand-navy dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800',
  'Ghost II':'bg-slate-100 dark:bg-slate-800 text-brand-navy dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-700',
  Negative: 'bg-red-600 text-white hover:opacity-90',
  Accent:   'bg-brand-navy text-white hover:opacity-90',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

function Button({ label, type = 'Primary', state = 'Default', size = 'md' }: ButtonProps) {
  const disabled = state === 'Disabled';
  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded-lg transition-all',
        typeClasses[type],
        sizeClasses[size],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type:  { control: 'select', options: ['Primary', 'Secondary', 'Ghost', 'Ghost II', 'Negative', 'Accent'] },
    state: { control: 'select', options: ['Default', 'Hover', 'Disabled'] },
    size:  { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Airpals buttons. Figma Component Set key: `1976dd5fb0525a76fb43bf3785fa678114f2c72c`. 56 variants: 14 types × 4 states.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

/* ── Stories ─────────────────────────────────────────────── */

export const Primary: Story = { args: { label: 'New Shipment', type: 'Primary' } };
export const Secondary: Story = { args: { label: 'View Details', type: 'Secondary' } };
export const Ghost: Story = { args: { label: 'Cancel', type: 'Ghost' } };
export const GhostII: Story = { args: { label: 'Learn More', type: 'Ghost II' } };
export const Negative: Story = { args: { label: 'Delete Shipment', type: 'Negative' } };
export const Accent: Story = { args: { label: 'Upgrade Plan', type: 'Accent' } };
export const Disabled: Story = { args: { label: 'New Shipment', type: 'Primary', state: 'Disabled' } };

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body min-h-screen">
      <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-6">Button Types — Default State</h2>
      <div className="flex flex-wrap gap-3 mb-10">
        {(['Primary', 'Secondary', 'Ghost', 'Ghost II', 'Negative', 'Accent'] as const).map((t) => (
          <Button key={t} label={t} type={t} />
        ))}
        <Button label="Disabled" type="Primary" state="Disabled" />
      </div>

      <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-6">Sizes</h2>
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <Button label="Small" type="Primary" size="sm" />
        <Button label="Medium (default)" type="Primary" size="md" />
        <Button label="Large" type="Primary" size="lg" />
      </div>

      <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-4">Figma Keys</h2>
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        {[
          { v: 'Primary · Default',   k: '8e685884270ba324a8974d7ad44c4cbce1b2e957' },
          { v: 'Primary · Disabled',  k: 'b40e3899b6d825e6c152153341005934d5d18a9a' },
          { v: 'Secondary · Default', k: 'c1f0d20c8ae35e6f0cbb27ccc09281dbcf42c00b' },
          { v: 'Ghost · Default',     k: 'ca31257106e800cd8faeb2baad4149e3b8d15d58' },
          { v: 'Negative · Default',  k: '64e35eab5e26205d5a3ca513354bdcebe38bbfb1' },
          { v: 'Accent · Default',    k: 'f2cec2c457485e4079eb909f9a5bc1a4b7614e15' },
        ].map((row) => (
          <div key={row.v} className="grid grid-cols-[200px_1fr] px-4 py-2.5 border-t border-slate-200 dark:border-slate-700 first:border-0 text-sm">
            <span className="text-brand-navy dark:text-slate-50 font-medium">{row.v}</span>
            <code className="font-mono text-xs text-slate-500 break-all">{row.k}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
