"use client";

import React from 'react';

// Figma 625-2011 — Badge
// Props: color, state (Fill/Outline/Duo Tone), round, dot, text
// Dot = 6px colored circle

export type BadgeColor = 'Primary' | 'Secondary' | 'Dark' | 'Gray' | 'Light' | 'Warning' | 'Danger' | 'Success' | 'Info';
export type BadgeVariant = 'Fill' | 'Outline' | 'Duo Tone';
export type BadgeShape = 'Semi' | 'Full'; // legacy

export type BadgeProps = {
  text?: string;
  label?: string;       // legacy alias for text
  color?: BadgeColor;
  state?: BadgeVariant;
  variant?: BadgeVariant; // legacy alias for state
  round?: boolean;
  shape?: BadgeShape;   // legacy: Full=round, Semi=square
  dot?: boolean;
  className?: string;
};

type Spec = { bg?: string; border?: string; text: string; dot: string };

const COLORS: Record<BadgeColor, { fill: Spec; outline: Spec; duo: Spec }> = {
  Primary: {
    fill:    { bg: '#0043ff',               text: '#ffffff', dot: '#ffffff' },
    outline: { border: '#0043ff',           text: '#0043ff', dot: '#0043ff' },
    duo:     { bg: 'rgba(67,97,255,0.1)',   text: '#0043ff', dot: '#0043ff' },
  },
  Secondary: {
    fill:    { bg: '#fc4575',               text: '#ffffff', dot: '#ffffff' },
    outline: { border: '#fc4575',           text: '#fc4575', dot: '#fc4575' },
    duo:     { bg: 'rgba(252,69,117,0.1)', text: '#1b306c', dot: '#fc4575' },
  },
  Dark: {
    fill:    { bg: '#0a0a0a',              text: '#ffffff', dot: '#ffffff' },
    outline: { border: '#0a0a0a',          text: '#0a0a0a', dot: '#0a0a0a' },
    duo:     { bg: 'rgba(33,43,54,0.1)',   text: '#0a0a0a', dot: '#0a0a0a' },
  },
  Gray: {
    fill:    { bg: '#637381',              text: '#ffffff', dot: '#ffffff' },
    outline: { border: '#637381',          text: '#637381', dot: '#637381' },
    duo:     { bg: 'rgba(99,115,129,0.1)', text: '#637381', dot: '#637381' },
  },
  Light: {
    fill:    { bg: '#f3f4f6',              text: '#0a0a0a', dot: '#0a0a0a' },
    outline: { border: '#e5e7eb',          text: '#0a0a0a', dot: '#0a0a0a' },
    duo:     { bg: '#f3f4f6',              text: '#374151', dot: '#374151' },
  },
  Warning: {
    fill:    { bg: '#f59e0b',              text: '#ffffff', dot: '#ffffff' },
    outline: { border: '#f59e0b',          text: '#f59e0b', dot: '#f59e0b' },
    duo:     { bg: '#fffbeb',              text: '#b45309', dot: '#f59e0b' },
  },
  Danger: {
    fill:    { bg: '#ef4444',              text: '#ffffff', dot: '#ffffff' },
    outline: { border: '#ef4444',          text: '#ef4444', dot: '#ef4444' },
    duo:     { bg: '#fdeeec',              text: '#1b306c', dot: '#ef4444' },
  },
  Success: {
    fill:    { bg: '#22ad5c',              text: '#ffffff', dot: '#ffffff' },
    outline: { border: '#22ad5c',          text: '#22ad5c', dot: '#22ad5c' },
    duo:     { bg: '#e9fcf4',              text: '#1b306c', dot: '#22ad5c' },
  },
  Info: {
    fill:    { bg: '#00a0ff',              text: '#ffffff', dot: '#ffffff' },
    outline: { border: '#00a0ff',          text: '#00a0ff', dot: '#00a0ff' },
    duo:     { bg: '#e6f1fd',              text: '#1b306c', dot: '#00a0ff' },
  },
};

export function Badge({
  text,
  label,
  color = 'Primary',
  state,
  variant,
  round,
  shape,
  dot = true,
  className = '',
}: BadgeProps) {
  const resolvedText = text ?? label ?? 'Text';
  const resolvedVariant: BadgeVariant = state ?? variant ?? 'Fill';
  const isRound = round ?? shape === 'Full';

  const key = resolvedVariant === 'Duo Tone' ? 'duo' : resolvedVariant === 'Outline' ? 'outline' : 'fill';
  const spec = COLORS[color][key];

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 8px',
    borderRadius: isRound ? 9999 : 4,
    backgroundColor: spec.bg,
    border: spec.border ? `1px solid ${spec.border}` : undefined,
    color: spec.text,
    whiteSpace: 'nowrap',
  };

  return (
    <span className={className} style={containerStyle}>
      {dot && (
        <span style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: spec.dot,
          flexShrink: 0,
        }} />
      )}
      <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px' }}>
        {resolvedText}
      </span>
    </span>
  );
}
