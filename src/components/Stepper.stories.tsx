import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Stepper } from '../lib/Stepper';
import type { StepperProps } from '../lib/Stepper';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=742-64856';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number' } },
    min:   { control: { type: 'number' } },
    max:   { control: { type: 'number' } },
    step:  { control: { type: 'number', min: 1 } },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `742-64856` — FormsNumberInputStepper',
          '',
          'Numeric stepper with − / + buttons. Used in DataCard for item quantity.',
          '',
          '| Element | Style |',
          '|---------|-------|',
          '| Container | `border border-slate-200 rounded-lg bg-white` |',
          '| Button hover | `bg-[#e2e8f0]` fill height, outer corners rounded |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Stepper'}
      types={['StepperProps']}
      jsx={`<Stepper value={1} min={0} max={10} onChange={setCount} />`}
      figmaKey=""
    />
  ),
};

export const Default: Story = { args: { value: 1 } };
export const WithBounds: Story = { name: 'With Min/Max', args: { value: 5, min: 0, max: 10 } };
export const AtMin: Story = { name: 'At Minimum', args: { value: 0, min: 0, max: 10 } };
export const AtMax: Story = { name: 'At Maximum', args: { value: 10, min: 0, max: 10 } };

export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [v, setV] = useState(1);
    return (
      <div className="p-4 flex items-center gap-4 font-body">
        <Stepper value={v} min={0} max={10} onChange={setV} />
        <p className="text-sm text-slate-500">Value: {v}</p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-6">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Default (unbounded)</p>
        <Stepper value={1} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Bounded (0–10)</p>
        <Stepper value={5} min={0} max={10} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">At minimum — decrement disabled</p>
        <Stepper value={0} min={0} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
  <button class="px-2 py-1 hover:bg-[#e2e8f0] text-slate-500">−</button>
  <span class="px-3 text-sm font-medium text-[#1b306c]">1</span>
  <button class="px-2 py-1 hover:bg-[#e2e8f0] text-slate-500">+</button>
</div>`}
          jsx={`<Stepper value={1} min={0} max={10} onChange={setCount} />`}
        />
      </div>
    </div>
  ),
};
