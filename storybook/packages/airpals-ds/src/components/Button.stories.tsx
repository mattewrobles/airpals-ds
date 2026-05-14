import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">HTML + Tailwind</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
          className="px-2 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto bg-white dark:bg-slate-900 leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────── */

type ButtonProps = {
  label: string;
  type?: 'Primary' | 'Secondary' | 'Ghost' | 'Ghost II' | 'Negative' | 'Accent';
  state?: 'Default' | 'Disabled';
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

/* ── Figma DS link ───────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

/* ── Meta ────────────────────────────────────────────────── */

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
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      source: {
        language: 'html',
        code: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-brand-blue text-white hover:opacity-90 active:opacity-80
  px-4 py-2 text-sm">
  New Shipment
</button>`,
      },
    },
  },
};

export const Secondary: Story = {
  args: { label: 'View Details', type: 'Secondary', size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  border border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue-light
  px-4 py-2 text-sm">
  View Details
</button>`,
      },
    },
  },
};

export const Ghost: Story = {
  args: { label: 'Cancel', type: 'Ghost', size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-transparent text-brand-navy hover:bg-slate-100
  dark:text-slate-50 dark:hover:bg-slate-800
  px-4 py-2 text-sm">
  Cancel
</button>`,
      },
    },
  },
};

export const Negative: Story = {
  args: { label: 'Delete Shipment', type: 'Negative', size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-red-600 text-white hover:opacity-90
  px-4 py-2 text-sm">
  Delete Shipment
</button>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: { label: 'New Shipment', type: 'Primary', state: 'Disabled' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<button disabled class="inline-flex items-center justify-center font-medium rounded-lg
  bg-brand-blue text-white px-4 py-2 text-sm
  opacity-50 cursor-not-allowed">
  New Shipment
</button>`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Small -->
<button class="... px-3 py-1.5 text-sm">Label</button>

<!-- Medium (default) -->
<button class="... px-4 py-2 text-sm">Label</button>

<!-- Large -->
<button class="... px-6 py-3 text-base">Label</button>`,
      },
    },
  },
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

      {/* ── Code snippets ── */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Primary',
              code: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-brand-blue text-white hover:opacity-90 active:opacity-80
  px-4 py-2 text-sm">
  New Shipment
</button>`,
            },
            {
              label: 'Secondary',
              code: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  border border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue-light
  px-4 py-2 text-sm">
  View Details
</button>`,
            },
            {
              label: 'Ghost',
              code: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-transparent text-brand-navy hover:bg-slate-100
  dark:text-slate-50 dark:hover:bg-slate-800
  px-4 py-2 text-sm">
  Cancel
</button>`,
            },
            {
              label: 'Negative',
              code: `<button class="inline-flex items-center justify-center font-medium rounded-lg transition-all
  bg-red-600 text-white hover:opacity-90
  px-4 py-2 text-sm">
  Delete Shipment
</button>`,
            },
            {
              label: 'Disabled (any type)',
              code: `<button disabled class="inline-flex items-center justify-center font-medium rounded-lg
  bg-brand-blue text-white px-4 py-2 text-sm
  opacity-50 cursor-not-allowed">
  New Shipment
</button>`,
            },
          ].map((s) => (
            <CodeBlock key={s.label} code={s.code} />
          ))}
        </div>
      </div>
    </div>
  ),
};
