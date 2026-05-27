import type { Meta, StoryObj } from '@storybook/react';
import { UsageBlock } from '../shared/UsageBlock';
import React from 'react';
import { AvatarGroup } from '../lib/AvatarGroup';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Avatar With Multiple Images',
          '',
          'Stacked overlapping avatars with optional "+N" counter for overflow.',
          'Sizes: **lg** (60×60) and **md** (50×50). Max 4 visible + counter.',
          '',
          '- Initials: blue `#0043ff` bg, white text',
          '- Counter: `#e6f1fd` bg, `#0043ff` text',
          '- Overlap: 12px (offset = size - 12px)',
          '',
          'Figma key (component set): `7d25bbb9a9909353ab9702e8de0baa52d700db83`',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['md', 'lg'] },
    max: { control: { type: 'number', min: 1, max: 8 } },
    total: { control: { type: 'number', min: 0, max: 20 } },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'AvatarGroup'}
      types={['AvatarGroupSize', 'AvatarGroupItem', 'AvatarGroupProps']}
      jsx={`<AvatarGroup
  avatars={[
    { initials: 'MA' },
    { initials: 'GB' },
    { initials: 'NH' },
  ]}
  total={3}
/>`}
      figmaKey="7d25bbb9a9909353ab9702e8de0baa52d700db83"
    />
  ),
};

const SAMPLE_AVATARS = [
  { initials: 'MA', alt: 'Mau A.' },
  { initials: 'GB', alt: 'Gaby B.' },
  { initials: 'NH', alt: 'Naho H.' },
  { initials: 'JD', alt: 'John D.' },
  { initials: 'BC', alt: 'Berny C.' },
];

export const Default: Story = {
  args: {
    avatars: SAMPLE_AVATARS.slice(0, 4),
    size: 'lg',
    max: 4,
    total: 4,
  },
};

export const WithOverflow: Story = {
  args: {
    avatars: SAMPLE_AVATARS,
    size: 'lg',
    max: 4,
    total: 9,
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-8 p-6 bg-white">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Large (60px)</p>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs text-slate-400 mb-2">4 avatars, no overflow</p>
              <AvatarGroup avatars={SAMPLE_AVATARS.slice(0, 4)} size="lg" total={4} />
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-2">4 visible + 5 more</p>
              <AvatarGroup avatars={SAMPLE_AVATARS} size="lg" max={4} total={9} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Medium (50px)</p>
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs text-slate-400 mb-2">3 avatars</p>
            <AvatarGroup avatars={SAMPLE_AVATARS.slice(0, 3)} size="md" total={3} />
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2">4 visible + 12 more</p>
            <AvatarGroup avatars={SAMPLE_AVATARS} size="md" max={4} total={16} />
          </div>
        </div>
      </div>
    </div>
  ),
};
