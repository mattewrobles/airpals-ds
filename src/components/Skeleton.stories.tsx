import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Skeleton, SkeletonCard, SkeletonTableRow } from '../lib/Skeleton';
import type { SkeletonShape, SkeletonProps } from '../lib/Skeleton';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    shape:  { control: 'select', options: ['rect', 'circle', 'text'] },
    width:  { control: { type: 'number' } },
    height: { control: { type: 'number' } },
    lines:  { control: { type: 'number', min: 1, max: 10 } },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Loading placeholder with shimmer animation.',
          '',
          '**Shapes:** `rect` (default), `circle`, `text` (multi-line)',
          '',
          '**Composed:** `SkeletonCard` and `SkeletonTableRow` for common patterns.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Skeleton'}
      types={['SkeletonShape', 'SkeletonProps']}
      jsx={`<Skeleton shape="text" lines={3} />
<SkeletonCard />
<SkeletonTableRow columns={4} />`}
      figmaKey=""
    />
  ),
};

export const Rect: Story = { args: { shape: 'rect', width: 200, height: 120 } };
export const Circle: Story = { args: { shape: 'circle', width: 48 } };
export const Text: Story = { args: { shape: 'text', lines: 3, width: 320 } };

export const CardComposed: Story = {
  name: 'SkeletonCard',
  render: () => <div className="p-4 bg-white"><SkeletonCard /></div>,
};

export const TableRowComposed: Story = {
  name: 'SkeletonTableRow',
  render: () => (
    <div className="bg-white p-4 space-y-2">
      <SkeletonTableRow columns={5} />
      <SkeletonTableRow columns={5} />
      <SkeletonTableRow columns={5} />
    </div>
  ),
};

export const ShipmentListLoading: Story = {
  name: 'Shipment List — Loading',
  render: () => (
    <div className="bg-white p-6 space-y-3 rounded-xl border border-slate-100 max-w-2xl font-body">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Recent shipments</p>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          <Skeleton shape="circle" width={40} />
          <div className="flex-1 space-y-2">
            <Skeleton shape="rect" height={14} width="60%" />
            <Skeleton shape="rect" height={12} width="40%" />
          </div>
          <Skeleton shape="rect" width={80} height={24} />
        </div>
      ))}
    </div>
  ),
};

export const DashboardLoading: Story = {
  name: 'Dashboard — Loading',
  render: () => (
    <div className="bg-slate-50 p-6 space-y-6 max-w-4xl font-body">
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
      <div className="bg-white rounded-xl p-4 space-y-2">
        <Skeleton shape="rect" height={20} width={180} />
        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4].map(i => <SkeletonTableRow key={i} columns={5} />)}
        </div>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Rect</p>
        <Skeleton shape="rect" width={240} height={80} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Circle</p>
        <Skeleton shape="circle" width={48} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Text (3 lines)</p>
        <Skeleton shape="text" lines={3} width={320} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">SkeletonCard</p>
        <SkeletonCard />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">SkeletonTableRow ×3</p>
        <div className="space-y-2">
          {[1, 2, 3].map(i => <SkeletonTableRow key={i} columns={4} />)}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<div class="airpals-skeleton rounded-md" style="width:200px;height:20px;"></div>

<style>
  @keyframes airpals-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  .airpals-skeleton {
    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
    background-size: 800px 100%;
    animation: airpals-shimmer 1.4s ease-in-out infinite;
  }
</style>`}
          jsx={`<Skeleton shape="rect" width={200} height={20} />
<SkeletonCard />
<SkeletonTableRow columns={5} />`}
        />
      </div>
    </div>
  ),
};
