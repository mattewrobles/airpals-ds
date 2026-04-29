import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@prism/components';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
    leftIcon: {
      control: false,
      description: 'Icon node rendered on the left of the label',
    },
    rightIcon: {
      control: false,
      description: 'Icon node rendered on the right of the label',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=BUTTON_NODE',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ---- Default (playground) ---- */
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Button',
    disabled: false,
  },
};

/* ---- All Variants × All Sizes ---- */
export const AllVariants: Story = {
  render: () => {
    const variants = ['primary', 'secondary', 'destructive', 'ghost'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '12px',
                fontFamily: 'monospace',
                color: 'var(--text-tertiary)',
                width: '24px',
                flexShrink: 0,
              }}
            >
              {size}
            </span>
            {variants.map((variant) => (
              <Button key={variant} variant={variant} size={size} label={variant} />
            ))}
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

/* ---- States ---- */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="md" label="Default" />
        <Button variant="secondary" size="md" label="Default" />
        <Button variant="destructive" size="md" label="Default" />
        <Button variant="ghost" size="md" label="Default" />
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="md" label="Disabled" disabled />
        <Button variant="secondary" size="md" label="Disabled" disabled />
        <Button variant="destructive" size="md" label="Disabled" disabled />
        <Button variant="ghost" size="md" label="Disabled" disabled />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

/* ---- With Icons ---- */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="md" label="Send" leftIcon={<span>→</span>} />
        <Button variant="secondary" size="md" label="Back" rightIcon={<span>←</span>} />
        <Button variant="ghost" size="md" label="Download" leftIcon={<span>↓</span>} />
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button
          variant="primary"
          size="sm"
          label="Add"
          leftIcon={<span>+</span>}
        />
        <Button
          variant="destructive"
          size="sm"
          label="Delete"
          rightIcon={<span>×</span>}
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

/* ---- Size Comparison ---- */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="sm" label="Small" />
      <Button variant="primary" size="md" label="Medium" />
      <Button variant="primary" size="lg" label="Large" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
