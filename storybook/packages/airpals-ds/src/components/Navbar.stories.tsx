import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';

/* ── Component ───────────────────────────────────────────── */
/*
  Figma specs (file 3oMpon9bh8T8d0hFQt7l2g):
  key: 3a3f1b66137b2a2319c8482b6c2f6e4f19f0f403
  3 variants — Mobile: True/False · Collapsed: True/False
  Desktop: 1440px wide · h-[108px]
  Mobile: 390px · h-[64px] with hamburger
  Logo: Airpals wordmark (navy)
  Nav links: text-sm text-[#1b306c] hover:text-[#0043ff]
  CTA button: "Dashboard →" bg-[#0043ff] text-white rounded-lg px-4 py-2
  Services dropdown indicator: chevron-down icon
*/

type NavbarProps = {
  mobile?: boolean;
  collapsed?: boolean;
};

const HAMBURGER = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const X_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CHEVRON_DOWN = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline ml-0.5">
    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AIRPALS_LOGO = (
  <span className="font-bold text-xl text-[#1b306c] tracking-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
    airpals
  </span>
);

const NAV_LINKS = ['Services', 'About Us', 'For Companies', 'Pricing', 'Contact Us'];

function Navbar({ mobile = false, collapsed = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(!collapsed);

  if (mobile) {
    return (
      <nav className="font-body bg-white border-b border-slate-200 w-[390px]">
        <div className="flex items-center justify-between px-4 h-16">
          {AIRPALS_LOGO}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-[#1b306c] p-1"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? X_ICON : HAMBURGER}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="flex items-center py-3 text-sm font-medium text-[#1b306c] hover:text-[#0043ff] border-b border-slate-100 last:border-0 transition-colors"
              >
                {link}
                {link === 'Services' && <span className="ml-auto">{CHEVRON_DOWN}</span>}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="#"
                className="flex items-center justify-center w-full bg-[#0043ff] text-white text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors"
              >
                Dashboard →
              </a>
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className="font-body bg-white border-b border-slate-200 w-full">
      <div className="max-w-[1440px] mx-auto px-8 h-[108px] flex items-center justify-between gap-8">
        <div className="flex-shrink-0">
          {AIRPALS_LOGO}
        </div>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-[#1b306c] hover:text-[#0043ff] whitespace-nowrap transition-colors"
            >
              {link}
              {link === 'Services' && CHEVRON_DOWN}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="text-sm text-slate-500 hover:text-[#1b306c] transition-colors">
            Search...
          </button>
          <a
            href="#"
            className="bg-[#0043ff] text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Dashboard →
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    mobile:    { control: 'boolean' },
    collapsed: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `3a3f1b66137b2a2319c8482b6c2f6e4f19f0f403` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '3 variants — `Mobile` (True/False) × `Collapsed` (True/False).',
          '',
          '| Variant | Size | Notes |',
          '|---------|------|-------|',
          '| Desktop | 1440×108px | Logo + nav links + search + CTA |',
          '| Mobile | 390×64px | Logo + hamburger |',
          '| Mobile expanded | 390×auto | Full nav menu dropdown |',
          '',
          'CTA button: `bg-[#0043ff] text-white rounded-lg` — "Dashboard →"',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Navbar>;

/* ── Stories ─────────────────────────────────────────────── */

export const Desktop: Story = { args: { mobile: false } };
export const MobileCollapsed: Story = { name: 'Mobile — Collapsed', args: { mobile: true, collapsed: true } };
export const MobileExpanded: Story = { name: 'Mobile — Expanded', args: { mobile: true, collapsed: false } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-slate-50 font-body space-y-8 pb-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide px-8 pt-8 pb-3">Desktop (1440px)</p>
        <Navbar mobile={false} />
      </div>

      <div className="px-8">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Mobile — Collapsed</p>
        <Navbar mobile={true} collapsed={true} />
      </div>

      <div className="px-8">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Mobile — Expanded</p>
        <Navbar mobile={true} collapsed={false} />
      </div>

      <div className="px-8">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet — Desktop</p>
        <CodeBlock
          code={`<nav class="bg-white border-b border-slate-200 w-full">
  <div class="max-w-[1440px] mx-auto px-8 h-[108px] flex items-center justify-between gap-8">
    <span class="font-bold text-xl text-[#1b306c]">airpals</span>
    <div class="flex items-center gap-6">
      <a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff]">Services ▾</a>
      <a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff]">About Us</a>
      <a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff]">For Companies</a>
      <a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff]">Pricing</a>
    </div>
    <a href="#" class="bg-[#0043ff] text-white text-sm font-medium rounded-lg px-4 py-2">Dashboard →</a>
  </div>
</nav>`}
          jsx={`<Navbar mobile={false} />`}
        />
      </div>
    </div>
  ),
};
