import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Alert } from '../lib/Alert';
import type { AlertUseCase, AlertProps } from '../lib/Alert';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=540-106';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    useCase: { control: 'select', options: ['error', 'warning', 'success', 'info', 'alert'] },
    border:  { control: 'boolean' },
    title:   { control: 'text' },
    items:   { control: 'object', description: 'Optional list items' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `540-106` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Alert banner — 5 use cases × border optional. Radius: `6px` · Padding: `16px` · Gap: `12px`.',
          '',
          '| useCase | bg token | icon token | title token |',
          '|---------|----------|------------|-------------|',
          '| `error` | `surface-error` | `icon-error` | `ink-error` |',
          '| `warning` | `surface-warning` | `icon-warning` | `ink-warning` |',
          '| `success` | `surface-success` | `icon-success` | `ink-success` |',
          '| `info` | `surface-info` | `icon-info` | `ink-info` |',
          '| `alert` | `surface-warning` | `icon-warning` | `ink-warning` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Alert'}
      types={['AlertUseCase', 'AlertProps']}
      jsx={`<Alert useCase="warning" title="Shipment delayed" />`}
      figmaKey="7ab16d43d264598355e8b9404cb71fa295cfbd3e"
    />
  ),
};

/* ── Individual stories ─────────────────────────────────── */

export const ErrorSimple: Story = {
  name: 'Error — Simple',
  args: { useCase: 'error', title: 'No carriers were found for the selected shipment parameters.' },
};

export const ErrorWithList: Story = {
  name: 'Error — With List',
  args: {
    useCase: 'error',
    title: 'Please fix the following errors:',
    items: ['Origin address is required', 'Weight must be greater than 0', 'Dimensions are missing'],
  },
};

export const WarningSimple: Story = {
  name: 'Warning — Simple',
  args: { useCase: 'warning', title: 'Carrier account is not connected. Rates may be limited.' },
};

export const SuccessSimple: Story = {
  name: 'Success — Simple',
  args: { useCase: 'success', title: 'Shipment created successfully. Tracking number: 1Z999AA1.' },
};

export const InfoSimple: Story = {
  name: 'Info — Simple',
  args: { useCase: 'info', title: 'Your account will be reviewed within 1–2 business days.' },
};

export const AlertSimple: Story = {
  name: 'Alert — Simple',
  args: { useCase: 'alert', title: 'You have 3 shipments pending confirmation.' },
};

export const WithBorder: Story = {
  name: 'With Border',
  args: { useCase: 'error', border: true, title: 'This shipment requires your attention.' },
};

/* ── All types grid ─────────────────────────────────────── */

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div className="bg-surface-primary p-8 font-body space-y-3 max-w-xl">
      <Alert useCase="error"   title="No carriers were found for the selected parameters." />
      <Alert useCase="warning" title="Carrier account is not connected. Rates may be limited." />
      <Alert useCase="success" title="Shipment created successfully." />
      <Alert useCase="info"    title="Your account will be reviewed within 1–2 business days." />
      <Alert useCase="alert"   title="You have 3 shipments pending confirmation." />
      <p className="text-xs font-medium text-ink-tertiary uppercase tracking-wide pt-4">With border + list</p>
      <Alert useCase="error" border title="Please fix the following errors:" items={['Origin address is required', 'Weight must be greater than 0']} />
      <Alert useCase="success" border title="All checks passed:" items={['Address verified', 'Carrier connected', 'Label generated']} />
    </div>
  ),
};
