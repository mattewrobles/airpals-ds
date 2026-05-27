import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Spacing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Airpals spacing scale — identical to Tailwind default. Token name = class number.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const spacingScale = [
  { token: '0',  px: '0px',   tailwind: 'p-0, m-0, gap-0' },
  { token: '1',  px: '4px',   tailwind: 'p-1, m-1, gap-1' },
  { token: '2',  px: '8px',   tailwind: 'p-2, m-2, gap-2' },
  { token: '3',  px: '12px',  tailwind: 'p-3, m-3, gap-3' },
  { token: '4',  px: '16px',  tailwind: 'p-4, m-4, gap-4' },
  { token: '5',  px: '20px',  tailwind: 'p-5, m-5, gap-5' },
  { token: '6',  px: '24px',  tailwind: 'p-6, m-6, gap-6' },
  { token: '8',  px: '32px',  tailwind: 'p-8, m-8, gap-8' },
  { token: '10', px: '40px',  tailwind: 'p-10, m-10, gap-10' },
  { token: '12', px: '48px',  tailwind: 'p-12, m-12, gap-12' },
  { token: '16', px: '64px',  tailwind: 'p-16, m-16, gap-16' },
  { token: '20', px: '80px',  tailwind: 'p-20, m-20, gap-20' },
];

const radiusScale = [
  { name: 'none',    px: '0px',     tailwind: 'rounded-none',  use: 'Separators, tables' },
  { name: 'sm',      px: '2px',     tailwind: 'rounded-sm',    use: 'Inline elements' },
  { name: 'DEFAULT', px: '4px',     tailwind: 'rounded',       use: 'Small inline elements' },
  { name: 'md',      px: '6px',     tailwind: 'rounded-md',    use: 'Badges, small tags' },
  { name: 'lg',      px: '8px',     tailwind: 'rounded-lg',    use: 'Inputs, buttons, chips' },
  { name: 'xl',      px: '12px',    tailwind: 'rounded-xl',    use: 'Cards, dropdowns' },
  { name: '2xl',     px: '16px',    tailwind: 'rounded-2xl',   use: 'Modals, large panels' },
  { name: '3xl',     px: '24px',    tailwind: 'rounded-3xl',   use: 'Hero elements' },
  { name: 'full',    px: '9999px',  tailwind: 'rounded-full',  use: 'Avatars, status pills' },
];

export const SpacingScale: Story = {
  name: 'Spacing Scale',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body min-h-screen">
      <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50 mb-2">Spacing</h1>
      <p className="text-sm text-slate-500 mb-8">Token name = Tailwind class number. No arbitrary values.</p>

      <div className="space-y-3">
        {spacingScale.map((s) => (
          <div key={s.token} className="flex items-center gap-4">
            <span className="w-8 font-mono text-xs text-slate-400 text-right">{s.token}</span>
            <div
              className="bg-brand-blue rounded flex-shrink-0"
              style={{ width: s.px === '0px' ? '2px' : s.px, height: '24px', minWidth: s.px === '0px' ? '2px' : undefined }}
            />
            <span className="font-mono text-xs text-slate-500">{s.px}</span>
            <span className="font-mono text-xs text-slate-400">{s.tailwind}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const RadiusScale: Story = {
  name: 'Border Radius',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body min-h-screen">
      <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50 mb-2">Border Radius</h1>
      <p className="text-sm text-slate-500 mb-8">Airpals radius guide by element type.</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {radiusScale.map((r) => (
          <div key={r.name} className="flex flex-col gap-2">
            <div
              className="h-16 w-full border-2 border-brand-blue bg-brand-blue-light dark:bg-slate-800"
              style={{ borderRadius: r.px }}
            />
            <p className="text-sm font-medium text-brand-navy dark:text-slate-50">{r.name}</p>
            <p className="font-mono text-xs text-slate-500">{r.tailwind}</p>
            <p className="text-xs text-slate-400">{r.use}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};
