import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty',
    },
    value: {
      control: 'text',
      description: 'Controlled value',
    },
    error: {
      control: 'text',
      description: 'Error message — turns border red and shows message below',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below input (hidden when error is set)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: 'HTML input type',
    },
    onChange: {
      action: 'changed',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=INPUT_NODE',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/* ---- Controlled wrapper for stories ---- */
const ControlledInput = (props: Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'> & { initialValue?: string }) => {
  const { initialValue = '', ...rest } = props;
  const [value, setValue] = useState(initialValue);
  return <Input {...rest} value={value} onChange={setValue} />;
};

/* ---- Default ---- */
export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    placeholder: 'Enter text…',
    size: 'md',
    disabled: false,
  },
};

/* ---- With Label ---- */
export const WithLabel: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <ControlledInput label="Email address" placeholder="you@example.com" type="email" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- With Error ---- */
export const WithError: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <ControlledInput
        label="Email address"
        initialValue="not-an-email"
        error="Please enter a valid email address"
        type="email"
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- With Hint ---- */
export const WithHint: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <ControlledInput
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        hint="Use a mix of letters, numbers, and symbols"
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- Disabled ---- */
export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <ControlledInput
        label="Username"
        initialValue="mau@userdesigners.com"
        disabled
        hint="Contact support to change your username"
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- All Sizes ---- */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}
    >
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ControlledInput
          key={size}
          size={size}
          label={`Size: ${size}`}
          placeholder={`Input — ${size}`}
        />
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---- With Icons ---- */
export const WithIcons: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}
    >
      <ControlledInput
        label="Search"
        placeholder="Search…"
        leftIcon={<span>⌕</span>}
      />
      <ControlledInput
        label="Password"
        type="password"
        placeholder="Enter password"
        rightIcon={<span>◎</span>}
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
