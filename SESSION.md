# SESSION — Airpals DS
**Última sesión:** 2026-10-12
**Estado:** DS v2.5 migration completada. npm published. App actualizada.

## Qué se hizo

### DS v2.6 — Heroicons → Lucide (Chromatic fix)
- Migrados: `Navbar.tsx`, `Breadcrumbs.tsx`, `Footer.tsx`, `Sidebar.tsx`, `Icon.stories.tsx`
- Todos los imports `@heroicons/react/outline` y `/solid` reemplazados con `lucide-react`
- Commits: `f310a53` (heroicons → lucide) + `3dd17f9` (fix index.ts exports)

### npm publish airpals-ds@0.6.0
- Removidos exports stale de `index.ts`: `ButtonType`, `ButtonState`, `IconVariant`
- Build limpio — publicado

### airpals-app actualizada a 0.6.0
- `globals.css`: 9 tokens nuevos en `:root` + `@theme` completo para Tailwind v4
- Button API: `type=` → `variant=` en 6 archivos del app
- Build de Next.js pasa limpio — todas las rutas compilan

## Pendiente verificar
- Chromatic CI en `github.com/mattewrobles/airpals-ds` — verificar que pase en verde
- QA visual del app en `localhost:3000` (páginas: start, home, pay, carriers)

## Próxima sesión
Si Chromatic falla: revisar `yarn.lock` en DS o issues de CI en GitHub Actions.
Si Chromatic pasa: continuar con auditoría visual de componentes en el app.

## Paths clave
- DS: `/Users/mau/Developer/work/airpals/design-system/`
- App: `/Users/mau/Developer/work/airpals/airpals-app/`
- Dev server app: `npm run dev` → http://localhost:3000
- Storybook DS: `pnpm storybook` → http://localhost:6006

## 2026-10-12: sync de docs
- Changelog y Getting Started al día con v0.6.0 (Lucide, tokens semánticos, Button v2.5). README: heroicons → lucide.
- Código del DS copiado también a `airpals-app-prototype/design-system/` (sin historial). La fuente de verdad sigue siendo este repo.
- **v0.7.0 publicado en npm (2026-10-12):** SlideOverPanel, Tooltip, Switch extraídos de la app. La app ya los importa de `airpals-ds`; `ui/tooltip.tsx` local queda solo para `ui/sidebar.tsx` (shadcn).
- Pendiente para v0.8.0: la app usa componentes que el DS no tiene (SlideOverPanel, Tooltip, Switch, TimeWindowPicker, InlineEditReveal, NextChargeBanner, modales de billing). Candidatos para v0.7.0.
