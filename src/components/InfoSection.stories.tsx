import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { UsageBlock } from '../shared/UsageBlock';
import { InfoSection } from '../lib/InfoSection';
import type { InfoSectionAlign, InfoSectionProps } from '../lib/InfoSection';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=747-9493';

const PlaceholderIllustration = ({ color = '#e6f1fd' }: { color?: string }) => (
  <div style={{ width: 280, height: 280, borderRadius: 16, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect x="10" y="20" width="60" height="40" rx="8" fill="#0043ff" opacity="0.15" />
      <rect x="20" y="30" width="40" height="20" rx="4" fill="#0043ff" opacity="0.3" />
      <circle cx="40" cy="40" r="8" fill="#0043ff" opacity="0.6" />
    </svg>
  </div>
);

const meta: Meta<typeof InfoSection> = {
  title: 'Components/InfoSection',
  component: InfoSection,
  tags: ['autodocs'],
  argTypes: {
    align:    { control: 'select', options: ['One', 'Two'] },
    showBase: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `747-9493`',
          '',
          'Two-column layout: InfoCard + illustration.',
          '',
          '| Align | Layout |',
          '|-------|--------|',
          '| `One` | InfoCard left · illustration right |',
          '| `Two` | illustration left · InfoCard right |',
          '',
          'Base = `#e6f1fd` bg, rounded-24, 378×378 decorative rectangle behind illustration.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof InfoSection>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'InfoSection'}
      types={['InfoSectionAlign', 'InfoSectionProps']}
      jsx={`<InfoSection
  align="One"
  illustration={<img src="/images/States=asistente.svg" alt="" />}
  infoCard={{ title: 'AI Shipping Assistant', buttonLabel: 'Try it free' }}
/>`}
      figmaKey=""
    />
  ),
};

export const AlignOne: Story = {
  name: 'Align One (card left)',
  render: () => (
    <InfoSection
      align="One"
      illustration={<PlaceholderIllustration />}
      infoCard={{ title: 'AI Shipping Assistant', paragraph: 'Skip the research. Ask once, get the answer.', buttonLabel: 'Try Our Free AI Shipping Assistant', showChip: true }}
    />
  ),
};

export const AlignTwo: Story = {
  name: 'Align Two (card right)',
  render: () => (
    <InfoSection
      align="Two"
      illustration={<PlaceholderIllustration color="#fff0f4" />}
      infoCard={{ title: 'Same-Day Delivery', paragraph: 'Packages across NYC in under an hour.', buttonLabel: 'Book a Courier', showChip: false }}
    />
  ),
};

export const NoBase: Story = {
  name: 'No Base',
  render: () => (
    <InfoSection
      align="One"
      showBase={false}
      illustration={<PlaceholderIllustration />}
      infoCard={{ title: 'Multi-Carrier Shipping', buttonLabel: 'Compare Rates' }}
    />
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-12">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Align One — card left</p>
        <InfoSection
          align="One"
          illustration={<PlaceholderIllustration />}
          infoCard={{ title: 'AI Shipping Assistant', paragraph: 'Skip the research. Ask once, get the answer.', buttonLabel: 'Try it free', showChip: true }}
        />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Align Two — card right</p>
        <InfoSection
          align="Two"
          illustration={<PlaceholderIllustration color="#fff0f4" />}
          infoCard={{ title: 'Same-Day Delivery', paragraph: 'Packages across NYC in under an hour.', buttonLabel: 'Book a Courier', showChip: false }}
        />
      </div>
    </div>
  ),
};
