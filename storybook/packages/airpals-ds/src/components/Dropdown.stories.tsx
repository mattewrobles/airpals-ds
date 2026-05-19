import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';

/* ── Component ───────────────────────────────────────────── */
/*
  Figma specs (node 686:680, file 3oMpon9bh8T8d0hFQt7l2g):
  key: ab6bdf420ef071648dce629158fdf9f013d2a10b
  14 variants — State × Expanded × Label
  State: Default / Hover / Focused / Disabled
  Expanded: Off / On
  Label: On / Off
  Border: border-slate-200 · rounded-lg (8px)
  Active item bg: bg-[#e6f1fd] text-[#0043ff]
*/

type DropdownState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

type DropdownProps = {
  label?: string;
  placeholder?: string;
  state?: DropdownState;
  expanded?: boolean;
  options?: string[];
  selectedOption?: string;
};

const CHEVRON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CHEVRON_UP = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Dropdown({
  label,
  placeholder = 'Select an option',
  state = 'Default',
  expanded = false,
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  selectedOption,
}: DropdownProps) {
  const [open, setOpen] = useState(expanded);
  const [selected, setSelected] = useState(selectedOption ?? '');
  const disabled = state === 'Disabled';

  const borderClass =
    state === 'Focused'
      ? 'border-2 border-[#0043ff]'
      : state === 'Hover'
      ? 'border-slate-300'
      : 'border-slate-200';

  const bgClass = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer';
  const textClass = disabled
    ? 'text-slate-300'
    : selected
    ? 'text-[#1b306c]'
    : 'text-slate-400';
  const iconClass = disabled ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className="relative w-64 font-body">
      {label && (
        <label className="block text-sm font-medium text-[#1b306c] mb-1">{label}</label>
      )}
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border ${borderClass} ${bgClass} text-sm transition-colors`}
      >
        <span className={textClass}>{selected || placeholder}</span>
        <span className={iconClass}>{open ? CHEVRON_UP : CHEVRON}</span>
      </button>

      {open && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                selected === opt
                  ? 'bg-[#e6f1fd] text-[#0043ff] font-medium'
                  : 'text-[#1b306c] hover:bg-slate-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    state:    { control: 'select', options: ['Default', 'Hover', 'Focused', 'Disabled'] },
    expanded: { control: 'boolean' },
    label:    { control: 'text' },
    placeholder: { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `686-680` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '14 variants — `State` × `Expanded` × `Label`.',
          '',
          '| State | Border |',
          '|-------|--------|',
          '| Default | `border-slate-200` |',
          '| Hover | `border-slate-300` |',
          '| Focused | `border-2 border-[#0043ff]` |',
          '| Disabled | `bg-gray-100` text & icon `slate-300` |',
          '',
          'Active item in expanded list: `bg-[#e6f1fd] text-[#0043ff]`.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = { args: { placeholder: 'Select an option' } };
export const WithLabel: Story = { name: 'With Label', args: { label: 'Carrier', placeholder: 'Select carrier' } };
export const Expanded: Story = { args: { label: 'Carrier', expanded: true, options: ['FedEx', 'UPS', 'USPS', 'Same-Day'] } };
export const Focused: Story = { args: { label: 'Carrier', state: 'Focused' } };
export const Disabled: Story = { args: { label: 'Carrier', state: 'Disabled', placeholder: 'Select carrier' } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div className="grid grid-cols-2 gap-8">
        {(['Default', 'Hover', 'Focused', 'Disabled'] as const).map((state) => (
          <div key={state}>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">{state}</p>
            <Dropdown label="Carrier" placeholder="Select carrier" state={state} />
          </div>
        ))}
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Expanded</p>
          <Dropdown label="Carrier" expanded={true} options={['FedEx', 'UPS', 'USPS', 'Same-Day']} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">No Label</p>
          <Dropdown placeholder="Select an option" />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          <CodeBlock
            code={`<div class="relative w-64">
  <label class="block text-sm font-medium text-[#1b306c] mb-1">Carrier</label>
  <button class="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-400">
    <span>Select carrier</span>
    <svg><!-- chevron --></svg>
  </button>
</div>`}
            jsx={`<Dropdown label="Carrier" placeholder="Select carrier" />`}
          />
        </div>
      </div>
    </div>
  ),
};
