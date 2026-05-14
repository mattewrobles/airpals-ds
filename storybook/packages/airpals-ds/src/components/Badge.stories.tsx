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

type BadgeColor = 'Primary' | 'Secondary' | 'Dark' | 'Gray' | 'Light' | 'Warning' | 'Danger' | 'Success' | 'Info';
type BadgeVariant = 'Fill' | 'Outline' | 'Duo Tone';
type BadgeShape = 'Semi' | 'Full';

type BadgeProps = {
  label: string;
  color?: BadgeColor;
  variant?: BadgeVariant;
  shape?: BadgeShape;
};

const colorMap: Record<BadgeColor, Record<string, string>> = {
  Primary:   { fill: 'bg-brand-blue text-white',          outline: 'border border-brand-blue text-brand-blue',           duo: 'bg-brand-blue-light text-brand-blue' },
  Secondary: { fill: 'bg-brand-pink text-white',           outline: 'border border-brand-pink text-brand-pink',           duo: 'bg-pink-50 text-brand-pink' },
  Dark:      { fill: 'bg-brand-navy text-white',           outline: 'border border-brand-navy text-brand-navy',           duo: 'bg-brand-blue-light text-brand-navy' },
  Gray:      { fill: 'bg-slate-500 text-white',            outline: 'border border-slate-400 text-slate-600',             duo: 'bg-slate-100 text-slate-600' },
  Light:     { fill: 'bg-slate-200 text-slate-700',        outline: 'border border-slate-300 text-slate-500',             duo: 'bg-slate-50 text-slate-600' },
  Warning:   { fill: 'bg-amber-500 text-white',            outline: 'border border-amber-400 text-amber-600',             duo: 'bg-amber-50 text-amber-700' },
  Danger:    { fill: 'bg-red-600 text-white',              outline: 'border border-red-500 text-red-600',                 duo: 'bg-red-50 text-red-700' },
  Success:   { fill: 'bg-green-600 text-white',            outline: 'border border-green-500 text-green-600',             duo: 'bg-green-50 text-green-700' },
  Info:      { fill: 'bg-brand-electric-blue text-white',  outline: 'border border-brand-electric-blue text-brand-electric-blue', duo: 'bg-blue-50 text-brand-electric-blue' },
};

function Badge({ label, color = 'Primary', variant = 'Fill', shape = 'Full' }: BadgeProps) {
  const key = variant === 'Duo Tone' ? 'duo' : variant.toLowerCase();
  const cls = colorMap[color][key];
  const radius = shape === 'Full' ? 'rounded-full' : 'rounded-md';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${radius} ${cls}`}>
      {label}
    </span>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color:   { control: 'select', options: ['Primary', 'Secondary', 'Dark', 'Gray', 'Light', 'Warning', 'Danger', 'Success', 'Info'], description: '9 semantic colors' },
    variant: { control: 'select', options: ['Fill', 'Outline', 'Duo Tone'], description: 'Fill = solid · Outline = border only · Duo Tone = tinted bg' },
    shape:   { control: 'select', options: ['Semi', 'Full'], description: 'Semi = rounded-md · Full = rounded-full' },
    label:   { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `9469c69590accb9b16f66d63f681e74646d930d5`',
          '',
          '54 variants — 9 colors × 3 styles × 2 shapes.',
          '',
          '**Shipment status convention:**',
          '',
          '| Status | Color | Variant |',
          '|--------|-------|---------|',
          '| Delivered | Success | Duo Tone |',
          '| In Transit | Info | Duo Tone |',
          '| Pending | Warning | Duo Tone |',
          '| Failed | Danger | Duo Tone |',
          '| Cancelled | Gray | Duo Tone |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

/* ── Stories ─────────────────────────────────────────────── */

export const Delivered: Story = {
  args: { label: 'Delivered', color: 'Success', variant: 'Duo Tone' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">
  Delivered
</span>`,
      },
    },
  },
};

export const InTransit: Story = {
  name: 'In Transit',
  args: { label: 'In Transit', color: 'Info', variant: 'Duo Tone' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-brand-electric-blue">
  In Transit
</span>`,
      },
    },
  },
};

export const Failed: Story = {
  args: { label: 'Failed', color: 'Danger', variant: 'Duo Tone' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">
  Failed
</span>`,
      },
    },
  },
};

export const Pending: Story = {
  args: { label: 'Pending Pickup', color: 'Warning', variant: 'Duo Tone' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">
  Pending Pickup
</span>`,
      },
    },
  },
};

export const AllShipmentStatuses: Story = {
  name: 'All Shipment Statuses',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Shipment Status (Duo Tone — use this)</p>
        <div className="flex flex-wrap gap-2">
          <Badge label="Delivered"      color="Success" variant="Duo Tone" />
          <Badge label="In Transit"     color="Info"    variant="Duo Tone" />
          <Badge label="Pending Pickup" color="Warning" variant="Duo Tone" />
          <Badge label="Failed"         color="Danger"  variant="Duo Tone" />
          <Badge label="Cancelled"      color="Gray"    variant="Duo Tone" />
          <Badge label="Label Created"  color="Light"   variant="Duo Tone" />
          <Badge label="Same-Day"       color="Primary" variant="Duo Tone" />
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">All Variants — Success color</p>
        <div className="flex flex-wrap gap-2">
          <Badge label="Fill"      color="Success" variant="Fill" />
          <Badge label="Outline"   color="Success" variant="Outline" />
          <Badge label="Duo Tone"  color="Success" variant="Duo Tone" />
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Shapes</p>
        <div className="flex flex-wrap gap-2">
          <Badge label="rounded-md (Semi)"   color="Primary" variant="Fill" shape="Semi" />
          <Badge label="rounded-full (Full)" color="Primary" variant="Fill" shape="Full" />
        </div>
      </div>

      {/* ── Code snippets ── */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            { label: 'Delivered', code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">Delivered</span>` },
            { label: 'In Transit', code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-brand-electric-blue">In Transit</span>` },
            { label: 'Pending Pickup', code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">Pending Pickup</span>` },
            { label: 'Failed', code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">Failed</span>` },
            { label: 'Cancelled', code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600">Cancelled</span>` },
            { label: 'Fill variant', code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-brand-blue text-white">Label</span>` },
            { label: 'Outline variant', code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border border-brand-blue text-brand-blue">Label</span>` },
            { label: 'Semi shape (rounded-md)', code: `<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-green-50 text-green-700">Label</span>` },
          ].map((s) => (
            <CodeBlock key={s.label} code={s.code} />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Shipment status badges — Duo Tone pattern -->
<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">Delivered</span>
<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-brand-electric-blue">In Transit</span>
<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">Pending Pickup</span>
<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">Failed</span>
<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600">Cancelled</span>`,
      },
    },
  },
};
