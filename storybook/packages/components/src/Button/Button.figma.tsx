import React from 'react';
import figma, { html } from '@figma/code-connect';
import { Button } from '@prism/components';

/**
 * Figma Code Connect — Button
 *
 * Instructions:
 * 1. Replace REPLACE_WITH_YOUR_FILE_ID with your actual Figma file key
 * 2. Replace BUTTON_NODE with the node-id of the Button component in Figma
 *    (right-click → Copy link → the part after "node-id=")
 * 3. Run: npm run figma:publish
 */
figma.connect(
  Button,
  'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=BUTTON_NODE',
  {
    props: {
      variant: figma.enum('Variant', {
        Primary: 'primary',
        Secondary: 'secondary',
        Destructive: 'destructive',
        Ghost: 'ghost',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      label: figma.string('Label'),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ variant, size, label, disabled }) => (
      <Button
        variant={variant}
        size={size}
        label={label}
        disabled={disabled}
      />
    ),
  }
);
