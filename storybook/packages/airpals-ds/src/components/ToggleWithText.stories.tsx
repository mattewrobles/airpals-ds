import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ToggleWithText } from '../lib/ToggleWithText';

const meta: Meta<typeof ToggleWithText> = {
  title: 'Components/ToggleWithText',
  component: ToggleWithText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Toggle With Text',
          '',
          'Toggle paired with a dynamic label that updates with state.',
          'Two sizes: **default** (55×32 track, matches Toggle Style=1) and **compact** (50×26 track, ON=#0043ff track).',
          '',
          'Figma key (component set): `d4f1d3132c9e1ae9ed1d26b8e6156be9241385b7`',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['default', 'compact'] },
    active: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof ToggleWithText>;

export const Default: Story = {
  args: {
    labelOff: 'Auto Saver Off',
    labelOn: 'Auto Saver On',
    active: false,
    size: 'default',
  },
};

export const Compact: Story = {
  args: {
    labelOff: 'Notifications Off',
    labelOn: 'Notifications On',
    active: true,
    size: 'compact',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-white">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Default (55×32)</p>
        <div className="flex flex-col gap-4">
          <ToggleWithText labelOff="Dark Mode Off" labelOn="Dark Mode On" active={false} size="default" />
          <ToggleWithText labelOff="Dark Mode Off" labelOn="Dark Mode On" active={true} size="default" />
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Compact (50×26)</p>
        <div className="flex flex-col gap-4">
          <ToggleWithText labelOff="Auto Saver Off" labelOn="Auto Saver On" active={false} size="compact" />
          <ToggleWithText labelOff="Auto Saver Off" labelOn="Auto Saver On" active={true} size="compact" />
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Controlled example</p>
        <ControlledExample />
      </div>
    </div>
  ),
};

function ControlledExample() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <ToggleWithText
        labelOff="Email notifications off"
        labelOn="Email notifications on"
        active={on}
        onToggle={setOn}
      />
      <p className="text-xs text-slate-400">State: {on ? 'ON' : 'OFF'}</p>
    </div>
  );
}
