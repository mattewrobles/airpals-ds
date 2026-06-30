import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { ProgressStep } from '../lib/ProgressStep';
import type { ProgressStepProps } from '../lib/ProgressStep';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=878-2129';

const TruckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const BoxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const meta: Meta<typeof ProgressStep> = {
  title: 'Components/ProgressStep',
  component: ProgressStep,
  tags: ['autodocs'],
  argTypes: {
    label:  { control: 'text' },
    active: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `878-2129`',
          '',
          'Step indicator for progress flows. Pill + label.',
          '',
          '| State | Pill bg | Label color |',
          '|-------|---------|-------------|',
          '| Active | `#fc4575` (pink) | `#fc4575` |',
          '| Inactive | white + `#e2e8f0` border | `#cbd5e1` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressStep>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'ProgressStep'}
      types={['ProgressStepProps']}
      jsx={`<ProgressStep label="Pickup" icon={<TruckIcon />} active />`}
      figmaKey=""
    />
  ),
};

export const Active: Story = {
  args: { label: 'Pickup', icon: <TruckIcon />, active: true },
};

export const Inactive: Story = {
  args: { label: 'Pickup', icon: <TruckIcon />, active: false },
};

export const ShippingFlow: Story = {
  name: 'Shipping Flow (3 steps)',
  render: () => (
    <div className="p-8 bg-white flex items-start gap-6 font-body">
      <ProgressStep label="Label" icon={<BoxIcon />} active />
      <ProgressStep label="Transit" icon={<TruckIcon />} />
      <ProgressStep label="Delivered" icon={<CheckIcon />} />
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">States</p>
        <div className="flex items-start gap-8">
          <div>
            <p className="text-xs text-slate-400 mb-3">Active</p>
            <ProgressStep label="Pickup" icon={<TruckIcon />} active />
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-3">Inactive</p>
            <ProgressStep label="Pickup" icon={<TruckIcon />} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Multi-step bar</p>
        <div className="flex items-start gap-4">
          <ProgressStep label="Label" icon={<BoxIcon />} active />
          <ProgressStep label="Transit" icon={<TruckIcon />} active />
          <ProgressStep label="Delivered" icon={<CheckIcon />} />
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<div class="flex flex-col gap-2 items-center">
  <div style="background:#fc4575; border-radius:999px; height:27px; padding:6px;">
    <!-- icon white 15px -->
  </div>
  <span style="font-size:8px; font-weight:600; text-transform:uppercase; color:#fc4575; letter-spacing:1.34px;">
    PICKUP
  </span>
</div>`}
          jsx={`<ProgressStep label="Pickup" icon={<TruckIcon />} active />`}
        />
      </div>
    </div>
  ),
};
