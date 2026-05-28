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
npm install react react-dom
```

---

## Usage

### 1. Import CSS and Components

To use the components, you must import the library's CSS in your main application file (e.g., `layout.tsx` or `_app.tsx`):

```tsx
import 'airpals-ds/style.css'; // This includes the tokens and utility classes
import { Button, Alert, Badge, Input } from 'airpals-ds';

export default function Example() {
  return (
    <>
      <Button label="Ship it" type="Primary" />
      <Alert useCase="success" title="Shipment created successfully." />
    </>
  );
}
```

---

## Tailwind CSS Configuration

Since this library uses a custom theme (colors, typography, etc.), you need to configure Tailwind in your project to recognize these classes.

### Tailwind v3

Add the library's preset and content path to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Add the preset to inherit Airpals theme
  presets: [require('airpals-ds/tailwind.preset')],

  // 2. Add the library to the content array
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // your app's files
    './node_modules/airpals-ds/dist/**/*.{js,mjs,cjs}', // scan the library
  ],
  // ...
}
```

### Tailwind v4

In your main CSS file:

```css
@import "tailwindcss";

/* 1. Import Airpals tokens and variables */
@import "airpals-ds/style.css";

/* 2. Scan airpals-ds bundle for Tailwind classes */
@source "../node_modules/airpals-ds/dist/index.mjs";

/* 3. (Optional) Define theme aliases for v4 if not using the preset */
@theme {
  --color-brand-blue: #0043FF;
  --color-brand-pink: #FC4575;
  /* ... etc or use variables from style.css */
}
```

---

## Troubleshooting Colores y Estilos

Si los componentes se ven sin colores o con estilos incorrectos, verifica lo siguiente:

1. **¿Importaste el CSS?** Asegúrate de tener `import 'airpals-ds/style.css'` en tu archivo de entrada principal (`layout.tsx`, `_app.tsx` o `index.tsx`).
2. **¿Configuraste el preset?** (Solo Tailwind v3) Sin el `presets: [require('airpals-ds/tailwind.preset')]`, Tailwind no reconocerá clases como `bg-surface-primary`.
3. **¿El `content` es correcto?** Verifica que la ruta a `node_modules/airpals-ds` en tu `tailwind.config.js` sea correcta. Si usas un monorepo, la ruta podría ser `../../node_modules/airpals-ds/...`.
4. **Caché de Next.js**: A veces, borrar la carpeta `.next` y reiniciar el servidor de desarrollo soluciona problemas de carga de estilos.

---

## Setup

### Peer dependencies

`@heroicons/react` and `tailwindcss` are required in your project. If you don't have them yet:

```bash
yarn add @heroicons/react tailwindcss
```

### Tailwind v3 — required config

> ⚠️ **Components will appear unstyled without this step.**

In your `tailwind.config.js`, add the airpals-ds dist to the `content` array so Tailwind doesn't purge the component classes:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // your existing paths
    './node_modules/airpals-ds/dist/**/*.{js,mjs}',  // ← add this
  ],
  // ...rest of your config
}
```

### Tailwind v4

```css
/* globals.css */
@import "tailwindcss";
@source "../node_modules/airpals-ds/dist/index.mjs";

/* Import the library's compiled CSS if you're not using @source */
/* @import "airpals-ds/style.css"; */
```

### Fonts (optional)

airpals-ds ships Inter and Lexend via `@fontsource`. If your project already loads these fonts another way, you can skip this. Otherwise, import in your CSS:

```css
@import "@fontsource/inter/400.css";
@import "@fontsource/lexend/400.css";
```

### Next.js App Router

Add to `next.config.ts`:

```ts
const nextConfig = {
  transpilePackages: ['airpals-ds'],
};
@import "airpals-ds/style.css";

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

## Publishing to npm

### Prerequisites

You need publish access to the `airpals-ds` package on npm. Ask Mau for credentials or get added as a collaborator at [npmjs.com/package/airpals-ds](https://www.npmjs.com/package/airpals-ds).

### Login (first time or if logged out)

```bash
npm login
# Username: matthewrobles
# Enter password + OTP when prompted
```

### Step-by-step release

```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull origin main

# 2. Bump the version in package.json
#    Follow semantic versioning:
#    - Patch (0.3.0 → 0.3.1): bug fixes, no API changes
#    - Minor (0.3.0 → 0.4.0): new components or props, backwards compatible
#    - Major (0.3.0 → 1.0.0): breaking API changes

# 3. Update the Changelog story
#    src/foundations/Changelog.stories.tsx → add entry for the new version

# 4. Build and publish (prepublishOnly runs build:lib automatically)
npm publish

# 5. Commit and push the version bump
git add package.json src/foundations/Changelog.stories.tsx
git commit -m "chore: bump version to x.x.x"
git push origin main
```

### What happens automatically

- `prepublishOnly` script runs `build:lib` before publishing
- `build:lib` compiles TypeScript + bundles with Vite → outputs to `dist/`
- Chromatic Storybook deploys on every push to `main` via GitHub Actions

### Verify the release

```bash
# Check it's live on npm
npm view airpals-ds version

# Or visit:
# https://www.npmjs.com/package/airpals-ds
```

### In the consuming project

```bash
# Update to latest
npm install airpals-ds@latest
# or
yarn upgrade airpals-ds
# or
pnpm update airpals-ds
```

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
