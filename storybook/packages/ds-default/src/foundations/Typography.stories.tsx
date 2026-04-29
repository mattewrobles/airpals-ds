import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'All typography tokens from Prism. Sizes, weights, and line-heights are shown as live samples rendered using CSS custom properties.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* ---- Font size steps ---- */
type FontStep = {
  token: string;
  name: string;
  remValue: string;
  pxValue: number;
};

const FONT_STEPS: FontStep[] = [
  { token: '--font-size-xs', name: 'xs', remValue: '0.75rem', pxValue: 12 },
  { token: '--font-size-sm', name: 'sm', remValue: '0.875rem', pxValue: 14 },
  { token: '--font-size-base', name: 'base', remValue: '1rem', pxValue: 16 },
  { token: '--font-size-lg', name: 'lg', remValue: '1.125rem', pxValue: 18 },
  { token: '--font-size-xl', name: 'xl', remValue: '1.25rem', pxValue: 20 },
  { token: '--font-size-2xl', name: '2xl', remValue: '1.5rem', pxValue: 24 },
  { token: '--font-size-3xl', name: '3xl', remValue: '1.875rem', pxValue: 30 },
  { token: '--font-size-4xl', name: '4xl', remValue: '2.25rem', pxValue: 36 },
  { token: '--font-size-5xl', name: '5xl', remValue: '3rem', pxValue: 48 },
];

type WeightStep = { token: string; name: string; value: number };

const WEIGHT_STEPS: WeightStep[] = [
  { token: '--font-weight-regular', name: 'regular', value: 400 },
  { token: '--font-weight-medium', name: 'medium', value: 500 },
  { token: '--font-weight-semibold', name: 'semibold', value: 600 },
  { token: '--font-weight-bold', name: 'bold', value: 700 },
];

/* ---- Font Size Row ---- */
const FontSizeRow: React.FC<{ step: FontStep }> = ({ step }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [computedPx, setComputedPx] = useState<string>('');

  useEffect(() => {
    if (ref.current) {
      const px = getComputedStyle(ref.current).fontSize;
      setComputedPx(px);
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ width: '200px', flexShrink: 0 }}>
        <p
          ref={ref}
          style={{
            margin: 0,
            fontSize: `var(${step.token})`,
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--text-primary)',
            lineHeight: 'var(--line-height-tight)',
          }}
        >
          Aa
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <code style={{ fontSize: '12px', color: 'var(--text-link)', fontFamily: 'monospace' }}>
          {step.token}
        </code>
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
          {step.remValue} · {computedPx || `${step.pxValue}px`}
        </span>
      </div>
      <div style={{ flexGrow: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: `var(${step.token})`,
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--line-height-base)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  );
};

/* ---- Weight Row ---- */
const WeightRow: React.FC<{ step: WeightStep }> = ({ step }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid var(--border-subtle)',
    }}
  >
    <div style={{ width: '200px', flexShrink: 0 }}>
      <p
        style={{
          margin: 0,
          fontSize: 'var(--font-size-xl)',
          fontFamily: 'var(--font-family-base)',
          fontWeight: `var(${step.token})`,
          color: 'var(--text-primary)',
          lineHeight: 'var(--line-height-tight)',
        }}
      >
        {step.name.charAt(0).toUpperCase() + step.name.slice(1)}
      </p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <code style={{ fontSize: '12px', color: 'var(--text-link)', fontFamily: 'monospace' }}>
        {step.token}
      </code>
      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
        font-weight: {step.value}
      </span>
    </div>
    <div style={{ flexGrow: 1 }}>
      <p
        style={{
          margin: 0,
          fontSize: 'var(--font-size-base)',
          fontFamily: 'var(--font-family-base)',
          fontWeight: `var(${step.token})`,
          color: 'var(--text-secondary)',
        }}
      >
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  </div>
);

/* =========================================================
   STORIES
   ========================================================= */

export const FontSizes: Story = {
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
        Font Sizes
      </h2>
      <p
        style={{
          margin: '0 0 24px',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Token: <code>--font-size-&#123;step&#125;</code>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {FONT_STEPS.map((step) => (
          <FontSizeRow key={step.token} step={step} />
        ))}
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
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
        Font Weights
      </h2>
      <p
        style={{
          margin: '0 0 24px',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Token: <code>--font-weight-&#123;name&#125;</code>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {WEIGHT_STEPS.map((step) => (
          <WeightRow key={step.token} step={step} />
        ))}
      </div>
    </div>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2
        style={{
          margin: '0 0 8px',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        Line Heights
      </h2>
      <div style={{ display: 'flex', gap: '48px', marginTop: '24px' }}>
        {[
          { token: '--line-height-tight', name: 'tight', value: '1.25' },
          { token: '--line-height-base', name: 'base', value: '1.5' },
        ].map((lh) => (
          <div key={lh.token} style={{ maxWidth: '260px' }}>
            <code
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'var(--text-link)',
                fontFamily: 'monospace',
                marginBottom: '4px',
              }}
            >
              {lh.token}
            </code>
            <span
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                fontFamily: 'monospace',
                marginBottom: '12px',
              }}
            >
              line-height: {lh.value}
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--font-size-base)',
                fontFamily: 'var(--font-family-base)',
                lineHeight: `var(${lh.token})`,
                color: 'var(--text-primary)',
                padding: '12px',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
              }}
            >
              The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor
              jugs. How vexingly quick daft zebras jump!
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};
