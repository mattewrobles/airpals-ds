import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { ButtonDouble } from '../lib/ButtonDouble';
import type { ButtonDoubleSize, ButtonDoubleProps } from '../lib/ButtonDouble';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=741-40277';

const meta: Meta<typeof ButtonDouble> = {
  title: 'Components/ButtonDouble',
  component: ButtonDouble,
  tags: ['autodocs'],
  argTypes: {
    size:            { control: 'select', options: ['sm', 'lg'] },
    primaryLabel:    { control: 'text' },
    secondaryLabel:  { control: 'text' },
    primaryDisabled: { control: 'boolean' },
    secondaryDisabled: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `741-40277` — modal/card footer action area.',
          '',
          '| Size | Container | Button layout |',
          '|------|-----------|---------------|',
          '| `sm` | 48px | buttons `flex-1` (fill width) |',
          '| `lg` | 64px | buttons `shrink-0` (fixed min-width) |',
          '',
          'Use at the bottom of modals, drawers, and confirmation cards.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ButtonDouble>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'ButtonDouble'}
      types={['ButtonDoubleSize', 'ButtonDoubleProps']}
      jsx={`<ButtonDouble primaryLabel="Confirm" secondaryLabel="Cancel" />`}
      figmaKey=""
    />
  ),
};

export const Default: Story = {
  args: { primaryLabel: 'Confirm Shipment', secondaryLabel: 'Cancel' },
  decorators: [(S) => <div className="w-80 bg-white p-4 rounded-xl border border-slate-100"><S /></div>],
};

export const Large: Story = {
  args: { primaryLabel: 'Create Shipment', secondaryLabel: 'Back', size: 'lg' },
  decorators: [(S) => <div className="w-96 bg-white p-4 rounded-xl border border-slate-100"><S /></div>],
};

export const PrimaryOnly: Story = {
  name: 'Primary Only',
  args: { primaryLabel: 'Got it' },
  decorators: [(S) => <div className="w-80 bg-white p-4 rounded-xl border border-slate-100"><S /></div>],
};

export const DisabledPrimary: Story = {
  name: 'Disabled Primary',
  args: { primaryLabel: 'Continue', secondaryLabel: 'Back', primaryDisabled: true },
  decorators: [(S) => <div className="w-80 bg-white p-4 rounded-xl border border-slate-100"><S /></div>],
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      {[
        { label: 'Small (default) — two buttons',   props: { primaryLabel: 'Confirm', secondaryLabel: 'Cancel', size: 'sm' as const } },
        { label: 'Large — two buttons',             props: { primaryLabel: 'Create Shipment', secondaryLabel: 'Back', size: 'lg' as const } },
        { label: 'Small — primary only',            props: { primaryLabel: 'Got it', size: 'sm' as const } },
        { label: 'Primary disabled',                props: { primaryLabel: 'Continue', secondaryLabel: 'Back', primaryDisabled: true, size: 'sm' as const } },
      ].map(({ label, props }) => (
        <div key={label}>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">{label}</p>
          <div className="w-80 border border-slate-100 rounded-xl overflow-hidden">
            <ButtonDouble {...props} />
          </div>
        </div>
      ))}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<div class="flex items-start gap-3 w-full py-2 rounded-b-lg">
  <button class="flex-1 btn-secondary">Cancel</button>
  <button class="flex-1 btn-primary">Confirm</button>
</div>`}
          jsx={`<ButtonDouble primaryLabel="Confirm" secondaryLabel="Cancel" />`}
        />
      </div>
    </div>
  ),
};
