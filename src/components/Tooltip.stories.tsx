import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { UsageBlock } from '../shared/UsageBlock';
import { Tooltip, TooltipContent, TooltipTrigger } from '../lib/Tooltip';
import { Button } from '../lib/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Radix tooltip with the Airpals dark-navy surface. Compose Tooltip, TooltipTrigger and TooltipContent.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Usage: Story = {
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={['Tooltip', 'TooltipTrigger', 'TooltipContent']}
      jsx={`<Tooltip>
  <TooltipTrigger asChild><Button label="Hover me" variant="outline" /></TooltipTrigger>
  <TooltipContent side="top">Create a new shipment</TooltipContent>
</Tooltip>`}
    />
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-6 p-16">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Tooltip key={side} defaultOpen>
          <TooltipTrigger asChild><Button label={side} variant="outline" /></TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};
