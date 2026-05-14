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

type TextareaState  = 'Default' | 'Focused' | 'Disabled';
type TextareaStatus = 'Default' | 'Error' | 'Success';

type TextareaProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  maxLength?: number;
  rows?: number;
  state?: TextareaState;
  status?: TextareaStatus;
  value?: string;
};

const stateClasses: Record<TextareaState, string> = {
  Default:  'border border-slate-200 dark:border-slate-700',
  Focused:  'border-2 border-brand-blue outline-none',
  Disabled: 'border border-slate-200 dark:border-slate-700 bg-brand-blue-sky dark:bg-slate-700 cursor-not-allowed opacity-60',
};

const statusBorder: Record<TextareaStatus, string> = {
  Default: '',
  Error:   'border-red-500',
  Success: 'border-green-500',
};

const helperColor: Record<TextareaStatus, string> = {
  Default: 'text-slate-500',
  Error:   'text-red-600',
  Success: 'text-green-600',
};

function Textarea({
  label,
  placeholder = 'Type here…',
  helperText,
  maxLength,
  rows = 4,
  state = 'Default',
  status = 'Default',
  value = '',
}: TextareaProps) {
  const [text, setText] = useState(value);
  const disabled = state === 'Disabled';
  const charCount = text.length;
  const nearLimit = maxLength !== undefined && charCount >= maxLength * 0.85;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-brand-navy dark:text-slate-50">{label}</label>
      )}
      <div className="relative">
        <textarea
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          value={disabled ? value : text}
          onChange={(e) => !disabled && setText(e.target.value)}
          className={[
            'w-full rounded-lg px-3 py-2 text-base text-brand-navy dark:text-slate-50',
            'placeholder:text-slate-300 dark:placeholder:text-slate-600',
            'bg-white dark:bg-slate-900 transition-colors resize-none',
            stateClasses[state],
            state !== 'Focused' ? statusBorder[status] : '',
            maxLength !== undefined ? 'pb-7' : '',
          ].join(' ')}
        />
        {maxLength !== undefined && (
          <span
            className={[
              'absolute bottom-2 right-3 text-xs font-mono pointer-events-none',
              nearLimit ? 'text-red-500' : 'text-slate-400',
            ].join(' ')}
          >
            {disabled ? (value?.length ?? 0) : charCount}/{maxLength}
          </span>
        )}
      </div>
      {helperText && (
        <p className={`text-xs ${helperColor[status]}`}>{helperText}</p>
      )}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    state:       { control: 'select', options: ['Default', 'Focused', 'Disabled'], description: 'Interaction state' },
    status:      { control: 'select', options: ['Default', 'Error', 'Success'], description: 'Validation status' },
    label:       { control: 'text', description: 'Label above the field' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    helperText:  { control: 'text', description: 'Helper/error text below the field' },
    maxLength:   { control: 'number', description: 'Shows character counter when set' },
    rows:        { control: 'number', description: 'Number of visible text rows (default 4)' },
    value:       { control: 'text', description: 'Default value / controlled value' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `3672-29542`',
          '',
          'Textarea follows the same border/state logic as Input — same tokens, taller box.',
          'When `maxLength` is set, a live character counter `{n}/{max}` appears bottom-right.',
          'Counter turns `text-red-500` when ≥ 85% of the limit is reached.',
          '',
          '| Token | Usage |',
          '|-------|-------|',
          '| `border-slate-200` | Default border |',
          '| `border-2 border-brand-blue` | Focus state |',
          '| `border-red-500` | Error state |',
          '| `border-green-500` | Success state |',
          '| `bg-brand-blue-sky` | Disabled background |',
          '| `text-slate-400` | Counter color (normal) |',
          '| `text-red-500` | Counter color (near limit) |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    label: 'Special Instructions',
    placeholder: 'Add any notes for the driver or recipient…',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Default textarea -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">
    Special Instructions
  </label>
  <textarea
    rows="4"
    placeholder="Add any notes for the driver or recipient…"
    class="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2
           text-base text-brand-navy dark:text-slate-50
           placeholder:text-slate-300 dark:placeholder:text-slate-600
           bg-white dark:bg-slate-900 transition-colors resize-none"
  ></textarea>
</div>`,
      },
    },
  },
};

export const Focused: Story = {
  args: {
    label: 'Package Description',
    value: 'Electronic components — fragile, handle with care.',
    state: 'Focused',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Focused — border-2 + brand-blue -->
<textarea
  rows="4"
  class="w-full border-2 border-brand-blue rounded-lg px-3 py-2
         text-base text-brand-navy dark:text-slate-50
         bg-white dark:bg-slate-900 outline-none resize-none"
>Electronic components — fragile, handle with care.</textarea>`,
      },
    },
  },
};

export const WithError: Story = {
  name: 'Error',
  args: {
    label: 'Return Reason',
    value: 'Bad',
    status: 'Error',
    helperText: 'Please provide at least 20 characters describing the return reason.',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Error state -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Return Reason</label>
  <textarea
    rows="4"
    class="w-full border border-red-500 rounded-lg px-3 py-2
           text-base text-brand-navy bg-white dark:bg-slate-900 dark:text-slate-50
           resize-none"
  >Bad</textarea>
  <p class="text-xs text-red-600">Please provide at least 20 characters describing the return reason.</p>
</div>`,
      },
    },
  },
};

export const WithSuccess: Story = {
  name: 'Success',
  args: {
    label: 'Delivery Notes',
    value: 'Leave at the front door — the doorbell is broken.',
    status: 'Success',
    helperText: 'Notes saved.',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Success state -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Delivery Notes</label>
  <textarea
    rows="4"
    class="w-full border border-green-500 rounded-lg px-3 py-2
           text-base text-brand-navy bg-white dark:bg-slate-900 dark:text-slate-50
           resize-none"
  ></textarea>
  <p class="text-xs text-green-600">Notes saved.</p>
</div>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Internal Notes',
    value: 'Routed via Chicago hub — no changes allowed.',
    state: 'Disabled',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Disabled -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Internal Notes</label>
  <textarea
    disabled
    rows="4"
    class="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2
           text-base text-brand-navy dark:text-slate-50
           bg-brand-blue-sky dark:bg-slate-700 opacity-60 cursor-not-allowed resize-none"
  >Routed via Chicago hub — no changes allowed.</textarea>
</div>`,
      },
    },
  },
};

export const WithCounter: Story = {
  name: 'With Character Counter',
  args: {
    label: 'Shipment Description',
    placeholder: 'Describe the contents of your shipment…',
    maxLength: 200,
    value: 'Electronic components — laptop, charger, and accessories. Fragile, please handle with care and keep upright.',
    rows: 5,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- With character counter (maxLength) -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">
    Shipment Description
  </label>
  <div class="relative">
    <textarea
      rows="5"
      maxlength="200"
      placeholder="Describe the contents…"
      class="w-full border border-slate-200 dark:border-slate-700 rounded-lg
             px-3 py-2 pb-7 text-base text-brand-navy dark:text-slate-50
             placeholder:text-slate-300 dark:placeholder:text-slate-600
             bg-white dark:bg-slate-900 resize-none transition-colors"
    ></textarea>
    <!-- Counter — text-red-500 when >= 85% of maxLength -->
    <span class="absolute bottom-2 right-3 text-xs font-mono text-slate-400 pointer-events-none">
      0/200
    </span>
  </div>
</div>`,
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-8">
      <div className="grid gap-6 max-w-sm">
        <Textarea
          label="Default"
          placeholder="Add any notes for the driver or recipient…"
        />
        <Textarea
          label="Focused"
          value="Electronic components — fragile, handle with care."
          state="Focused"
        />
        <Textarea
          label="Error"
          value="Bad"
          status="Error"
          helperText="Please provide at least 20 characters."
        />
        <Textarea
          label="Success"
          value="Leave at the front door — the doorbell is broken."
          status="Success"
          helperText="Notes saved."
        />
        <Textarea
          label="Disabled"
          value="Routed via Chicago hub — no changes allowed."
          state="Disabled"
        />
        <Textarea
          label="With Counter (200 chars)"
          placeholder="Describe the contents of your shipment…"
          maxLength={200}
          value="Electronic components — laptop, charger, and accessories. Fragile, handle with care."
          rows={5}
        />
      </div>

      {/* Code snippets */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Default',
              code: `<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Label</label>
  <textarea
    rows="4"
    placeholder="Type here…"
    class="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2
           text-base text-brand-navy dark:text-slate-50
           placeholder:text-slate-300 dark:placeholder:text-slate-600
           bg-white dark:bg-slate-900 resize-none transition-colors"
  ></textarea>
</div>`,
            },
            {
              label: 'Focused',
              code: `<textarea
  rows="4"
  class="w-full border-2 border-brand-blue rounded-lg px-3 py-2
         text-base text-brand-navy dark:text-slate-50
         bg-white dark:bg-slate-900 outline-none resize-none"
></textarea>`,
            },
            {
              label: 'Error',
              code: `<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-brand-navy dark:text-slate-50">Label</label>
  <textarea
    rows="4"
    class="w-full border border-red-500 rounded-lg px-3 py-2
           text-base text-brand-navy bg-white dark:bg-slate-900 dark:text-slate-50
           resize-none"
  ></textarea>
  <p class="text-xs text-red-600">Error message here.</p>
</div>`,
            },
            {
              label: 'Disabled',
              code: `<textarea
  disabled
  rows="4"
  class="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2
         text-base text-brand-navy dark:text-slate-50
         bg-brand-blue-sky dark:bg-slate-700 opacity-60 cursor-not-allowed resize-none"
></textarea>`,
            },
            {
              label: 'With Counter',
              code: `<div class="relative">
  <textarea
    rows="5"
    maxlength="200"
    class="w-full border border-slate-200 dark:border-slate-700 rounded-lg
           px-3 py-2 pb-7 text-base text-brand-navy dark:text-slate-50
           placeholder:text-slate-300 bg-white dark:bg-slate-900
           resize-none transition-colors"
  ></textarea>
  <!-- text-red-500 when >= 85% of limit -->
  <span class="absolute bottom-2 right-3 text-xs font-mono text-slate-400 pointer-events-none">
    0/200
  </span>
</div>`,
            },
          ].map((s) => (
            <CodeBlock key={s.label} code={s.code} />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Textarea — same border/state logic as Input, taller, optional counter -->
<!-- resize-none is always set to prevent layout breaks -->
<!-- pb-7 + absolute counter span when maxLength is present -->`,
      },
    },
  },
};
