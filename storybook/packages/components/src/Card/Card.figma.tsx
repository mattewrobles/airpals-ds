import React from 'react';
import figma from '@figma/code-connect';
import { Card } from '@prism/components';

/**
 * Figma Code Connect — Card
 *
 * Instructions:
 * 1. Replace REPLACE_WITH_YOUR_FILE_ID with your actual Figma file key
 * 2. Replace CARD_NODE with the node-id of the Card component in Figma
 * 3. Run: npm run figma:publish
 */
figma.connect(
  Card,
  'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=CARD_NODE',
  {
    props: {
      title: figma.string('Title'),
      description: figma.string('Description'),
      padding: figma.enum('Padding', {
        None: 'none',
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      variant: figma.enum('Variant', {
        Default: 'default',
        Elevated: 'elevated',
        Outlined: 'outlined',
      }),
    },
    example: ({ title, description, padding, variant }) => (
      <Card
        title={title}
        description={description}
        padding={padding}
        variant={variant}
      />
    ),
  }
);
