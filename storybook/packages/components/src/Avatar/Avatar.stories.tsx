import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@prism/components';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image URL — when provided shows the image',
    },
    initials: {
      control: 'text',
      description: 'Initials shown when no src. First 2 characters are used.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
      description: 'Optional status indicator dot',
    },
    alt: {
      control: 'text',
      description: 'Accessible alt text for the image',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=AVATAR_NODE',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/* ---- Default ---- */
export const Default: Story = {
  args: {
    initials: 'MA',
    size: 'md',
  },
};

/* ---- With Image ---- */
export const WithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar
        src="https://i.pravatar.cc/150?img=1"
        size="md"
        alt="User avatar"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=2"
        size="lg"
        alt="User avatar"
        status="online"
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- With Initials ---- */
export const WithInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar initials="MA" size="md" />
      <Avatar initials="GB" size="md" />
      <Avatar initials="NH" size="md" />
      <Avatar initials="JD" size="md" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- All Sizes ---- */
export const AllSizes: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar initials="MA" size={size} />
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
              {size}
            </span>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

/* ---- With Status ---- */
export const WithStatus: Story = {
  render: () => {
    const statuses = ['online', 'offline', 'busy', 'away'] as const;
    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
        {statuses.map((status) => (
          <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar initials="MA" size="md" status={status} />
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
              {status}
            </span>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

/* ---- Fallback (no src, no initials) ---- */
export const FallbackIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar size="sm" />
      <Avatar size="md" />
      <Avatar size="lg" status="online" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
