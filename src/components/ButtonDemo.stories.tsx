import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonDemo } from '../lib/ButtonDemo';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=850-1930';

const meta: Meta<typeof ButtonDemo> = {
  title: 'Components/ButtonDemo',
  component: ButtonDemo,
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `850-1930` · "Button prueba" · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Demo button using `brand/pink` (#FC4575) fill with white text.',
          '',
          '| Token | Value |',
          '|-------|-------|',
          '| Fill | `bg-brand-pink` (#FC4575) |',
          '| Text | `text-ink-on-accent` (white) |',
          '| Radius | `rounded-xl` (12px) |',
          '| Padding | `px-5 py-3` (20/12px) |',
          '| Font | Inter Regular 16px |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ButtonDemo>;

export const Default: Story = { args: { label: 'hola mundo' } };
export const CustomLabel: Story = { args: { label: 'New Shipment' } };
export const Disabled: Story = { args: { label: 'hola mundo', disabled: true } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex flex-col items-center gap-2">
          <ButtonDemo label="hola mundo" />
          <span className="text-xs text-slate-400">Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ButtonDemo label="hola mundo" disabled />
          <span className="text-xs text-slate-400">Disabled</span>
        </div>
      </div>
    </div>
  ),
};
