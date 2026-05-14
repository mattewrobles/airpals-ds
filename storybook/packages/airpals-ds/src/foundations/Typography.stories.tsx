import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
      className="ml-1 px-1.5 py-0.5 text-xs rounded bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-mono flex-shrink-0"
    >
      {copied ? '✓' : 'copy'}
    </button>
  );
}

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Airpals type scale. Headings: **Lexend**. Body: **Inter**.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

type TypeSpec = {
  style: string;
  group?: string;
  tailwind: string;
  size: string;
  lineHeight: string;
  weight: string;
  font: 'heading' | 'body';
  sample: string;
};

const typeScale: TypeSpec[] = [
  /* ── Headings (Lexend) ─────────────────────────────────── */
  {
    style: 'Heading 1',
    group: 'Headings',
    tailwind: 'text-4xl font-semibold',
    size: '36px',
    lineHeight: '40px',
    weight: 'SemiBold',
    font: 'heading',
    sample: 'The smartest way to ship',
  },
  {
    style: 'Heading 2',
    group: 'Headings',
    tailwind: 'text-3xl font-semibold',
    size: '30px',
    lineHeight: '36px',
    weight: 'SemiBold',
    font: 'heading',
    sample: 'Shipment Overview',
  },
  {
    style: 'Heading 3',
    group: 'Headings',
    tailwind: 'text-2xl font-semibold',
    size: '24px',
    lineHeight: '28px',
    weight: 'SemiBold',
    font: 'heading',
    sample: 'Active Deliveries',
  },
  /* ── Subheading (Inter) ────────────────────────────────── */
  {
    style: 'Subheading / Regular',
    group: 'Subheading',
    tailwind: 'text-xl font-normal',
    size: '20px',
    lineHeight: '28px',
    weight: 'Regular',
    font: 'body',
    sample: 'Track your packages in real time',
  },
  {
    style: 'Subheading / Semibold',
    group: 'Subheading',
    tailwind: 'text-xl font-semibold',
    size: '20px',
    lineHeight: '28px',
    weight: 'SemiBold',
    font: 'body',
    sample: 'Track your packages in real time',
  },
  /* ── Body Large (Inter) ────────────────────────────────── */
  {
    style: 'Body Large / Regular',
    group: 'Body Large',
    tailwind: 'text-lg font-normal',
    size: '18px',
    lineHeight: '24px',
    weight: 'Regular',
    font: 'body',
    sample: 'Track your shipments with full visibility across all carriers.',
  },
  {
    style: 'Body Large / Medium',
    group: 'Body Large',
    tailwind: 'text-lg font-medium',
    size: '18px',
    lineHeight: '24px',
    weight: 'Medium',
    font: 'body',
    sample: 'Cost Center — Marketing Team',
  },
  {
    style: 'Body Large / Semibold',
    group: 'Body Large',
    tailwind: 'text-lg font-semibold',
    size: '18px',
    lineHeight: '24px',
    weight: 'SemiBold',
    font: 'body',
    sample: 'Delivered — 3 of 3 packages',
  },
  /* ── Body Medium (Inter) ───────────────────────────────── */
  {
    style: 'Body Medium / Regular',
    group: 'Body Medium',
    tailwind: 'text-base font-normal',
    size: '16px',
    lineHeight: '20px',
    weight: 'Regular',
    font: 'body',
    sample: 'Origin address, suite 400, Brooklyn NY 11201',
  },
  {
    style: 'Body Medium / Medium',
    group: 'Body Medium',
    tailwind: 'text-base font-medium',
    size: '16px',
    lineHeight: '20px',
    weight: 'Medium',
    font: 'body',
    sample: 'FedEx Ground — Best Value',
  },
  {
    style: 'Body Medium / Semibold',
    group: 'Body Medium',
    tailwind: 'text-base font-semibold',
    size: '16px',
    lineHeight: '20px',
    weight: 'SemiBold',
    font: 'body',
    sample: 'Carrier    Service    Cost',
  },
  /* ── Body Small (Inter) ────────────────────────────────── */
  {
    style: 'Body Small / Regular',
    group: 'Body Small',
    tailwind: 'text-sm font-normal',
    size: '14px',
    lineHeight: '20px',
    weight: 'Regular',
    font: 'body',
    sample: 'Estimated delivery: Thursday, May 15 by 8pm',
  },
  {
    style: 'Body Small / Medium',
    group: 'Body Small',
    tailwind: 'text-sm font-medium',
    size: '14px',
    lineHeight: '20px',
    weight: 'Medium',
    font: 'body',
    sample: 'Recipients · Locations · Reports',
  },
  {
    style: 'Body Small / Semibold',
    group: 'Body Small',
    tailwind: 'text-sm font-semibold',
    size: '14px',
    lineHeight: '20px',
    weight: 'SemiBold',
    font: 'body',
    sample: 'Delivered · In Transit · Pending',
  },
  /* ── Caption (Inter) ───────────────────────────────────── */
  {
    style: 'Caption / Regular',
    group: 'Caption',
    tailwind: 'text-xs font-normal',
    size: '12px',
    lineHeight: '20px',
    weight: 'Regular',
    font: 'body',
    sample: 'Created May 14, 2026 at 9:41 AM',
  },
  {
    style: 'Caption / Medium',
    group: 'Caption',
    tailwind: 'text-xs font-medium',
    size: '12px',
    lineHeight: '20px',
    weight: 'Medium',
    font: 'body',
    sample: 'IN TRANSIT · DELIVERED · FAILED',
  },
  {
    style: 'Caption / Semibold',
    group: 'Caption',
    tailwind: 'text-xs font-semibold',
    size: '12px',
    lineHeight: '20px',
    weight: 'SemiBold',
    font: 'body',
    sample: 'LABEL CREATED · SAME-DAY',
  },
];

/* ── Group separator helper ──────────────────────────────── */
function groupRows(scale: TypeSpec[]) {
  const seen = new Set<string>();
  return scale.map((t) => {
    const isFirst = !seen.has(t.group ?? t.style);
    if (t.group) seen.add(t.group);
    return { ...t, isFirst };
  });
}

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => {
    const rows = groupRows(typeScale);
    return (
      <div className="bg-white dark:bg-slate-900 p-8 font-body min-h-screen">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50">Typography</h1>
          <p className="mt-2 text-sm text-slate-500">
            Headings &amp; Subheading: <strong>Lexend</strong> &nbsp;·&nbsp; Body &amp; Caption: <strong>Inter</strong>
          </p>
        </div>

        <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[160px_1fr_160px_80px_80px] bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
            <span>Style</span>
            <span>Sample</span>
            <span>Tailwind class</span>
            <span>Size</span>
            <span>Weight</span>
          </div>
          {rows.map((t, i) => (
            <div
              key={t.style}
              className={[
                'grid grid-cols-[160px_1fr_160px_80px_80px] px-4 py-3 items-center gap-4',
                'border-t border-slate-200 dark:border-slate-700',
                t.isFirst && i !== 0 ? 'border-t-2 border-t-slate-300 dark:border-t-slate-600' : '',
                i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/50',
              ].join(' ')}
            >
              <span className="font-mono text-xs text-slate-500 leading-tight">{t.style}</span>
              <span
                className={`${t.tailwind} text-brand-navy dark:text-slate-50 truncate ${
                  t.font === 'heading' ? 'font-heading' : 'font-body'
                }`}
              >
                {t.sample}
              </span>
              <span className="inline-flex items-center font-mono text-xs text-brand-blue dark:text-brand-electric-blue">
                {t.tailwind}<CopyBtn value={t.tailwind} />
              </span>
              <span className="font-mono text-xs text-slate-400">{t.size}</span>
              <span className="font-mono text-xs text-slate-400">{t.weight}</span>
            </div>
          ))}
        </div>

        {/* Usage table */}
        <div className="mt-10 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
            When to use each style
          </div>
          {[
            { style: 'Heading 1–3', use: 'Marketing pages, empty states, modal titles — Lexend' },
            { style: 'Subheading',  use: 'Section titles inside cards or panels — Inter. Regular = light, Semibold = emphasis' },
            { style: 'Body Large',      use: 'Primary body copy — descriptions, onboarding text' },
            { style: 'Body Medium',     use: 'Default UI text — table cells, form labels, list items' },
            { style: 'Body Small',      use: 'Secondary info — helper text, metadata, timestamps' },
            { style: 'Caption',         use: 'Labels, tags, all-caps uppercase categories' },
          ].map((row) => (
            <div key={row.style} className="grid grid-cols-[180px_1fr] px-4 py-2.5 border-t border-slate-200 dark:border-slate-700">
              <span className="text-sm font-medium text-brand-navy dark:text-slate-200 font-mono">{row.style}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{row.use}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
