import React from 'react';
import figma from '@figma/code-connect';
import { Badge } from '@prism/components';

/**
 * Figma Code Connect — Badge
 *
 * Instructions:
 * 1. Replace REPLACE_WITH_YOUR_FILE_ID with your actual Figma file key
 * 2. Replace BADGE_NODE with the node-id of the Badge component in Figma
 * 3. Run: npm run figma:publish
 */
figma.connect(
  Badge,
  'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=BADGE_NODE',
  {
    props: {
      variant: figma.enum('Variant', {
        Default: 'default',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
        Info: 'info',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
      }),
      label: figma.string('Label'),
      dot: figma.boolean('Dot'),
    },
    example: ({ variant, size, label, dot }) => (
      <Badge variant={variant} size={size} label={label} dot={dot} />
    ),
  }
);
