import React from 'react';
import figma from '@figma/code-connect';
import { Input } from './Input';

/**
 * Figma Code Connect — Input
 *
 * Instructions:
 * 1. Replace REPLACE_WITH_YOUR_FILE_ID with your actual Figma file key
 * 2. Replace INPUT_NODE with the node-id of the Input component in Figma
 * 3. Run: npm run figma:publish
 */
figma.connect(
  Input,
  'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=INPUT_NODE',
  {
    props: {
      label: figma.string('Label'),
      placeholder: figma.string('Placeholder'),
      error: figma.string('Error'),
      hint: figma.string('Hint'),
      disabled: figma.boolean('Disabled'),
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      type: figma.enum('Type', {
        Text: 'text',
        Email: 'email',
        Password: 'password',
        Number: 'number',
      }),
    },
    example: ({ label, placeholder, error, hint, disabled, size, type }) => (
      <Input
        label={label}
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        error={error}
        hint={hint}
        disabled={disabled}
        size={size}
        type={type}
      />
    ),
  }
);
