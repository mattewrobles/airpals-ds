# Airpals Design System

React component library and Storybook documentation for the Airpals platform.

[![npm version](https://img.shields.io/npm/v/airpals-ds)](https://www.npmjs.com/package/airpals-ds)
[![Chromatic](https://img.shields.io/badge/Storybook-Chromatic-FF4785)](https://www.chromatic.com)

---

## Install

```bash
npm install airpals-ds
# or
pnpm add airpals-ds
# or
yarn add airpals-ds
```

Peer dependencies required:

```bash
npm install react react-dom @heroicons/react @fontsource/inter @fontsource/lexend
```

---

## Usage

```tsx
import { Button, Alert, Badge, Input } from 'airpals-ds';
import type { ButtonType, AlertUseCase } from 'airpals-ds';

export default function Example() {
  return (
    <>
      <Button label="Ship it" type="Primary" />
      <Alert useCase="success" title="Shipment created successfully." />
      <Badge label="Active" color="Success" />
    </>
  );
}
```

---

## Next.js App Router setup

### `next.config.ts`

```ts
const nextConfig = {
  transpilePackages: ['airpals-ds'],
};
```

### `globals.css` (Tailwind v4)

```css
/* Fonts must come before Tailwind */
@import "@fontsource/inter/400.css";
@import "@fontsource/lexend/400.css";
@import "tailwindcss";

/* Scan airpals-ds bundle for Tailwind classes */
@source "../node_modules/airpals-ds/dist/index.mjs";
```

### `globals.css` (Tailwind v3)

```css
@import "@fontsource/inter/400.css";
@import "@fontsource/lexend/400.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Components

| Component | Description |
|-----------|-------------|
| `Button` | 6 types · 3 sizes |
| `Alert` | 5 use cases (error / warning / success / info / alert) · border prop |
| `Badge` | 9 colors · 3 variants · 2 shapes |
| `Input` | 4 states · Error / Success status |
| `Textarea` | 4 states · helper text · character counter |
| `Dropdown` | Controlled select with ARIA listbox |
| `Checkbox` | 4 states · On / Off / Indeterminate |
| `Radio` / `RadioButton` | 4 states · 2 sizes |
| `Toggle` | 3 styles (Standard / Navy / Subtle) |
| `ToggleWithText` | Default and compact sizes |
| `Tag` | 4 states · closable |
| `Avatar` | 5 sizes · 4 corner styles · online badge |
| `AvatarGroup` | Overlapping stack with overflow counter |
| `SplitButton` | 6 types · 4 sizes · dropdown menu |
| `Breadcrumbs` | 3 separator styles · home icon |
| `Pagination` | Smart page range · first/last controls |
| `ClickableLink` | Blue / Dark Blue · external link |
| `Navbar` | Desktop + mobile (hamburger) |
| `Footer` | Desktop + mobile |
| `Icon` | Heroicons v1 — outline and solid |
| `Logo` | Airpals wordmark — light and dark |

---

## Token system

All components use semantic CSS tokens — no hardcoded hex values.

```
surface.*   → backgrounds
ink.*       → text colors
line.*      → borders
icon.*      → icon colors
```

Tokens respond automatically to `.dark` class for dark mode. Override any token in your app's CSS:

```css
:root {
  --color-bg-accent: #0043FF;   /* brand blue */
  --color-text-primary: #1B306C; /* brand navy */
}
```

Full token reference available in the Storybook → **Foundations / Tokens Reference**.

---

## Development

```bash
# Install dependencies
npm install

# Run Storybook locally
npm run storybook

# Build the npm package
npm run build:lib

# Build Storybook static
npm run build-storybook
```

---

## Publishing

```bash
# Bump version in package.json, then:
npm publish
```

The `prepublishOnly` script runs `build:lib` automatically before publishing.

---

## Storybook

Live Storybook published via Chromatic on every push to `main`.

---

## Stack

- **React** 18 + TypeScript
- **Tailwind CSS** v3
- **Storybook** 8
- **Vite** (lib build)
- **Heroicons** v1
- **Fontsource** — Inter + Lexend
