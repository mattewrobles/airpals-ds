# Prism — Design System Builder

## Qué es
App macOS nativa (Swift + SwiftUI) para crear design systems visuales con:
- OKLCH color ramps con WCAG contrast badges
- Typography scale (modular scale)
- Todos los foundations: spacing, radius, shadow, motion, z-index, grid
- Tokens primitivos → semánticos → componente
- Preview live con tus tokens
- Accessibility audit (WCAG AA/AAA)
- Figma bidirectional sync via plugin

## Paths
```
/Users/mau/Developer/Personal Projects/Prism/
├── Prism/                    ← Swift app
│   ├── App/                  ← Entry point, Commands
│   ├── Core/
│   │   ├── Models/           ← DesignSystem, ColorFoundation, etc.
│   │   ├── Store/            ← ProjectStore (ObservableObject)
│   │   └── Services/         ← ColorGenerator, TokenExporter
│   ├── Features/
│   │   ├── Onboarding/       ← OnboardingView, NewProjectSheet
│   │   ├── Dashboard/        ← MainAppView, SidebarView
│   │   ├── Colors/           ← ColorsView (OKLCH ramps)
│   │   ├── Typography/       ← TypographyView
│   │   ├── Preview/          ← PreviewView
│   │   ├── Audit/            ← AuditView (WCAG)
│   │   └── FigmaSync/        ← FigmaSyncView
│   ├── Shared/
│   │   ├── Components/       ← SectionHeader, TabBar, etc.
│   │   └── Extensions/       ← Color+Extensions
│   └── Resources/            ← Info.plist, Prism.entitlements
├── plugin/                   ← Figma plugin (TypeScript + React)
│   ├── src/
│   │   ├── code.ts           ← Plugin main thread (push/pull logic)
│   │   └── ui/App.tsx        ← Plugin UI
│   ├── manifest.json
│   └── package.json
├── project.yml               ← XcodeGen config
└── .gitignore
```

## Stack
- **App**: Swift 5.9 + SwiftUI, macOS 14+
- **State**: ObservableObject + @EnvironmentObject
- **Storage**: Codable JSON → `.prism` files
- **Color math**: OKLCH implementado en `ColorGenerator.swift`
- **Plugin**: TypeScript + React + Vite + @figma/plugin-typings

## Cómo generar el .xcodeproj
```bash
# Install XcodeGen si no está
brew install xcodegen

# Desde la raíz del proyecto
cd "/Users/mau/Developer/Personal Projects/Prism"
xcodegen generate
```

## Cómo correr el plugin Figma
```bash
cd "/Users/mau/Developer/Personal Projects/Prism/plugin"
npm install
npm run dev

# En Figma: Plugins → Development → Import plugin from manifest
# Seleccionar plugin/manifest.json
```

## Modelo de datos

### DesignSystem (root)
- `ColorFoundation` → ramps (ColorRamp[]) + standalones
- `TypographyFoundation` → families + scale config
- `SpacingFoundation`, `RadiusFoundation`, `ShadowFoundation`, etc.
- `SemanticToken[]` → aliases con modeValues (Light/Dark)
- `ComponentToken[]` → tokens por componente

### ColorRamp
- seedHex → OKLCH config → generates swatches at runtime
- OKLCHConfig: chroma, lightness top/bottom, curve easing
- ColorSwatch: hex + WCAG contrast vs white/black (no stored)

## Export formats
1. **Figma Variables JSON** — drop-in para plugin nativo Figma
2. **DTCG** — W3C standard, compatible con Tokens Studio
3. **CSS Variables** — para web
4. **Swift Tokens** — para iOS/macOS

## Figma Plugin sync
- **Push**: app → JSON → plugin → `figma.variables.createVariable()`
- **Pull**: plugin → `figma.variables.getLocalVariablesAsync()` → JSON → app
- Comunicación: `localhost:7891` (app actúa como servidor local) + clipboard fallback
- Collections creadas: "⊙ Primitives" + "🧩 Tokens" (con modos Light/Dark)

## Auto-Skills (invocar automáticamente)
| Contexto | Skill |
|----------|-------|
| UI/UX, componentes SwiftUI | `swiftui-patterns` + `ui-ux-pro-max-intelligence` |
| Código Swift en general | `swiftui-patterns` |
| Seguridad | `security-review` |
| Figma Plugin (TypeScript) | `figma-use` |

## Pendiente v1
- [ ] TypographyView completa con font picker
- [ ] SpacingView, RadiusView, etc.
- [ ] TokensView (árbol de primitivos + semánticos)
- [ ] Local HTTP server en app para recibir pull del plugin
- [ ] Drag & drop reorder de ramps
- [ ] Export functions en `TokenExporter.swift`
- [ ] AuditView: generar pares semánticos reales

## Pendiente v2
- [ ] ComponentsView
- [ ] Forks de presets (Material, Primer, Radix)
- [ ] Documentation + Changelog
- [ ] Colorblind simulation en Audit
- [ ] Animaciones/motion preview
