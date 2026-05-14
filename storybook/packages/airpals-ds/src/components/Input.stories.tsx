import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/* ── Component ───────────────────────────────────────────── */

type InputState = 'Default' | 'Hover' | 'Focused' | 'Disabled';
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
  Default:  'border-slate-200 dark:border-slate-700',
  Hover:    'border-slate-300 dark:border-slate-600',
  Focused:  'border-2 border-brand-blue outline-none',
  Disabled: 'border-slate-200 dark:border-slate-700 bg-brand-blue-sky dark:bg-slate-700 cursor-not-allowed',
};

const statusClasses: Record<InputStatus, string> = {
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
      {label && (
        <label className="text-sm font-medium text-brand-navy dark:text-slate-50">{label}</label>
      )}
      <input
        type="text"
        disabled={disabled}
        defaultValue={value}
        placeholder={placeholder}
        className={[
          'w-full border rounded-lg px-3 py-2 text-base text-brand-navy dark:text-slate-50',
          'placeholder:text-slate-300 dark:placeholder:text-slate-600',
          'dark:bg-slate-900',
          'transition-colors',
          stateClasses[state],
          state !== 'Focused' ? statusClasses[status] : '',
          disabled ? 'opacity-60' : '',
        ].join(' ')}
      />
      {helperText && (
        <p className={`text-xs ${helperColor[status]}`}>{helperText}</p>
      )}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    state:  { control: 'select', options: ['Default', 'Hover', 'Focused', 'Disabled'] },
    status: { control: 'select', options: ['Default', 'Error', 'Success'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Airpals Input. Figma Component Set key: `d8b9c1ffd324575a54c030c43023a3b4360bdcfd`. 96 variants: State × Status × RightIcon × HelperText × Label.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = { args: { label: 'Origin Address', placeholder: 'Start typing…' } };
export const WithValue: Story = { args: { label: 'Recipient Name', value: 'Alex Johnson', state: 'Focused' } };
export const WithError: Story = { args: { label: 'Weight (lbs)', value: '0', status: 'Error', helperText: 'Weight must be greater than 0' } };
export const WithSuccess: Story = { args: { label: 'ZIP Code', value: '11201', status: 'Success', helperText: 'Brooklyn, NY' } };
export const Disabled: Story = { args: { label: 'Account Number', value: '••••••••', state: 'Disabled' } };

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body min-h-screen">
      <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-6">Input States</h2>
      <div className="grid gap-6 max-w-sm">
        <Input label="Default" placeholder="Origin address…" state="Default" />
        <Input label="Hover" placeholder="Origin address…" state="Hover" />
        <Input label="Focused" value="101 Pacific Street, Brooklyn" state="Focused" />
        <Input label="Disabled" value="••••••••" state="Disabled" />
        <Input label="Error" value="abc" status="Error" helperText="Please enter a valid ZIP code" />
        <Input label="Success" value="10001" status="Success" helperText="New York, NY" />
        <Input placeholder="No label, default state" />
      </div>
    </div>
  ),
};
