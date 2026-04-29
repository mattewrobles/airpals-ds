import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Supporting text below the title',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding',
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined'],
      description: 'Visual style of the card',
    },
    onClick: {
      action: 'clicked',
      description: 'When provided, the card becomes interactive',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=CARD_NODE',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/* ---- Default ---- */
export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'Supporting description text goes here, providing context about the card content.',
    padding: 'md',
    variant: 'default',
  },
};

/* ---- All Variants ---- */
export const AllVariants: Story = {
  render: () => {
    const variants = ['default', 'elevated', 'outlined'] as const;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '800px' }}>
        {variants.map((variant) => (
          <Card
            key={variant}
            variant={variant}
            padding="md"
            title={variant.charAt(0).toUpperCase() + variant.slice(1)}
            description="Card variant example with supporting text."
          />
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

/* ---- Clickable ---- */
export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '560px' }}>
      <Card
        variant="default"
        padding="md"
        title="Click me"
        description="This card is interactive — hover and click."
        onClick={() => alert('Card clicked!')}
      />
      <Card
        variant="elevated"
        padding="md"
        title="Also clickable"
        description="Elevated variant with hover shadow animation."
        onClick={() => alert('Card clicked!')}
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- With Content (children) ---- */
export const WithContent: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Card variant="elevated" padding="md" title="Design Token Usage" description="Monthly stats for your token library.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Total tokens</span>
            <Badge variant="info" size="sm" label="247" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Status</span>
            <Badge variant="success" size="sm" label="Published" dot />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Last updated</span>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>Today</span>
          </div>
          <div style={{ marginTop: '4px' }}>
            <Button variant="secondary" size="sm" label="View all tokens" />
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- Padding Variants ---- */
export const PaddingVariants: Story = {
  render: () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
        {paddings.map((padding) => (
          <Card
            key={padding}
            variant="outlined"
            padding={padding}
            title={`Padding: ${padding}`}
          />
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
