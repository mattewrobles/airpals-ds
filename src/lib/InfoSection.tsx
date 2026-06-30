"use client";

import React from 'react';
import { InfoCard } from './InfoCard';
import type { InfoCardProps } from './InfoCard';

// Figma 747-9493 — InfoSection
// Aling "One": InfoCard left + illustration right
// Aling "Two": illustration left + InfoCard right
// Illustration is a slot (children) — absolute centered over Base
// Base: #e6f1fd bg, rounded-24, 378×378 decorative rectangle

export type InfoSectionAlign = 'One' | 'Two';

export type InfoSectionProps = {
  align?: InfoSectionAlign;
  showBase?: boolean;
  illustration?: React.ReactNode;
  infoCard?: InfoCardProps;
  className?: string;
};

function IllustrationBox({ showBase, illustration }: { showBase: boolean; illustration?: React.ReactNode }) {
  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0 }}>
      {/* Base — light blue rounded rect */}
      {showBase && (
        <div style={{
          width: 378, height: 378, borderRadius: 24,
          backgroundColor: '#e6f1fd', flexShrink: 0,
        }} />
      )}
      {/* Illustration — overlaid centered */}
      {illustration && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 376, height: 378,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          {illustration}
        </div>
      )}
    </div>
  );
}

export function InfoSection({
  align = 'Two',
  showBase = true,
  illustration,
  infoCard = {},
  className = '',
}: InfoSectionProps) {
  const card = <InfoCard {...infoCard} />;
  const illus = <IllustrationBox showBase={showBase} illustration={illustration} />;

  return (
    <div
      style={{
        display: 'flex', gap: 127, alignItems: 'center',
        width: 888, boxSizing: 'border-box',
      }}
      className={className}
    >
      {align === 'One' ? (
        <>{card}{illus}</>
      ) : (
        <>{illus}{card}</>
      )}
    </div>
  );
}
