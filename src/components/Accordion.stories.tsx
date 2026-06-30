import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Accordion, AccordionGroup } from '../lib/Accordion';
import type { AccordionSize, AccordionGroupItem } from '../lib/Accordion';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=740-28025';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    size:        { control: 'select', options: ['Small', 'Large'] },
    defaultOpen: { control: 'boolean' },
    disabled:    { control: 'boolean' },
    title:       { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `740-28025` (atom) · `740-27940` (group)',
          '',
          'Expand/collapse container. Sizes: **Small** (20px title) and **Large** (24px title).',
          '',
          '| State | bg |',
          '|-------|-----|',
          '| Default | `#e6f1fd` |',
          '| Disabled | `#f1f5f9`, text `#cbd5e1` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Accordion'}
      types={['AccordionSize', 'AccordionGroupItem', 'AccordionGroupProps', 'AccordionProps']}
      jsx={`<Accordion title="How does same-day delivery work?">
  <p>Our courier picks up within the hour and delivers across the city.</p>
</Accordion>`}
      figmaKey=""
    />
  ),
};

export const Default: Story = {
  args: {
    title: 'How does same-day delivery work?',
    children: 'Our courier picks up within the hour and delivers across NYC.',
  },
};

export const DefaultOpen: Story = {
  name: 'Default Open',
  args: {
    title: 'What carriers do you support?',
    defaultOpen: true,
    children: 'FedEx, UPS, and USPS for nationwide shipping.',
  },
};

export const Large: Story = {
  args: {
    title: 'How do I connect my FedEx account?',
    size: 'Large',
    children: 'Go to Organization Settings → Carrier Accounts → Add FedEx account.',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Feature coming soon',
    disabled: true,
    children: 'Not available yet.',
  },
};

const FAQ_ITEMS: AccordionGroupItem[] = [
  { title: 'How does same-day delivery work?',    content: 'Your courier picks up within the hour and delivers across NYC.' },
  { title: 'Which carriers are supported?',       content: 'FedEx, UPS, and USPS for nationwide shipping.' },
  { title: 'Can I connect my existing accounts?', content: 'Yes — connect FedEx and UPS in Organization Settings → Carrier Accounts.' },
  { title: 'Is multi-city courier available?',    content: 'Yes, via Airpals Concierge in 100+ US cities.' },
];

export const Group: Story = {
  name: 'AccordionGroup',
  render: () => (
    <div style={{ width: 540 }}>
      <AccordionGroup items={FAQ_ITEMS} />
    </div>
  ),
};

export const GroupLarge: Story = {
  name: 'AccordionGroup — Large',
  render: () => (
    <div style={{ width: 540 }}>
      <AccordionGroup items={FAQ_ITEMS} size="Large" />
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8" style={{ maxWidth: 580 }}>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Small (default)</p>
        <Accordion title="How does same-day delivery work?" defaultOpen>
          Our courier picks up within the hour and delivers across NYC.
        </Accordion>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Large</p>
        <Accordion title="How does same-day delivery work?" size="Large">
          Our courier picks up within the hour and delivers across NYC.
        </Accordion>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Disabled</p>
        <Accordion title="Feature coming soon" disabled>Hidden</Accordion>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Group</p>
        <AccordionGroup items={FAQ_ITEMS.slice(0, 3)} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<!-- Single -->
<details class="bg-[#e6f1fd] rounded-3xl px-3 py-3">
  <summary class="font-semibold text-[#1b306c] cursor-pointer">FAQ title</summary>
  <p class="mt-2 text-sm text-slate-600">Answer here.</p>
</details>`}
          jsx={`<AccordionGroup items={[
  { title: 'Question', content: 'Answer' },
]} />`}
        />
      </div>
    </div>
  ),
};
