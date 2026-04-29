import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Spacing',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'All spacing tokens from Prism. Each bar visualizes the spacing value as its width. Token: --spacing-{name}',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

type SpacingStep = {
  token: string;
  name: string;
  value: string;
};

const SPACING_STEPS: SpacingStep[] = [
  { token: '--spacing-none', name: 'none', value: '0px' },
  { token: '--spacing-xs', name: 'xs', value: '4px' },
  { token: '--spacing-sm', name: 'sm', value: '8px' },
  { token: '--spacing-md', name: 'md', value: '16px' },
  { token: '--spacing-lg', name: 'lg', value: '24px' },
  { token: '--spacing-xl', name: 'xl', value: '32px' },
  { token: '--spacing-2xl', name: '2xl', value: '48px' },
  { token: '--spacing-3xl', name: '3xl', value: '64px' },
];

const SpacingRow: React.FC<{ step: SpacingStep }> = ({ step }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      paddingBottom: '12px',
      borderBottom: '1px solid var(--border-subtle)',
    }}
  >
    {/* Token info */}
    <div style={{ width: '180px', flexShrink: 0 }}>
      <code
        style={{
          display: 'block',
          fontSize: '12px',
          color: 'var(--text-link)',
          fontFamily: 'monospace',
        }}
      >
        {step.token}
      </code>
      <span
        style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          fontFamily: 'monospace',
        }}
      >
        {step.value}
      </span>
    </div>

    {/* Visual bar */}
    <div
      style={{
        height: '24px',
        width: `var(${step.token})`,
        minWidth: step.value === '0px' ? '2px' : undefined,
        backgroundColor:
          step.value === '0px' ? 'var(--border-default)' : 'var(--bg-primary)',
        borderRadius: 'var(--radius-sm)',
        flexShrink: 0,
      }}
    />

    {/* Name tag */}
    <span
      style={{
        fontSize: '12px',
        color: 'var(--text-tertiary)',
        fontFamily: 'monospace',
      }}
    >
      {step.name}
    </span>
  </div>
);

export const AllSpacing: Story = {
  render: () => (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '0px' }}>
      <h2
        style={{
          margin: '0 0 8px',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Spacing Scale
      </h2>
      <p
        style={{
          margin: '0 0 24px',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Token: <code>--spacing-&#123;name&#125;</code> — bar width equals the spacing value
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {SPACING_STEPS.map((step) => (
          <SpacingRow key={step.token} step={step} />
        ))}
      </div>
    </div>
  ),
};

export const SpacingInContext: Story = {
  name: 'In Context',
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2
        style={{
          margin: '0 0 24px',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Spacing in Context
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {SPACING_STEPS.filter((s) => s.value !== '0px').map((step) => (
          <div key={step.token} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                fontFamily: 'monospace',
                width: '60px',
                flexShrink: 0,
              }}
            >
              {step.value}
            </span>
            <div
              style={{
                display: 'flex',
                gap: `var(${step.token})`,
                padding: '8px',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'var(--bg-primary-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-focus)',
                  }}
                />
              ))}
            </div>
            <code
              style={{ fontSize: '11px', color: 'var(--text-link)', fontFamily: 'monospace' }}
            >
              {step.token}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
};
