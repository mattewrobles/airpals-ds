"use client";

import React from 'react';

export type IconVariant = 'outline' | 'solid';
export type IconSize = 16 | 20 | 24;

export type IconProps = {
  name: string;
  variant?: IconVariant;
  size?: IconSize;
  className?: string;
  color?: string;
};

/**
 * Airpals DS Icon — wraps @heroicons/react (v2).
 * The Airpals DS icon set matches HeroIcons v2 naming (Outline + Solid).
 *
 * Usage:
 *   <Icon name="envelope" />
 *   <Icon name="user-group" variant="solid" size={20} />
 *
 * Names: kebab-case, e.g. "x-mark", "arrow-right", "chart-bar-square"
 * Full list: heroicons.com
 */
export function Icon({ name, variant = 'outline', size = 24, className, color }: IconProps) {
  // Dynamic import via __heroicon__ global set by the story environment.
  // In production, consumers should import heroicons directly.
  const style: React.CSSProperties = color ? { color } : {};

  return (
    <span
      className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')}
      style={style}
      data-icon={name}
      data-variant={variant}
      data-size={size}
      aria-hidden="true"
    >
      <HeroIcon name={name} variant={variant} size={size} />
    </span>
  );
}

// Lazy heroicon loader — renders SVG placeholder if icon not found
function HeroIcon({ name, variant, size }: { name: string; variant: IconVariant; size: IconSize }) {
  const [Component, setComponent] = React.useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);

  React.useEffect(() => {
    const pascal = name
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
    const suffix = variant === 'outline' ? '' : 'Solid';
    const iconName = suffix ? `${pascal}Icon` : `${pascal}Icon`;

    if (variant === 'outline') {
      import('@heroicons/react/24/outline')
        .then((mod) => {
          const key = `${pascal}Icon` as keyof typeof mod;
          if (mod[key]) setComponent(() => mod[key] as React.ComponentType<React.SVGProps<SVGSVGElement>>);
        })
        .catch(() => null);
    } else {
      import('@heroicons/react/24/solid')
        .then((mod) => {
          const key = `${pascal}Icon` as keyof typeof mod;
          if (mod[key]) setComponent(() => mod[key] as React.ComponentType<React.SVGProps<SVGSVGElement>>);
        })
        .catch(() => null);
    }
  }, [name, variant]);

  if (!Component) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" strokeDasharray="4 2" />
      </svg>
    );
  }

  return <Component width={size} height={size} aria-hidden="true" />;
}