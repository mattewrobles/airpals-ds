"use client";

import React, { useState } from 'react';
import { Stepper } from './Stepper';

// Figma 745-9014 — DataCard (Normal 202px / Vertical 483px / Horizontal 631px)
// bg white, shadow xs (0 1px 1px rgba(0,0,0,0.05)), rounded-10

export type DataCardLayout = 'Normal' | 'Vertical' | 'Horizontal';

export type DataCardProps = {
  layout?: DataCardLayout;
  title?: string;
  content?: string;
  data?: string;
  imageUrl?: string;
  showImage?: boolean;
  showContent?: boolean;
  showData?: boolean;
  defaultCount?: number;
  className?: string;
};

// ─── Thumbnail ───────────────────────────────────────────────────────────────

function Thumbnail({ imageUrl, size }: { imageUrl?: string; size: number }) {
  return imageUrl ? (
    <img
      src={imageUrl} alt=""
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
    />
  ) : (
    // placeholder gradient matching Figma DS illustration style
    <div style={{
      width: size, height: size, flexShrink: 0,
      background: 'linear-gradient(135deg, #e6f1fd 0%, #b4d5ff 100%)',
      borderRadius: 4,
    }} />
  );
}

// ─── DataCard ────────────────────────────────────────────────────────────────

export function DataCard({
  layout = 'Normal',
  title = 'Motorbike',
  content = 'Gifts, documents, tech devices',
  data = '30 LBS MAX',
  imageUrl,
  showImage = true,
  showContent = true,
  showData = true,
  defaultCount = 0,
  className = '',
}: DataCardProps) {
  const [count, setCount] = useState(defaultCount);

  const cardBase: React.CSSProperties = {
    backgroundColor: '#ffffff',
    boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
    borderRadius: 10,
    boxSizing: 'border-box',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'Lexend, sans-serif', fontWeight: 600,
    fontSize: 18, lineHeight: '24px', color: '#1b306c',
  };

  const contentStyle: React.CSSProperties = {
    fontFamily: 'Inter', fontWeight: 400,
    fontSize: 14, lineHeight: '20px', color: '#1b306c',
  };

  const dataStyle: React.CSSProperties = {
    fontFamily: 'Inter', fontWeight: 500,
    fontSize: 12, lineHeight: '16px', color: '#1b306c',
    textAlign: 'center', whiteSpace: 'nowrap',
  };

  // Normal — vertical card 202px wide
  if (layout === 'Normal') {
    return (
      <div style={{ ...cardBase, width: 202, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '12px 36px' }} className={className}>
        <span style={{ ...titleStyle, textAlign: 'center' }}>{title}</span>
        {showImage && <Thumbnail imageUrl={imageUrl} size={76} />}
        {showContent && <span style={{ ...contentStyle, textAlign: 'center' }}>{content}</span>}
        <Stepper value={count} min={0} onChange={setCount} className="w-full" />
        {showData && <span style={dataStyle}>{data}</span>}
      </div>
    );
  }

  // Vertical — 483px, image left + content center + data + stepper right
  if (layout === 'Vertical') {
    return (
      <div style={{ ...cardBase, width: 483, display: 'flex', alignItems: 'center', gap: 32, padding: 20 }} className={className}>
        {showImage && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Thumbnail imageUrl={imageUrl} size={56} />
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <span style={titleStyle}>{title}</span>
          {showContent && <span style={contentStyle}>{content}</span>}
        </div>
        {showData && <span style={dataStyle}>{data}</span>}
        <Stepper value={count} min={0} onChange={setCount} />
      </div>
    );
  }

  // Horizontal — 631px, image + title/content in row + data + stepper
  return (
    <div style={{ ...cardBase, width: 631, display: 'flex', alignItems: 'center', gap: 32, padding: 20 }} className={className}>
      {showImage && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Thumbnail imageUrl={imageUrl} size={56} />
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 32, minWidth: 0 }}>
        <span style={{ ...titleStyle, flex: 1, minWidth: 0 }}>{title}</span>
        {showContent && <span style={{ ...contentStyle, flex: 1, minWidth: 0 }}>{content}</span>}
      </div>
      {showData && <span style={dataStyle}>{data}</span>}
      <Stepper value={count} min={0} onChange={setCount} />
    </div>
  );
}
