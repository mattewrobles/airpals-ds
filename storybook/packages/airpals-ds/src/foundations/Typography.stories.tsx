import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Airpals type scale. Headings: Lexend. Body: Inter. Light mode first.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

type TypeSpec = { style: string; tailwind: string; size: string; weight: string; sample: string };

const typeScale: TypeSpec[] = [
  { style: 'Heading 1',              tailwind: 'text-4xl font-semibold',  size: '36px / 40',  weight: 'SemiBold', sample: 'The smartest way to ship from your office' },
  { style: 'Heading 2',              tailwind: 'text-3xl font-semibold',  size: '30px / 36',  weight: 'SemiBold', sample: 'Shipment Overview' },
  { style: 'Heading 3',              tailwind: 'text-2xl font-semibold',  size: '24px / 28',  weight: 'SemiBold', sample: 'Active Deliveries' },
  { style: 'Heading 4',              tailwind: 'text-xl font-semibold',   size: '20px / 24',  weight: 'SemiBold', sample: 'New Shipment' },
  { style: 'Body Large / Regular',   tailwind: 'text-lg font-normal',     size: '18px / 24',  weight: 'Regular',  sample: 'Track your shipments in real time with full visibility across all carriers.' },
  { style: 'Body Large / Medium',    tailwind: 'text-lg font-medium',     size: '18px / 24',  weight: 'Medium',   sample: 'Cost Center — Marketing Team' },
  { style: 'Body Large / SemiBold',  tailwind: 'text-lg font-semibold',   size: '18px / 24',  weight: 'SemiBold', sample: 'Delivered — 3 of 3 packages' },
  { style: 'Body Medium / Regular',  tailwind: 'text-base font-normal',   size: '16px / 20',  weight: 'Regular',  sample: 'Origin address, suite 400, Brooklyn NY 11201' },
  { style: 'Body Medium / Medium',   tailwind: 'text-base font-medium',   size: '16px / 20',  weight: 'Medium',   sample: 'FedEx Ground — Best Value' },
  { style: 'Body Medium / SemiBold', tailwind: 'text-base font-semibold', size: '16px / 20',  weight: 'SemiBold', sample: 'Carrier    Service    Cost' },
  { style: 'Body Small / Regular',   tailwind: 'text-sm font-normal',     size: '14px / 20',  weight: 'Regular',  sample: 'Estimated delivery: Thursday, May 15 by 8pm' },
  { style: 'Body Small / Medium',    tailwind: 'text-sm font-medium',     size: '14px / 20',  weight: 'Medium',   sample: 'Recipients · Locations · Reports' },
  { style: 'Caption / Regular',      tailwind: 'text-xs font-normal',     size: '12px / 20',  weight: 'Regular',  sample: 'Created May 14, 2026 at 9:41 AM' },
  { style: 'Caption / Medium',       tailwind: 'text-xs font-medium',     size: '12px / 20',  weight: 'Medium',   sample: 'IN TRANSIT · DELIVERED · FAILED' },
];

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-1 min-h-screen">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50">Typography</h1>
        <p className="mt-2 text-sm text-slate-500">
          Headings: <strong>Lexend</strong> &nbsp;·&nbsp; Body: <strong>Inter</strong>
        </p>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[200px_1fr_120px_100px] bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
          <span>Style</span>
          <span>Sample</span>
          <span>Size / LH</span>
          <span>Weight</span>
        </div>
        {typeScale.map((t, i) => (
          <div
            key={t.style}
            className={`grid grid-cols-[200px_1fr_120px_100px] px-4 py-4 items-center gap-4 border-t border-slate-200 dark:border-slate-700 ${
              i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/50'
            }`}
          >
            <span className="text-xs font-medium text-slate-500 font-mono">{t.style}</span>
            <span
              className={`${t.tailwind} text-brand-navy dark:text-slate-50 truncate ${
                t.style.startsWith('Heading') ? 'font-heading' : 'font-body'
              }`}
            >
              {t.sample}
            </span>
            <span className="font-mono text-xs text-slate-400">{t.size}</span>
            <span className="font-mono text-xs text-slate-400">{t.weight}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
