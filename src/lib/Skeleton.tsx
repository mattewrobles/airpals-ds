"use client";

import React from 'react';

// Skeleton — loading placeholder with shimmer animation
// Shapes: rect (default), circle, text, card
// Composable: use directly or nest inside SkeletonCard

export type SkeletonShape = 'rect' | 'circle' | 'text';

export type SkeletonProps = {
  shape?: SkeletonShape;
  width?: number | string;
  height?: number | string;
  lines?: number;        // for shape='text': number of text lines
  className?: string;
  style?: React.CSSProperties;
};

// shimmer keyframes injected once
const SHIMMER_ID = 'airpals-skeleton-shimmer';

function injectShimmer() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(SHIMMER_ID)) return;
  const style = document.createElement('style');
  style.id = SHIMMER_ID;
  style.textContent = `
    @keyframes airpals-shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    .airpals-skeleton {
      background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
      background-size: 800px 100%;
      animation: airpals-shimmer 1.4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

export function Skeleton({
  shape = 'rect',
  width,
  height,
  lines = 3,
  className = '',
  style,
}: SkeletonProps) {
  React.useEffect(() => { injectShimmer(); }, []);

  if (shape === 'circle') {
    const size = width ?? height ?? 40;
    return (
      <div
        className={`airpals-skeleton ${className}`}
        style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, ...style }}
        aria-hidden="true"
      />
    );
  }

  if (shape === 'text') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: width ?? '100%', ...style }} className={className} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="airpals-skeleton"
            style={{
              height: height ?? 16,
              borderRadius: 4,
              width: i === lines - 1 && lines > 1 ? '65%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  // rect (default)
  return (
    <div
      className={`airpals-skeleton ${className}`}
      style={{
        width: width ?? '100%',
        height: height ?? 20,
        borderRadius: 6,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

// SkeletonCard — pre-composed skeleton matching DataCard layout
export function SkeletonCard({ className = '' }: { className?: string }) {
  React.useEffect(() => { injectShimmer(); }, []);
  return (
    <div
      className={className}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 10,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
        maxWidth: 240,
        boxSizing: 'border-box',
      }}
      aria-hidden="true"
    >
      {/* Label */}
      <Skeleton shape="rect" width="50%" height={12} />
      {/* Big number */}
      <Skeleton shape="rect" width="70%" height={32} />
      {/* Subtext */}
      <Skeleton shape="rect" width="85%" height={12} />
    </div>
  );
}

// SkeletonTableRow — one loading row matching Table layout
export function SkeletonTableRow({ columns = 5, className = '' }: { columns?: number; className?: string }) {
  React.useEffect(() => { injectShimmer(); }, []);
  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: '1px solid #e5e7eb', overflow: 'hidden' }}
      aria-hidden="true"
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} style={{ flex: '1 1 0', minWidth: 0, padding: '10px 12px' }}>
          <Skeleton shape="rect" height={16} width={i === 0 ? '60%' : '80%'} />
        </div>
      ))}
    </div>
  );
}
