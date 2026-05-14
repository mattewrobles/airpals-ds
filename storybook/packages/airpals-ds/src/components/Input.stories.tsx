import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/* ── Component ───────────────────────────────────────────── */

type InputState  = 'Default' | 'Hover' | 'Focused' | 'Disabled';
type InputStatus = 'Default' | 'Error' | 'Success';

type InputProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  state?: InputState;
  status?: InputStatus;
  value?: string;
};

const stateClasses: Record<InputState, string> = {
  Default:  'border border-slate-200 dark:border-slate-700',
  Hover:    'border border-slate-300 dark:border-slate-600',
  Focused:  'border-2 border-brand-blue outline-none',
  Disabled: 'border border-slate-200 dark:border-slate-700 bg-brand-blue-sky dark:bg-slate-700 cursor-not-allowed',
};

const statusBorder: Record<InputStatus, string> = {
  Default: '',
  Error:   'border-red-500',
  Success: 'border-green-500',
};

const helperColor: Record<InputStatus, string> = {
  Default: 'text-slate-500',
  Error:   'text-red-600',
  Success: 'text-green-600',
};

function Input({ label, placeholder = 'Type here…', helperText, state = 'Default', status = 'Default', value }: InputProps) {
  const disabled = state === 'Disabled';
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-brand-navy dark:text-slate-50">{label}</label>}
      <input
        type="text"
        disabled={disabled}
        defaultValue={value}
        placeholder={placeholder}
        className={[
          'w-full rounded-lg px-3 py-2 text-base text-brand-navy dark:text-slate-50',
          'placeholder:text-slate-300 dark:placeholder:text-slate-600',
          'bg-white dark:bg-slate-900 transition-colors',
          stateClasses[state],
          state !== 'Focused' ? statusBorder[status] : '',
          disabled ? 'opacity-60' : '',
        ].join(' ')}
      />
      {helperText && <p className={`text-xs ${helperColor[status]}`}>{helperText}</p>}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    state:       { control: 'select', options: ['Default', 'Hover', 'Focused', 'Disabled'], description: 'Interaction state' },
    status:      { control: 'select', options: ['Default', 'Error', 'Success'], description: 'Validation status' },
    label:       { control: 'text', description: 'Label above the field' },
    placeholder: { control: 'text', description: 'Placeholder text — uses text/disable token' },
    helperText:  { control: 'text', description: 'Helper text below — color changes with status' },
    value:       { control: 'text', description: 'Default value' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `d8b9c1ffd324575a54c030c43023a3b4360bdcfd`',
          '',
          '96 variants — State × Status × RightIcon × HelperText × Label.',
          '',
          '| Token | Usage |',
          '|-------|-------|',
          '| `border-slate-200` | Default border |',
          '| `border-2 border-brand-blue` | Focus state |',
          '| `border-red-500` | Error state |',
          '| `border-green-500` | Success state |',
          '| `text-slate-300` | Placeholder color |',
          '| `bg-brand-blue-sky` | Disabled background |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = {
  args: { label: 'Origin Address', placeholder: 'Start typing…' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Default -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">
    Origin Address
  </label>
  <input
    type="text"
    placeholder="Start typing…"
    class="w-full border border-slate-200 rounded-lg px-3 py-2 text-base
           text-brand-navy placeholder:text-slate-300
           bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50
           transition-colors"
  />
</div>`,
      },
    },
  },
};

export const Focused: Story = {
  args: { label: 'Recipient', value: '101 Pacific Street, Brooklyn', state: 'Focused' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Focused — border-2 + brand-blue -->
<input class="w-full border-2 border-brand-blue rounded-lg px-3 py-2 text-base
              text-brand-navy bg-white outline-none
              dark:bg-slate-900 dark:text-slate-50" />`,
      },
    },
  },
};

export const WithError: Story = {
  args: { label: 'Weight (lbs)', value: '0', status: 'Error', helperText: 'Weight must be greater than 0' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Error state -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Weight (lbs)</label>
  <input class="w-full border border-red-500 rounded-lg px-3 py-2 text-base
                text-brand-navy bg-white dark:bg-slate-900 dark:text-slate-50" />
  <p class="text-xs text-red-600">Weight must be greater than 0</p>
</div>`,
      },
    },
  },
};

export const WithSuccess: Story = {
  args: { label: 'ZIP Code', value: '11201', status: 'Success', helperText: 'Brooklyn, NY' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Success state -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">ZIP Code</label>
  <input class="w-full border border-green-500 rounded-lg px-3 py-2 text-base
                text-brand-navy bg-white dark:bg-slate-900 dark:text-slate-50" />
  <p class="text-xs text-green-600">Brooklyn, NY</p>
</div>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: { label: 'Account Number', value: '••••••••', state: 'Disabled' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Disabled — bg-brand-blue-sky -->
<input
  disabled
  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-base
         bg-brand-blue-sky text-brand-navy opacity-60 cursor-not-allowed
         dark:bg-slate-700 dark:border-slate-700 dark:text-slate-50"
/>`,
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body">
      <div className="grid gap-6 max-w-sm">
        <Input label="Default" placeholder="Origin address…" />
        <Input label="Hover" placeholder="Origin address…" state="Hover" />
        <Input label="Focused" value="101 Pacific Street, Brooklyn" state="Focused" />
        <Input label="Disabled" value="••••••••" state="Disabled" />
        <Input label="Error" value="abc" status="Error" helperText="Please enter a valid ZIP code" />
        <Input label="Success" value="10001" status="Success" helperText="New York, NY" />
      </div>
    </div>
  ),
};
