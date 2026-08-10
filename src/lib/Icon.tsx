"use client";

import React from 'react';
import type { LucideProps } from 'lucide-react';

export type IconSize = 16 | 20 | 24 | 32;

export type IconProps = {
  name: string;
  size?: IconSize;
  className?: string;
  color?: string;
  strokeWidth?: number;
};

/**
 * Airpals DS Icon — wraps lucide-react v0.469+
 * DS v2.5 — 1,509 icons, stroke style only.
 *
 * Usage:
 *   <Icon name="package" />
 *   <Icon name="truck" size={20} />
 *   <Icon name="arrow-right" color="currentColor" />
 *
 * Names: kebab-case matching Lucide — lucide.dev/icons
 */
export function Icon({ name, size = 24, className, color, strokeWidth = 1.5 }: IconProps) {
  const [Component, setComponent] = React.useState<React.ComponentType<LucideProps> | null>(null);

  React.useEffect(() => {
    const pascal = name
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');

    import('lucide-react')
      .then(mod => {
        const key = pascal as keyof typeof mod;
        if (typeof mod[key] === 'function') {
          setComponent(() => mod[key] as React.ComponentType<LucideProps>);
        } else {
          console.warn(`[Icon] "${name}" not found in lucide-react`);
        }
      })
      .catch(err => console.warn(`[Icon] Failed to load "${name}":`, err));
  }, [name]);

  const style: React.CSSProperties = color ? { color } : {};

  return (
    <span
      className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')}
      style={style}
      data-icon={name}
      data-size={size}
      aria-hidden="true"
    >
      {Component ? (
        <Component width={size} height={size} strokeWidth={strokeWidth} aria-hidden="true" />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" strokeDasharray="4 2" />
        </svg>
      )}
    </span>
  );
}
