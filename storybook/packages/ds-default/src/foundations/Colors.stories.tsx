import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'All color tokens exported by Prism. Primitive ramps (left) feed into semantic tokens (right). Actual rendered values are read from computed CSS custom properties.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* ---- Helpers ---- */
const getCSSVar = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

type Ramp = { name: string; steps: number[] };

const COLOR_RAMPS: Ramp[] = [
  { name: 'indigo', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'neutral', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'red', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'green', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'amber', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: 'blue', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
];

type SemanticGroup = { group: string; tokens: string[] };

const SEMANTIC_GROUPS: SemanticGroup[] = [
  {
    group: 'Text',
    tokens: [
      '--text-primary',
      '--text-secondary',
      '--text-tertiary',
      '--text-disabled',
      '--text-inverse',
      '--text-on-primary',
      '--text-link',
      '--text-error',
    ],
  },
  {
    group: 'Background',
    tokens: [
      '--bg-default',
      '--bg-surface',
      '--bg-card',
      '--bg-sunken',
      '--bg-primary',
      '--bg-primary-hover',
      '--bg-primary-subtle',
    ],
  },
  {
    group: 'Border',
    tokens: [
      '--border-default',
      '--border-strong',
      '--border-subtle',
      '--border-focus',
      '--border-error',
    ],
  },
  {
    group: 'Icon',
    tokens: ['--icon-default', '--icon-primary', '--icon-error'],
  },
  {
    group: 'Button',
    tokens: [
      '--button-primary-bg',
      '--button-primary-bg-hover',
      '--button-primary-text',
      '--button-secondary-bg',
      '--button-secondary-bg-hover',
      '--button-secondary-text',
      '--button-destructive-bg',
      '--button-destructive-bg-hover',
      '--button-destructive-text',
      '--button-ghost-text',
    ],
  },
];

/* ---- Swatch ---- */
const Swatch: React.FC<{ token: string; label: string }> = ({ token, label }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(getCSSVar(token));
  }, [token]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '6px',
          background: `var(${token})`,
          border: '1px solid rgba(0,0,0,0.08)',
          flexShrink: 0,
        }}
        title={`${token}: ${value}`}
      />
      <span
        style={{
          fontSize: '10px',
          fontFamily: 'monospace',
          color: 'var(--text-tertiary)',
          maxWidth: '52px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
};

/* ---- Ramp row ---- */
const RampRow: React.FC<{ ramp: Ramp }> = ({ ramp }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <span
      style={{
        fontSize: '12px',
        fontFamily: 'monospace',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '4px',
        textTransform: 'capitalize',
      }}
    >
      {ramp.name}
    </span>
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {ramp.steps.map((step) => (
        <Swatch
          key={step}
          token={`--color-${ramp.name}-${step}`}
          label={String(step)}
        />
      ))}
    </div>
  </div>
);

/* ---- Semantic group ---- */
const SemanticGroupSection: React.FC<{ group: SemanticGroup }> = ({ group }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <span
      style={{
        fontSize: '12px',
        fontFamily: 'monospace',
        fontWeight: 600,
        color: 'var(--text-primary)',
      }}
    >
      {group.group}
    </span>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {group.tokens.map((token) => (
        <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              background: `var(${token})`,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
            title={token}
          />
          <span
            style={{
              fontSize: '9px',
              fontFamily: 'monospace',
              color: 'var(--text-tertiary)',
              maxWidth: '52px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {token.replace('--', '')}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* =========================================================
   STORIES
   ========================================================= */

export const PrimitiveRamps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h2
        style={{
          margin: 0,
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Primitive Color Ramps
      </h2>
      <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-family-base)' }}>
        Token: <code>--color-&#123;ramp&#125;-&#123;step&#125;</code>
      </p>
      {COLOR_RAMPS.map((ramp) => (
        <RampRow key={ramp.name} ramp={ramp} />
      ))}
    </div>
  ),
};

export const SemanticTokens: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
      <h2
        style={{
          margin: 0,
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Semantic Color Tokens
      </h2>
      <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-family-base)' }}>
        Semantic tokens adapt between light and dark mode. Toggle the theme in the toolbar above.
      </p>
      {SEMANTIC_GROUPS.map((group) => (
        <SemanticGroupSection key={group.group} group={group} />
      ))}
    </div>
  ),
};
