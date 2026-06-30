import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { DataCard } from '../lib/DataCard';
import type { DataCardLayout, DataCardProps } from '../lib/DataCard';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=745-9014';

const meta: Meta<typeof DataCard> = {
  title: 'Components/DataCard',
  component: DataCard,
  tags: ['autodocs'],
  argTypes: {
    layout:      { control: 'select', options: ['Normal', 'Vertical', 'Horizontal'] },
    title:       { control: 'text' },
    content:     { control: 'text' },
    data:        { control: 'text' },
    showImage:   { control: 'boolean' },
    showContent: { control: 'boolean' },
    showData:    { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `745-9014`',
          '',
          'Product/item card with optional image, content, data badge, and a Stepper for quantity.',
          '',
          '| Layout | Width |',
          '|--------|-------|',
          '| Normal | 202px |',
          '| Vertical | 483px |',
          '| Horizontal | 631px |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DataCard>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'DataCard'}
      types={['DataCardLayout', 'DataCardProps']}
      jsx={`<DataCard title="Motorbike" content="Gifts, documents, tech devices" data="30 LBS MAX" />`}
      figmaKey=""
    />
  ),
};

export const Normal: Story = {
  args: { layout: 'Normal', title: 'Motorbike', content: 'Gifts, documents, tech devices', data: '30 LBS MAX' },
};

export const Vertical: Story = {
  args: { layout: 'Vertical', title: 'Van', content: 'Large items, furniture, equipment', data: '500 LBS MAX' },
};

export const Horizontal: Story = {
  args: { layout: 'Horizontal', title: 'Sedan', content: 'Documents, packages, gifts', data: '50 LBS MAX' },
};

export const NoOptionals: Story = {
  name: 'Minimal (no image/content/data)',
  args: { layout: 'Normal', title: 'Motorbike', showImage: false, showContent: false, showData: false },
};

export const AllLayouts: Story = {
  name: 'All Layouts',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Normal (202px)</p>
        <DataCard layout="Normal" title="Motorbike" content="Gifts, documents, tech" data="30 LBS MAX" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Vertical (483px)</p>
        <DataCard layout="Vertical" title="Van" content="Large items, equipment" data="500 LBS MAX" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Horizontal (631px)</p>
        <DataCard layout="Horizontal" title="Sedan" content="Documents, packages, gifts" data="50 LBS MAX" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<div class="bg-white rounded-[10px] shadow-xs p-4">
  <div class="thumbnail"><!-- gradient or image --></div>
  <h4 class="font-semibold text-[#1b306c] text-base">Motorbike</h4>
  <p class="text-sm text-slate-500">Gifts, documents, tech devices</p>
  <span class="badge">30 LBS MAX</span>
  <stepper value={count} onChange={setCount} />
</div>`}
          jsx={`<DataCard title="Motorbike" content="Gifts, documents, tech" data="30 LBS MAX" />`}
        />
      </div>
    </div>
  ),
};
