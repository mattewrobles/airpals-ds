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

type AlertType = 'Warning' | 'Danger' | 'Success' | 'Info';

type AlertProps = {
  type?: AlertType;
  title?: string;
  message: string;
  items?: string[];
};

const alertConfig: Record<AlertType, { container: string; icon: React.ReactNode; iconWrap: string }> = {
  Warning: {
    container: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800',
    iconWrap: 'flex-shrink-0 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center',
    icon: (
      <svg viewBox="0 0 20 20" className="w-3 h-3 text-white fill-current">
        <text x="7" y="15" fontSize="13" fontWeight="bold" fill="white">!</text>
      </svg>
    ),
  },
  Danger: {
    container: 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800',
    iconWrap: 'flex-shrink-0 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center',
    icon: (
      <svg viewBox="0 0 20 20" className="w-3 h-3" fill="none">
        <path d="M5 5l10 10M15 5L5 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  Success: {
    container: 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800',
    iconWrap: 'flex-shrink-0 w-5 h-5 rounded-full bg-green-600 flex items-center justify-center',
    icon: (
      <svg viewBox="0 0 20 20" className="w-3 h-3" fill="none">
        <path d="M4 10l4.5 4.5L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Info: {
    container: 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800',
    iconWrap: 'flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center',
    icon: (
      <svg viewBox="0 0 20 20" className="w-3 h-3" fill="none">
        <path d="M10 9v5M10 6.5v.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

const textColor: Record<AlertType, string> = {
  Warning: 'text-amber-800 dark:text-amber-200',
  Danger:  'text-red-800 dark:text-red-200',
  Success: 'text-green-800 dark:text-green-200',
  Info:    'text-blue-800 dark:text-blue-200',
};

const itemDotColor: Record<AlertType, string> = {
  Warning: 'bg-amber-500',
  Danger:  'bg-red-600',
  Success: 'bg-green-600',
  Info:    'bg-blue-600',
};

function Alert({ type = 'Warning', title, message, items }: AlertProps) {
  const { container, icon, iconWrap } = alertConfig[type];
  const text = textColor[type];
  const dot = itemDotColor[type];
  return (
    <div className={`rounded-xl p-4 flex gap-3 ${container}`}>
      <div className={iconWrap}>{icon}</div>
      <div className="flex flex-col gap-1 min-w-0">
        {title && <p className={`text-sm font-semibold ${text}`}>{title}</p>}
        <p className={`text-sm leading-snug ${text}`}>{message}</p>
        {items && items.length > 0 && (
          <ul className="mt-1 flex flex-col gap-1">
            {items.map((item, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm ${text}`}>
                <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${dot}`} />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type:    { control: 'select', options: ['Warning', 'Danger', 'Success', 'Info'], description: 'Semantic alert type' },
    title:   { control: 'text', description: 'Optional bold title above the message' },
    message: { control: 'text', description: 'Main alert message' },
    items:   { control: 'object', description: 'Optional bullet list below the message' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `3672-29542`',
          '',
          'Inline alerts with 4 semantic types. Always includes an icon, optional title, and optional bullet list for multi-line detail.',
          '',
          '| Type | Background | Border | Use when |',
          '|------|-----------|--------|----------|',
          '| Warning | `amber-50` | `amber-200` | Carrier delays, address issues |',
          '| Danger | `red-50` | `red-200` | Validation errors, failed actions |',
          '| Success | `green-50` | `green-200` | Package delivered, label created |',
          '| Info | `blue-50` | `blue-200` | Informational notices |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

/* ── Stories ─────────────────────────────────────────────── */

export const Warning: Story = {
  args: {
    type: 'Warning',
    message: 'Delivery may be delayed due to high volume at the carrier.',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Warning alert -->
<div class="rounded-xl p-4 flex gap-3 bg-amber-50 border border-amber-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
    <span class="text-white text-xs font-bold leading-none">!</span>
  </div>
  <p class="text-sm text-amber-800 leading-snug">
    Delivery may be delayed due to high volume at the carrier.
  </p>
</div>`,
      },
    },
  },
};

export const WarningWithList: Story = {
  name: 'Warning — With List',
  args: {
    type: 'Warning',
    title: 'Carrier restrictions apply',
    message: 'The following items are restricted for this shipment:',
    items: [
      'Lithium batteries over 100 Wh',
      'Flammable liquids and aerosols',
      'Sharp objects without protective packaging',
    ],
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Warning with title + bullet list -->
<div class="rounded-xl p-4 flex gap-3 bg-amber-50 border border-amber-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
    <span class="text-white text-xs font-bold leading-none">!</span>
  </div>
  <div class="flex flex-col gap-1">
    <p class="text-sm font-semibold text-amber-800">Carrier restrictions apply</p>
    <p class="text-sm text-amber-800 leading-snug">The following items are restricted for this shipment:</p>
    <ul class="mt-1 flex flex-col gap-1">
      <li class="flex items-start gap-2 text-sm text-amber-800">
        <span class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        Lithium batteries over 100 Wh
      </li>
      <li class="flex items-start gap-2 text-sm text-amber-800">
        <span class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        Flammable liquids and aerosols
      </li>
    </ul>
  </div>
</div>`,
      },
    },
  },
};

export const Danger: Story = {
  args: {
    type: 'Danger',
    message: "We couldn't generate a shipping label. Please review the package details.",
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Danger alert -->
<div class="rounded-xl p-4 flex gap-3 bg-red-50 border border-red-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  </div>
  <p class="text-sm text-red-800 leading-snug">
    We couldn't generate a shipping label. Please review the package details.
  </p>
</div>`,
      },
    },
  },
};

export const DangerWithList: Story = {
  name: 'Danger — With List',
  args: {
    type: 'Danger',
    title: 'Label generation failed',
    message: 'Please fix the following errors before continuing:',
    items: [
      'Recipient ZIP code is invalid',
      'Package weight exceeds carrier limit (150 lbs)',
      'Origin address is incomplete — suite or unit required',
    ],
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Danger with title + bullet list -->
<div class="rounded-xl p-4 flex gap-3 bg-red-50 border border-red-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="flex flex-col gap-1">
    <p class="text-sm font-semibold text-red-800">Label generation failed</p>
    <p class="text-sm text-red-800 leading-snug">Please fix the following errors before continuing:</p>
    <ul class="mt-1 flex flex-col gap-1">
      <li class="flex items-start gap-2 text-sm text-red-800">
        <span class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-600"></span>
        Recipient ZIP code is invalid
      </li>
    </ul>
  </div>
</div>`,
      },
    },
  },
};

export const Success: Story = {
  args: {
    type: 'Success',
    message: 'Shipping label created successfully. Your package is ready for pickup.',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Success alert -->
<div class="rounded-xl p-4 flex gap-3 bg-green-50 border border-green-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path d="M4 10l4.5 4.5L16 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <p class="text-sm text-green-800 leading-snug">
    Shipping label created successfully. Your package is ready for pickup.
  </p>
</div>`,
      },
    },
  },
};

export const Info: Story = {
  args: {
    type: 'Info',
    message: 'UPS Ground estimates a 3–5 business day delivery window for this route.',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Info alert -->
<div class="rounded-xl p-4 flex gap-3 bg-blue-50 border border-blue-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path d="M10 9v5M10 6.5v.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  </div>
  <p class="text-sm text-blue-800 leading-snug">
    UPS Ground estimates a 3–5 business day delivery window for this route.
  </p>
</div>`,
      },
    },
  },
};

export const AllAlerts: Story = {
  name: 'All Alerts',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-8 max-w-xl">
      {/* Simple variants */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Simple (no title, no list)</p>
        <div className="space-y-3">
          <Alert type="Warning" message="Delivery may be delayed due to high volume at the carrier." />
          <Alert type="Danger"  message="We couldn't generate a shipping label. Please review the package details." />
          <Alert type="Success" message="Shipping label created successfully. Your package is ready for pickup." />
          <Alert type="Info"    message="UPS Ground estimates a 3–5 business day delivery window for this route." />
        </div>
      </div>

      {/* With title + list */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">With title + bullet list</p>
        <div className="space-y-3">
          <Alert
            type="Warning"
            title="Carrier restrictions apply"
            message="The following items are restricted for this shipment:"
            items={[
              'Lithium batteries over 100 Wh',
              'Flammable liquids and aerosols',
              'Sharp objects without protective packaging',
            ]}
          />
          <Alert
            type="Danger"
            title="Label generation failed"
            message="Please fix the following errors before continuing:"
            items={[
              'Recipient ZIP code is invalid',
              'Package weight exceeds carrier limit (150 lbs)',
              'Origin address is incomplete — suite or unit required',
            ]}
          />
        </div>
      </div>

      {/* Code snippets */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Warning — simple',
              code: `<div class="rounded-xl p-4 flex gap-3 bg-amber-50 border border-amber-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
    <span class="text-white text-xs font-bold">!</span>
  </div>
  <p class="text-sm text-amber-800 leading-snug">Message here.</p>
</div>`,
            },
            {
              label: 'Danger — simple',
              code: `<div class="rounded-xl p-4 flex gap-3 bg-red-50 border border-red-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  </div>
  <p class="text-sm text-red-800 leading-snug">Message here.</p>
</div>`,
            },
            {
              label: 'Warning — with title + list',
              code: `<div class="rounded-xl p-4 flex gap-3 bg-amber-50 border border-amber-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
    <span class="text-white text-xs font-bold">!</span>
  </div>
  <div class="flex flex-col gap-1">
    <p class="text-sm font-semibold text-amber-800">Title here</p>
    <p class="text-sm text-amber-800 leading-snug">Description of the issue:</p>
    <ul class="mt-1 flex flex-col gap-1">
      <li class="flex items-start gap-2 text-sm text-amber-800">
        <span class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        First item
      </li>
      <li class="flex items-start gap-2 text-sm text-amber-800">
        <span class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        Second item
      </li>
    </ul>
  </div>
</div>`,
            },
            {
              label: 'Danger — with title + list',
              code: `<div class="rounded-xl p-4 flex gap-3 bg-red-50 border border-red-200">
  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="flex flex-col gap-1">
    <p class="text-sm font-semibold text-red-800">Title here</p>
    <p class="text-sm text-red-800 leading-snug">Please fix the following errors:</p>
    <ul class="mt-1 flex flex-col gap-1">
      <li class="flex items-start gap-2 text-sm text-red-800">
        <span class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-600"></span>
        First error
      </li>
    </ul>
  </div>
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
        code: `<!-- Alert component — 4 types -->
<!-- Warning: bg-amber-50 border-amber-200, icon bg-amber-400 -->
<!-- Danger:  bg-red-50   border-red-200,   icon bg-red-600   -->
<!-- Success: bg-green-50 border-green-200,  icon bg-green-600 -->
<!-- Info:    bg-blue-50  border-blue-200,   icon bg-blue-600  -->`,
      },
    },
  },
};
