import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">HTML + Tailwind</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
          className="px-2 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto bg-white dark:bg-slate-900 leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────── */

type DropdownState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

type DropdownProps = {
  label?: string;
  placeholder?: string;
  options: string[];
  state?: DropdownState;
  helperText?: string;
};

const CARRIER_OPTIONS = ['FedEx Ground', 'UPS Standard', 'USPS Priority Mail', 'DHL Express'];

function ChevronDown() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 text-slate-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 text-slate-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Dropdown({
  label,
  placeholder = 'Select…',
  options,
  state = 'Default',
  helperText,
}: DropdownProps) {
  const [open, setOpen] = useState(state === 'Focused');
  const [selected, setSelected] = useState<string | null>(null);
  const isDisabled = state === 'Disabled';

  const triggerCls = [
    'w-full flex items-center justify-between rounded-lg px-3 py-2 text-base bg-white dark:bg-slate-900 transition-colors',
    isDisabled
      ? 'border border-slate-200 dark:border-slate-700 bg-brand-blue-sky dark:bg-slate-700 opacity-60 cursor-not-allowed'
      : open || state === 'Focused'
        ? 'border-2 border-brand-blue outline-none'
        : state === 'Hover'
          ? 'border border-slate-300 dark:border-slate-600'
          : 'border border-slate-200 dark:border-slate-700',
  ].join(' ');

  const displayText = selected ?? placeholder;
  const displayCls = selected
    ? 'text-brand-navy dark:text-slate-50'
    : 'text-slate-300 dark:text-slate-600';

  function handleSelect(opt: string) {
    setSelected(opt);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      {label && (
        <label className="text-sm font-medium text-brand-navy dark:text-slate-50">{label}</label>
      )}

      <button
        type="button"
        disabled={isDisabled}
        onClick={() => !isDisabled && setOpen(o => !o)}
        className={triggerCls}
      >
        <span className={`text-base ${displayCls}`}>{displayText}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Dropdown list */}
      {open && !isDisabled && (
        <ul className="absolute z-10 top-full mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
          {options.map((opt, idx) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={[
                'px-3 py-2 text-sm cursor-pointer transition-colors',
                idx === 0 && selected === null
                  ? 'bg-brand-blue text-white'
                  : selected === opt
                    ? 'bg-brand-blue text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
              ].join(' ')}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}

      {helperText && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    state:       { control: 'select', options: ['Default', 'Hover', 'Focused', 'Disabled'], description: 'Interaction state' },
    label:       { control: 'text', description: 'Label above the select trigger' },
    placeholder: { control: 'text', description: 'Placeholder shown when no option is selected' },
    helperText:  { control: 'text', description: 'Helper text shown below the field' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          'Select / dropdown for the Airpals design system.',
          '',
          'Matches Input field styling exactly — same border, padding, and state tokens.',
          '',
          '| State | Border |',
          '|-------|--------|',
          '| Default | `border border-slate-200` |',
          '| Hover | `border border-slate-300` |',
          '| Focused/Open | `border-2 border-brand-blue` |',
          '| Disabled | `bg-brand-blue-sky opacity-60 cursor-not-allowed` |',
          '',
          'Interactive — clicking the trigger opens the list and selecting an option closes it.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = {
  args: { label: 'Carrier', placeholder: 'Select…', options: CARRIER_OPTIONS, state: 'Default' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Dropdown trigger — closed/default -->
<div class="flex flex-col gap-1.5 relative">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Carrier</label>
  <button
    type="button"
    class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base
           border border-slate-200 dark:border-slate-700
           bg-white dark:bg-slate-900 transition-colors"
  >
    <span class="text-slate-300 dark:text-slate-600">Select…</span>
    <svg class="w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>`,
      },
    },
  },
};

export const Focused: Story = {
  args: { label: 'Carrier', placeholder: 'Select…', options: CARRIER_OPTIONS, state: 'Focused' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Dropdown trigger — focused state -->
<button
  type="button"
  class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base
         border-2 border-brand-blue outline-none
         bg-white dark:bg-slate-900 transition-colors"
>
  <span class="text-slate-300">Select…</span>
  <svg class="w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="none">
    <path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>`,
      },
    },
  },
};

export const Open: Story = {
  name: 'Open (with options list)',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<string | null>(null);
    const [open, setOpen] = useState(true);

    return (
      <div className="bg-white dark:bg-slate-900 p-8 font-body">
        <div className="max-w-xs relative">
          <label className="text-sm font-medium text-brand-navy dark:text-slate-50 block mb-1.5">Carrier</label>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base border-2 border-brand-blue bg-white dark:bg-slate-900 outline-none transition-colors"
          >
            <span className={selected ? 'text-brand-navy dark:text-slate-50' : 'text-slate-300 dark:text-slate-600'}>
              {selected ?? 'Select…'}
            </span>
            {open ? <ChevronUp /> : <ChevronDown />}
          </button>
          {open && (
            <ul className="absolute z-10 top-full mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
              {CARRIER_OPTIONS.map((opt, idx) => (
                <li
                  key={opt}
                  onClick={() => { setSelected(opt); setOpen(false); }}
                  className={[
                    'px-3 py-2 text-sm cursor-pointer transition-colors',
                    idx === 0 && selected === null
                      ? 'bg-brand-blue text-white'
                      : selected === opt
                        ? 'bg-brand-blue text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
                  ].join(' ')}
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Dropdown — open state with options list -->
<div class="relative">
  <button
    type="button"
    class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base
           border-2 border-brand-blue outline-none bg-white dark:bg-slate-900"
  >
    <span class="text-slate-300">Select…</span>
    <!-- chevron-up when open -->
  </button>

  <ul class="absolute z-10 top-full mt-1 w-full bg-white dark:bg-slate-900
             border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
    <!-- First item highlighted (no selection yet) -->
    <li class="px-3 py-2 text-sm bg-brand-blue text-white cursor-pointer">FedEx Ground</li>
    <li class="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800">UPS Standard</li>
    <li class="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800">USPS Priority Mail</li>
    <li class="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800">DHL Express</li>
  </ul>
</div>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: { label: 'Carrier', placeholder: 'Select…', options: CARRIER_OPTIONS, state: 'Disabled' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Dropdown trigger — disabled -->
<button
  type="button"
  disabled
  class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base
         border border-slate-200 dark:border-slate-700
         bg-brand-blue-sky dark:bg-slate-700 opacity-60 cursor-not-allowed"
>
  <span class="text-slate-300">Select…</span>
  <svg class="w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>`,
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-8">

      <div className="grid gap-6 max-w-xs">
        <Dropdown label="Default"  options={CARRIER_OPTIONS} state="Default"  placeholder="Select…" />
        <Dropdown label="Hover"    options={CARRIER_OPTIONS} state="Hover"    placeholder="Select…" />
        <Dropdown label="Focused / Open" options={CARRIER_OPTIONS} state="Focused"  placeholder="Select…" />
        <Dropdown label="Disabled" options={CARRIER_OPTIONS} state="Disabled" placeholder="Select…" />
        <Dropdown label="With Helper Text" options={CARRIER_OPTIONS} state="Default" helperText="Choose the carrier for this shipment" />
      </div>

      {/* ── Code snippets ── */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Closed — Default',
              code: `<div class="flex flex-col gap-1.5 relative">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Carrier</label>
  <button
    type="button"
    class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base
           border border-slate-200 dark:border-slate-700
           bg-white dark:bg-slate-900 transition-colors"
  >
    <span class="text-slate-300 dark:text-slate-600">Select…</span>
    <svg class="w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>`,
            },
            {
              label: 'Open — with list',
              code: `<div class="flex flex-col gap-1.5 relative">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Carrier</label>
  <button
    type="button"
    class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base
           border-2 border-brand-blue outline-none
           bg-white dark:bg-slate-900 transition-colors"
  >
    <span class="text-slate-300 dark:text-slate-600">Select…</span>
    <svg class="w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="none">
      <path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <ul class="absolute z-10 top-full mt-1 w-full bg-white dark:bg-slate-900
             border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
    <li class="px-3 py-2 text-sm bg-brand-blue text-white cursor-pointer">FedEx Ground</li>
    <li class="px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">UPS Standard</li>
    <li class="px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">USPS Priority Mail</li>
    <li class="px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">DHL Express</li>
  </ul>
</div>`,
            },
            {
              label: 'Disabled',
              code: `<button
  type="button"
  disabled
  class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base
         border border-slate-200 dark:border-slate-700
         bg-brand-blue-sky dark:bg-slate-700 opacity-60 cursor-not-allowed"
>
  <span class="text-slate-300 dark:text-slate-600">Select…</span>
  <svg class="w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>`,
            },
          ].map((s) => (
            <CodeBlock key={s.label} code={s.code} />
          ))}
        </div>
      </div>
    </div>
  ),
};
