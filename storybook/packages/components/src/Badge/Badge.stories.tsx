import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@prism/components';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Visual style / semantic meaning of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the badge',
    },
    label: {
      control: 'text',
      description: 'Badge label text',
    },
    dot: {
      control: 'boolean',
      description: 'Show a colored status dot before the label',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=BADGE_NODE',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/* ---- Default ---- */
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    label: 'Badge',
    dot: false,
  },
};

/* ---- All Variants × Sizes ---- */
export const AllVariants: Story = {
  render: () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const;
    const sizes = ['sm', 'md'] as const;
    const labels: Record<typeof variants[number], string> = {
      default: 'Default',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      info: 'Info',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
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
              <Badge key={variant} variant={variant} size={size} label={labels[variant]} />
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

/* ---- With Dot ---- */
export const WithDot: Story = {
  render: () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const;
    const labels: Record<typeof variants[number], string> = {
      default: 'Inactive',
      success: 'Active',
      warning: 'Pending',
      error: 'Failed',
      info: 'Processing',
    };
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <Badge key={variant} variant={variant} size="md" label={labels[variant]} dot />
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

/* ---- Sizes ---- */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="success" size="sm" label="Small" dot />
      <Badge variant="success" size="md" label="Medium" dot />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
