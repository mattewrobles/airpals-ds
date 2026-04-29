import React from 'react';
import figma from '@figma/code-connect';
import { Avatar } from '@prism/components';

/**
 * Figma Code Connect — Avatar
 *
 * Instructions:
 * 1. Replace REPLACE_WITH_YOUR_FILE_ID with your actual Figma file key
 * 2. Replace AVATAR_NODE with the node-id of the Avatar component in Figma
 * 3. Run: npm run figma:publish
 */
figma.connect(
  Avatar,
  'https://www.figma.com/design/REPLACE_WITH_YOUR_FILE_ID/Prism-DS?node-id=AVATAR_NODE',
  {
    props: {
      initials: figma.string('Initials'),
      size: figma.enum('Size', {
        'Extra Small': 'xs',
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
        'Extra Large': 'xl',
      }),
      status: figma.enum('Status', {
        Online: 'online',
        Offline: 'offline',
        Busy: 'busy',
        Away: 'away',
      }),
    },
    example: ({ initials, size, status }) => (
      <Avatar initials={initials} size={size} status={status} />
    ),
  }
);
