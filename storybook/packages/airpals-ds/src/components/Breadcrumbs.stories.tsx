import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { Breadcrumbs } from '../lib/Breadcrumbs';
import type { BreadcrumbSeparator, BreadcrumbItem, BreadcrumbsProps } from '../lib/Breadcrumbs';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    separator:   { control: 'select', options: ['slash', 'chevron', 'arrow'] },
    showHomeIcon: { control: 'boolean' },
    coloredBg:   { control: 'boolean', description: 'Wrap in bg-[#e6f1fd] pill' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `1d0edc6fa49b9640eaf8b2b8661b22af676267d9` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '12 variants — separator style × home icon × colored background.',
          '',
          '| Element | Style |',
          '|---------|-------|',
          '| Link | `text-slate-500 hover:text-[#1b306c] text-sm` |',
          '| Current | `text-[#1b306c] font-medium text-sm` |',
          '| Separator | `text-slate-300` |',
          '| Colored bg | `bg-[#e6f1fd] px-3 py-1.5 rounded-lg` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const defaultItems: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '#' },
  { label: 'Shipments', href: '#' },
  { label: 'New Shipment' },
];

/* ── Stories ─────────────────────────────────────────────── */

export const Slash: Story = { args: { items: defaultItems, separator: 'slash' } };
export const Chevron: Story = { args: { items: defaultItems, separator: 'chevron' } };
export const Arrow: Story = { args: { items: defaultItems, separator: 'arrow' } };
export const WithHomeIcon: Story = { name: 'With Home Icon', args: { items: defaultItems, separator: 'slash', showHomeIcon: true } };
export const ColoredBackground: Story = { name: 'Colored Background', args: { items: defaultItems, separator: 'slash', coloredBg: true } };
export const TwoLevels: Story = { name: 'Two Levels', args: { items: [{ label: 'Shipments', href: '#' }, { label: 'Order #1234' }] } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-6">
      {[
        { label: 'Slash separator', props: { items: defaultItems, separator: 'slash' as const } },
        { label: 'Chevron separator', props: { items: defaultItems, separator: 'chevron' as const } },
        { label: 'Arrow separator', props: { items: defaultItems, separator: 'arrow' as const } },
        { label: 'With home icon', props: { items: defaultItems, separator: 'slash' as const, showHomeIcon: true } },
        { label: 'Colored background', props: { items: defaultItems, separator: 'slash' as const, coloredBg: true } },
        { label: 'Home icon + colored bg', props: { items: defaultItems, separator: 'chevron' as const, showHomeIcon: true, coloredBg: true } },
        { label: 'Two levels', props: { items: [{ label: 'Shipments', href: '#' }, { label: 'Order #1234' }], separator: 'slash' as const } },
      ].map(({ label, props }) => (
        <div key={label}>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">{label}</p>
          <Breadcrumbs {...props} />
        </div>
      ))}

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet</p>
        <CodeBlock
          code={`<nav aria-label="Breadcrumb">
  <ol class="inline-flex items-center gap-1.5">
    <li><a href="#" class="text-sm text-slate-500 hover:text-[#1b306c]">Dashboard</a></li>
    <li aria-hidden="true" class="text-slate-300 text-sm">/</li>
    <li><a href="#" class="text-sm text-slate-500 hover:text-[#1b306c]">Shipments</a></li>
    <li aria-hidden="true" class="text-slate-300 text-sm">/</li>
    <li><span class="text-sm font-medium text-[#1b306c]" aria-current="page">New Shipment</span></li>
  </ol>
</nav>`}
          jsx={`<Breadcrumbs
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Shipments', href: '/shipments' },
    { label: 'New Shipment' },
  ]}
  separator="slash"
/>`}
        />
      </div>
    </div>
  ),
};
