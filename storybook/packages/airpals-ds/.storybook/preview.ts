import type { Preview, Decorator } from '@storybook/react';
import '../src/tokens/tokens.css';
import './tailwind.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals['theme'] as string | undefined;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  return Story();
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / Dark mode',
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
        tablet: {
          name: 'Tablet (768)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
      },
      defaultViewport: 'desktop',
    },
  },
};

export default preview;
