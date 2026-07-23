import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'Foundations/Getting Started',
  parameters: {
    docs: { page: null },
    controls: { disable: true },
    actions: { disable: true },
  },
};
export default meta;
type Story = StoryObj;

/* ── Helpers ─────────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors select-none"
    >
      {copied ? '✓ copied' : 'copy'}
    </button>
  );
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-700">
      {label && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-[11px] font-mono text-slate-400">{label}</span>
          <CopyButton text={code} />
        </div>
      )}
      <pre className="bg-slate-900 text-slate-100 text-sm font-mono px-4 py-3 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-base font-semibold text-brand-navy dark:text-slate-50">{title}</h2>
      {children}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0043ff] text-white text-xs font-bold flex items-center justify-center">{n}</div>
      <div className="flex-1 space-y-2 pt-0.5">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        {children}
      </div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 bg-[#e6f1fd] rounded-lg px-4 py-3">
      <span className="text-[#0043ff] text-sm">ℹ</span>
      <p className="text-sm text-[#1b306c] leading-5">{children}</p>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono px-2 py-0.5 rounded">{children}</span>
  );
}

/* ── Story ───────────────────────────────────────────────── */

export const Docs: Story = {
  name: 'Getting Started',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body max-w-2xl space-y-10">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50">Getting Started</h1>
          <span className="text-xs font-mono bg-[#e6f1fd] text-[#0043ff] px-2 py-0.5 rounded-full">v0.5.6</span>
        </div>
        <p className="text-sm text-slate-500 leading-6">
          Airpals Design System — React components built with Tailwind CSS.
          Compatible with Vite, Next.js (App Router), and any React 17+ setup.
        </p>
      </div>

      {/* Installation */}
      <Section title="Installation">
        <Step n={1} title="Install the package + peer dependencies">
          <CodeBlock label="yarn" code="yarn add airpals-ds @heroicons/react @fontsource/inter @fontsource/lexend" />
          <p className="text-xs text-slate-400 mt-1">
            <Pill>@heroicons/react</Pill> is required — icons are not bundled. <Pill>@fontsource/inter</Pill> and <Pill>@fontsource/lexend</Pill> are required for correct typography.
          </p>
        </Step>
        <Step n={2} title="Import and use">
          <CodeBlock
            label="MyComponent.tsx"
            code={`import { Button, Badge, Input } from 'airpals-ds';\n\nexport function MyComponent() {\n  return <Button label="New Shipment" />;\n}`}
          />
        </Step>
      </Section>

      {/* Next.js */}
      <Section title="Next.js (App Router)">
        <Note>
          All components include the <Pill>"use client"</Pill> directive — they work out of the box in the App Router without extra setup.
        </Note>
        <Step n={1} title="Add transpilePackages to next.config.ts">
          <CodeBlock
            label="next.config.ts"
            code={`import type { NextConfig } from 'next';\n\nconst nextConfig: NextConfig = {\n  transpilePackages: ['airpals-ds'],\n};\n\nexport default nextConfig;`}
          />
        </Step>
        <Step n={2} title="Configure globals.css — font imports must come before Tailwind">
          <Note>
            Font imports <strong>must</strong> come before <Pill>@import "tailwindcss"</Pill> — Tailwind v4 processes them in order. The <Pill>@source</Pill> must point to the compiled file, not the folder (Turbopack requirement).
          </Note>
          <CodeBlock
            label="app/globals.css"
            code={`@import "@fontsource/inter/400.css";\n@import "@fontsource/inter/500.css";\n@import "@fontsource/inter/600.css";\n@import "@fontsource/inter/700.css";\n@import "@fontsource/lexend/400.css";\n@import "@fontsource/lexend/600.css";\n@import "@fontsource/lexend/700.css";\n\n@import "tailwindcss";\n@source "../node_modules/airpals-ds/dist/index.mjs";`}
          />
        </Step>
        <Step n={3} title="Import normally in any Server or Client component">
          <CodeBlock
            label="app/page.tsx"
            code={`import { Button, Alert } from 'airpals-ds';\n\nexport default function Page() {\n  return (\n    <main>\n      <Alert type="Warning" title="Heads up" description="Check your shipment." />\n      <Button label="View details" />\n    </main>\n  );\n}`}
          />
        </Step>
      </Section>

      {/* TypeScript */}
      <Section title="TypeScript">
        <p className="text-sm text-slate-600 dark:text-slate-400">Types are included — no <Pill>@types/airpals-ds</Pill> needed.</p>
        <CodeBlock
          label=""
          code={`import type { ButtonProps, BadgeProps } from 'airpals-ds';`}
        />
        <Note>
          If your tsconfig uses <Pill>"moduleResolution": "bundler"</Pill> or <Pill>"node16"</Pill>, types resolve automatically via the <Pill>exports</Pill> field.
        </Note>
      </Section>

      {/* Copy-paste */}
      <Section title="Copy & edit a component">
        <Note>
          Since <Pill>v0.2.1</Pill> the source <Pill>.tsx</Pill> files are included in the package.
          If you need to customize a component, copy it into your project instead of editing <Pill>node_modules</Pill>.
        </Note>
        <Step n={1} title="Find the source in node_modules">
          <CodeBlock
            label="terminal"
            code={`ls node_modules/airpals-ds/src/lib/\n# Button.tsx  Input.tsx  Toggle.tsx  ...`}
          />
        </Step>
        <Step n={2} title="Copy it into your project">
          <CodeBlock
            label="terminal"
            code={`cp node_modules/airpals-ds/src/lib/Button.tsx src/components/Button.tsx`}
          />
        </Step>
        <Step n={3} title="Update the import and edit freely">
          <CodeBlock
            label="MyComponent.tsx"
            code={`// before\nimport { Button } from 'airpals-ds';\n\n// after — now it's yours\nimport { Button } from '@/components/Button';`}
          />
        </Step>
        <p className="text-xs text-slate-400">The rest of the components still come from the npm package. Only override what you need.</p>
      </Section>

      {/* Contributing */}
      <Section title="Contributing to the DS">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-6">
          The DS repo uses <Pill>yarn</Pill>. Clone and install:
        </p>
        <CodeBlock
          label="terminal"
          code={`git clone https://github.com/mattewrobles/prism-ds\ncd prism-ds/storybook/packages/airpals-ds\nyarn install`}
        />
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Dev</p>
            <CodeBlock code="yarn storybook" />
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Build lib</p>
            <CodeBlock code="yarn build:lib" />
          </div>
        </div>
        <Note>
          Storybook runs on port 6007. Any push to <Pill>main</Pill> triggers a Chromatic build automatically.
        </Note>
      </Section>

      {/* Components */}
      <Section title="Available components">
        <div className="flex flex-wrap gap-2">
          {['Alert','Avatar','AvatarGroup','Badge','Breadcrumbs','Button','Checkbox',
            'ClickableLink','Dropdown','Footer','Input','Logo','Navbar','Pagination','RadioButton',
            'SplitButton','Tag','Textarea','Toggle','ToggleWithText'].map(c => (
            <Pill key={c}>{c}</Pill>
          ))}
        </div>
        <p className="text-xs text-slate-400">Each component has a dedicated story with props, usage code, and a Figma link.</p>
      </Section>

    </div>
  ),
};
