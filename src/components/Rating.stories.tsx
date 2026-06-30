import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Rating } from '../lib/Rating';
import type { RatingSize, RatingProps } from '../lib/Rating';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=745-9986';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value:         { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    max:           { control: { type: 'number', min: 1, max: 10 } },
    size:          { control: 'select', options: ['Normal', 'Sm'] },
    showLabel:     { control: 'boolean' },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    readOnly:      { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `745-9986` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '5-star rating. Normal = 28px stars, Sm = 24px stars.',
          '',
          '| State | Color |',
          '|-------|-------|',
          '| Filled | `#1b306c` (navy) |',
          '| Empty | gray outline |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Rating'}
      types={['RatingSize', 'RatingProps']}
      jsx={`<Rating value={4} showLabel />`}
      figmaKey=""
    />
  ),
};

export const Default: Story = { args: { value: 4 } };
export const WithLabel: Story = { name: 'With Label', args: { value: 4.5, showLabel: true } };
export const LabelLeft: Story = { name: 'Label Left', args: { value: 4, showLabel: true, labelPosition: 'left' } };
export const Small: Story = { args: { value: 3, size: 'Sm', showLabel: true } };
export const ReadOnly: Story = { name: 'Read Only', args: { value: 4, readOnly: true, showLabel: true } };
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 5, showLabel: true } };

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [v, setV] = useState(3);
    return (
      <div className="p-4 flex flex-col gap-3">
        <Rating value={v} onChange={setV} showLabel />
        <p className="text-sm text-slate-500">Selected: {v}/5</p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-6">
      {[
        { label: 'Normal — 4 stars',            props: { value: 4 } },
        { label: 'Normal — with label right',   props: { value: 4.5, showLabel: true } },
        { label: 'Normal — with label left',    props: { value: 4.5, showLabel: true, labelPosition: 'left' as const } },
        { label: 'Small (Sm)',                  props: { value: 4, size: 'Sm' as const, showLabel: true } },
        { label: 'Empty',                       props: { value: 0 } },
        { label: 'Full (5/5)',                  props: { value: 5, showLabel: true } },
      ].map(({ label, props }) => (
        <div key={label}>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">{label}</p>
          <Rating {...props} />
        </div>
      ))}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<div class="flex items-center gap-1">
  <!-- filled star -->
  <svg class="text-[#1b306c]" fill="currentColor">...</svg>
  <!-- empty star -->
  <svg class="text-gray-300" fill="none" stroke="currentColor">...</svg>
  <span class="text-sm text-slate-600 ml-2">Rating : 4/5.0</span>
</div>`}
          jsx={`<Rating value={4} showLabel />`}
        />
      </div>
    </div>
  ),
};
