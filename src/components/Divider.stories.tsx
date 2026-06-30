import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Divider } from '../lib/Divider';
import type { DividerDirection, DividerProps } from '../lib/Divider';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=750-3189';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['Horizontal', 'Vertical'] },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `750-3189`',
          '',
          'Thin separator line. `border/border-light` = `#e5e7eb` (slate-200).',
          '',
          '| Direction | Element |',
          '|-----------|---------|',
          '| Horizontal | `<hr>` full width |',
          '| Vertical | `<div>` 1px wide, self-stretch in flex containers |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Divider'}
      types={['DividerDirection', 'DividerProps']}
      jsx={`<Divider />
<Divider direction="Vertical" />`}
      figmaKey=""
    />
  ),
};

export const Horizontal: Story = {
  args: { direction: 'Horizontal' },
  decorators: [(S) => <div className="w-64 p-4 bg-white"><S /></div>],
};

export const Vertical: Story = {
  args: { direction: 'Vertical' },
  decorators: [(S) => (
    <div className="flex items-stretch h-16 gap-4 p-4 bg-white">
      <span className="text-sm text-slate-500">Left</span>
      <S />
      <span className="text-sm text-slate-500">Right</span>
    </div>
  )],
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Horizontal</p>
        <div className="w-80">
          <p className="text-sm text-slate-600 mb-3">Section above</p>
          <Divider />
          <p className="text-sm text-slate-600 mt-3">Section below</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Vertical (in flex container)</p>
        <div className="flex items-center gap-4 h-10">
          <span className="text-sm text-slate-600">FedEx</span>
          <Divider direction="Vertical" />
          <span className="text-sm text-slate-600">UPS</span>
          <Divider direction="Vertical" />
          <span className="text-sm text-slate-600">USPS</span>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<!-- Horizontal -->
<hr class="border-0 border-t border-[#e5e7eb] w-full m-0" />

<!-- Vertical (inside flex) -->
<div class="w-px self-stretch bg-[#e5e7eb]"></div>`}
          jsx={`<Divider />
<Divider direction="Vertical" />`}
        />
      </div>
    </div>
  ),
};
