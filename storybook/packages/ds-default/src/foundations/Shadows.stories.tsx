import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Shadows',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'All shadow tokens from Prism. Each card demonstrates the shadow at that elevation level.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

type ShadowStep = {
  token: string;
  name: string;
  description: string;
};

const SHADOW_STEPS: ShadowStep[] = [
  {
    token: '--shadow-sm',
    name: 'sm',
    description: 'Subtle — use for input fields, chips, or small interactive elements',
  },
  {
    token: '--shadow-md',
    name: 'md',
    description: 'Medium — use for cards, dropdowns, and floating panels',
  },
  {
    token: '--shadow-lg',
    name: 'lg',
    description: 'Strong — use for modals, dialogs, and elements that float above content',
  },
];

const ShadowCard: React.FC<{ step: ShadowStep }> = ({ step }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'flex-start',
    }}
  >
    {/* Demo card with shadow */}
    <div
      style={{
        width: '200px',
        height: '120px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: `var(${step.token})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize: 'var(--font-size-sm)',
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--text-secondary)',
        }}
      >
        shadow-{step.name}
      </span>
    </div>

    {/* Token info */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <code
        style={{
          fontSize: '12px',
          color: 'var(--text-link)',
          fontFamily: 'monospace',
        }}
      >
        {step.token}
      </code>
      <span
        style={{
          fontSize: '11px',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-family-base)',
          maxWidth: '200px',
          lineHeight: 'var(--line-height-base)',
        }}
      >
        {step.description}
      </span>
    </div>
  </div>
);

export const AllShadows: Story = {
  render: () => (
    <div style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: '0px' }}>
      <h2
        style={{
          margin: '0 0 8px',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Shadow Scale
      </h2>
      <p
        style={{
          margin: '0 0 48px',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Token: <code>--shadow-&#123;sm|md|lg&#125;</code> — adapts automatically between light and dark
        mode
      </p>
      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {SHADOW_STEPS.map((step) => (
          <ShadowCard key={step.token} step={step} />
        ))}
      </div>
    </div>
  ),
};

export const ShadowsOnSurfaces: Story = {
  name: 'On Surfaces',
  render: () => (
    <div
      style={{
        padding: '48px 24px',
        background: 'var(--bg-default)',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Shadows on Default Background
      </h2>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {SHADOW_STEPS.map((step) => (
          <div
            key={step.token}
            style={{
              padding: 'var(--spacing-md)',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: `var(${step.token})`,
              minWidth: '160px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 'var(--font-size-sm)',
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)',
              }}
            >
              {step.name}
            </p>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'monospace',
                color: 'var(--text-tertiary)',
              }}
            >
              {step.token}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};
