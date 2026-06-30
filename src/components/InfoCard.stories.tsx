import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { InfoCard } from '../lib/InfoCard';
import type { InfoCardProps } from '../lib/InfoCard';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=747-9372';

const meta: Meta<typeof InfoCard> = {
  title: 'Components/InfoCard',
  component: InfoCard,
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text' },
    paragraph:   { control: 'text' },
    buttonLabel: { control: 'text' },
    showChip:    { control: 'boolean' },
    showHead:    { control: 'boolean' },
    showContent: { control: 'boolean' },
    showButton:  { control: 'boolean' },
    showImage:   { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `747-9372`',
          '',
          'Feature highlight card. Width: 385px.',
          '',
          '| Section | Style |',
          '|---------|-------|',
          '| Chip | pink `NEW` badge |',
          '| Title | Lexend SemiBold 24px, navy |',
          '| Paragraph | Inter Regular 16px, navy |',
          '| Button | `#0043ff` bg, h-52, rounded-6, white text |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof InfoCard>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'InfoCard'}
      types={['InfoCardProps']}
      jsx={`<InfoCard
  title="AI Shipping Assistant"
  paragraph="Ask once, get the answer, move on."
  buttonLabel="Try Our Free AI Shipping Assistant"
/>`}
      figmaKey=""
    />
  ),
};

export const Default: Story = {};

export const NoChip: Story = {
  name: 'No Chip',
  args: { showChip: false },
};

export const NoButton: Story = {
  name: 'No Button',
  args: { showButton: false },
};

export const CustomContent: Story = {
  name: 'Custom Content',
  args: {
    title: 'Multi-Carrier Shipping',
    paragraph: 'Compare FedEx, UPS, and USPS rates in one place. Save time and reduce costs with AI-powered recommendations.',
    buttonLabel: 'Compare Rates Now',
    showChip: false,
  },
};

export const WithImage: Story = {
  name: 'With Image',
  args: {
    title: 'Same-Day Delivery',
    paragraph: 'Get packages across NYC in under an hour. 5 boroughs covered.',
    buttonLabel: 'Book a Same-Day Courier',
    showImage: true,
    imageUrl: '/images/States=model.svg',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8 flex flex-col">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Default (all sections)</p>
        <InfoCard />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">No chip</p>
        <InfoCard showChip={false} title="Multi-Carrier Shipping" paragraph="Compare rates across FedEx, UPS, and USPS." buttonLabel="Compare Rates" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<div class="flex flex-col gap-5 w-[385px]">
  <span class="badge-pink">NEW</span>
  <h3 class="font-lexend font-semibold text-2xl text-[#1b306c]">AI Shipping Assistant</h3>
  <p class="text-base text-[#1b306c]">Skip the research and paperwork...</p>
  <button class="w-full bg-[#0043ff] text-white rounded-md h-[52px] font-semibold text-sm">
    Try Our Free AI Shipping Assistant
  </button>
</div>`}
          jsx={`<InfoCard
  title="AI Shipping Assistant"
  buttonLabel="Try Our Free AI Shipping Assistant"
/>`}
        />
      </div>
    </div>
  ),
};
