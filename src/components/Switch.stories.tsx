import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { UsageBlock } from '../shared/UsageBlock';
import { Switch } from '../lib/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Controlled 44×24px switch for settings rows. Has no visible text, so `label` is required as the accessible name. Use ToggleWithText when the label must be visible.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Usage: Story = {
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component="Switch"
      types={['SwitchProps']}
      jsx={`<Switch checked={on} onChange={setOn} label="Email notifications" />`}
    />
  ),
};

function Controlled({ disabled }: { disabled?: boolean }) {
  const [on, setOn] = useState(true);
  return <Switch checked={on} onChange={setOn} label="Email notifications" disabled={disabled} />;
}

export const Default: Story = { render: () => <Controlled /> };
export const Disabled: Story = { render: () => <Controlled disabled /> };
