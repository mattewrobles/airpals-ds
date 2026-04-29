import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import '../src/tokens/tokens.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals['theme'] as string | undefined;
  document.documentElement.setAttribute('data-theme', theme ?? 'light');
  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375)',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
        mobileLarge: {
          name: 'Mobile L (414)',
          styles: { width: '414px', height: '896px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet (768)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop (1280)',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
        desktopLarge: {
          name: 'Desktop L (1440)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'desktop',
    },
  },
};

export default preview;
