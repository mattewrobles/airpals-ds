"use client";

import React from 'react';
import { Button } from './Button';
import { Badge } from './Badge';

// Figma 747-9372 — InfoCard
// w: 385px, flex-col gap-20
// Header: pink NEW badge + Lexend SemiBold 24px title
// Content: Inter Regular 16px paragraph, navy
// Button: #0043ff bg, h-52, rounded-6, Inter SemiBold 14px white centered

export type InfoCardProps = {
  title?: string;
  paragraph?: string;
  buttonLabel?: string;
  showChip?: boolean;
  showHead?: boolean;
  showContent?: boolean;
  showButton?: boolean;
  showImage?: boolean;
  imageUrl?: string;
  onButtonClick?: () => void;
  className?: string;
};

export function InfoCard({
  title = 'AI Shipping Assistant',
  paragraph = 'Skip the research and paperwork digging. Ask once, get the answer, move on. Our AI pal helps with common shipping questions, package details, carrier options, paperwork, and label creation, so repetitive shipping tasks stop eating your day.',
  buttonLabel = 'Try Our Free AI Shipping Assistant',
  showChip = true,
  showHead = true,
  showContent = true,
  showButton = true,
  showImage = false,
  imageUrl,
  onButtonClick,
  className = '',
}: InfoCardProps) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start', width: '100%', maxWidth: 385, boxSizing: 'border-box' }}
      className={className}
    >
      {/* Optional top image */}
      {showImage && imageUrl && (
        <div style={{ width: '100%', height: 208, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
          <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Header: chip + title */}
      {(showChip || showHead) && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%', flexShrink: 0 }}>
          {showChip && (
            <Badge text="NEW" color="Secondary" state="Fill" round dot={false} />
          )}
          {showHead && (
            <span style={{
              flex: 1, minWidth: 0,
              fontFamily: 'Lexend, sans-serif', fontWeight: 600,
              fontSize: 24, lineHeight: '32px', color: '#1b306c',
            }}>
              {title}
            </span>
          )}
        </div>
      )}

      {/* Paragraph */}
      {showContent && (
        <p style={{
          fontFamily: 'Inter', fontWeight: 400,
          fontSize: 16, lineHeight: '24px', color: '#1b306c',
          margin: 0, width: '100%', flexShrink: 0,
        }}>
          {paragraph}
        </p>
      )}

      {/* CTA Button */}
      {showButton && (
        <Button
          type="Primary"
          label={buttonLabel}
          onClick={onButtonClick}
        />
      )}
    </div>
  );
}
