import Foundation

// MARK: - Token Exporter
// Converts DesignSystem → DTCG JSON for Figma plugin { primitives: {...}, semantic: {...} }

struct TokenExporter {

    // MARK: - Main export

    static func exportForFigma(ds: DesignSystem) -> [String: Any] {
        var primitives: [String: Any] = [:]

        // ── Colors ──────────────────────────────────────────────
        for ramp in ds.colors.ramps where ramp.isVisible {
            let swatches = ColorGenerator.generate(ramp: ramp)
            let rampKey = ramp.name.lowercased().replacingOccurrences(of: " ", with: "-")
            for swatch in swatches {
                let key = "color/\(rampKey)/\(swatch.step)"
                primitives[key] = ["$type": "color", "$value": swatch.hex.uppercased()]
            }
        }
        for color in ds.colors.standalones {
            let key = "color/\(slug(color.name))"
            primitives[key] = ["$type": "color", "$value": color.hex.uppercased()]
        }

        // ── Spacing ──────────────────────────────────────────────
        for step in ds.spacing.steps {
            let key = "spacing/\(slug(step.name))"
            primitives[key] = ["$type": "dimension", "$value": step.valuePx]
        }

        // ── Radius ───────────────────────────────────────────────
        for step in ds.radius.steps {
            let val = step.isFull ? 9999.0 : step.value
            let key = "radius/\(slug(step.name))"
            primitives[key] = ["$type": "dimension", "$value": val]
        }

        // ── Opacity ──────────────────────────────────────────────
        for step in ds.opacity.steps {
            let key = "opacity/\(slug(step.name))"
            primitives[key] = ["$type": "number", "$value": step.value]
        }

        // ── Shadow (as string — Figma doesn't have shadow variable type) ──
        for shadow in ds.shadow.shadows {
            let css = shadowToCSS(shadow)
            let key = "shadow/\(slug(shadow.name))"
            primitives[key] = ["$type": "string", "$value": css]
        }

        // ── Motion: durations ────────────────────────────────────
        for dur in ds.motion.durations {
            let key = "motion/duration/\(slug(dur.name))"
            primitives[key] = ["$type": "number", "$value": dur.ms]
        }

        // ── Motion: easings ──────────────────────────────────────
        for easing in ds.motion.easings {
            let key = "motion/easing/\(slug(easing.name))"
            primitives[key] = ["$type": "string", "$value": easing.cssValue]
        }

        // ── Z-Index ──────────────────────────────────────────────
        for step in ds.zIndex.steps {
            let key = "z-index/\(slug(step.name))"
            primitives[key] = ["$type": "number", "$value": Double(step.value)]
        }

        // ── Semantic tokens ──────────────────────────────────────
        let modeNameById: [String: String] = Dictionary(
            uniqueKeysWithValues: ds.modes.map { ($0.id.uuidString, $0.name) }
        )

        var semantic: [String: Any] = [:]
        for token in ds.semanticTokens {
            var modeEntries: [String: Any] = [:]
            for (modeId, value) in token.modeValues {
                let modeName = modeNameById[modeId] ?? modeId
                modeEntries[modeName] = tokenValueToAny(value)
            }

            var entry: [String: Any] = ["$type": token.type.rawValue]
            entry["$value"] = modeEntries["Light"] ?? modeEntries.values.first ?? ""
            if modeEntries.count > 1 { entry["$modes"] = modeEntries }
            semantic[token.name] = entry
        }

        // ── Typography text styles ───────────────────────────────────
        var textStyles: [[String: Any]] = []
        let typoSteps = TypeScaleGenerator.generate(foundation: ds.typography)
        for role in ds.typography.roles {
            guard let fam = ds.typography.families.first(where: { $0.name == role.familyName }),
                  let step = typoSteps.first(where: { $0.step == role.scaleStep }) else { continue }
            let lineHeightPx = step.sizePx * role.lineHeight
            textStyles.append([
                "name": "typography/\(role.tokenName)",
                "fontFamily": fam.fontFamily,
                "fontStyle": fontWeightToStyle(role.weight),
                "fontSize": step.sizePx,
                "lineHeightPx": lineHeightPx,
                "letterSpacingEm": role.letterSpacing
            ])
        }

        // ── Shadow effect styles ─────────────────────────────────────
        var effectStyles: [[String: Any]] = []
        for shadow in ds.shadow.shadows {
            var effects: [[String: Any]] = []
            for layer in shadow.layers {
                let hex = layer.colorHex.trimmingCharacters(in: CharacterSet(charactersIn: "#"))
                effects.append([
                    "x": layer.x,
                    "y": layer.y,
                    "blur": layer.blur,
                    "spread": layer.spread,
                    "r": Double(hexComp(hex, 0)) / 255.0,
                    "g": Double(hexComp(hex, 1)) / 255.0,
                    "b": Double(hexComp(hex, 2)) / 255.0,
                    "a": layer.opacity,
                    "isInner": layer.isInner
                ])
            }
            effectStyles.append([
                "name": "shadow/\(slug(shadow.name))",
                "effects": effects
            ])
        }

        return ["primitives": primitives, "semantic": semantic, "textStyles": textStyles, "effectStyles": effectStyles]
    }

    // MARK: - CSS Export

    static func exportCSS(ds: DesignSystem) -> String {
        let dsName = ds.name
        var lines: [String] = []

        lines.append("/* Auto-generated by Prism — \(dsName) */")
        lines.append("/* Do not edit manually — regenerate from Prism app */")
        lines.append("")
        lines.append(":root {")

        // ── Colors ──────────────────────────────────────────────
        lines.append("  /* ── Colors ── */")
        for ramp in ds.colors.ramps where ramp.isVisible {
            let rampKey = ramp.name.lowercased().replacingOccurrences(of: " ", with: "-")
            let swatches = ColorGenerator.generate(ramp: ramp)
            for swatch in swatches {
                lines.append("  --color-\(rampKey)-\(swatch.step): \(swatch.hex.lowercased());")
            }
        }
        for color in ds.colors.standalones {
            lines.append("  --color-\(slug(color.name)): \(color.hex.lowercased());")
        }

        // ── Spacing ──────────────────────────────────────────────
        lines.append("")
        lines.append("  /* ── Spacing ── */")
        for step in ds.spacing.steps {
            lines.append("  --spacing-\(slug(step.name)): \(step.valuePx)px;")
        }

        // ── Radius ───────────────────────────────────────────────
        lines.append("")
        lines.append("  /* ── Radius ── */")
        for step in ds.radius.steps {
            let val = step.isFull ? 9999.0 : step.value
            let valStr = val.truncatingRemainder(dividingBy: 1) == 0
                ? "\(Int(val))"
                : "\(val)"
            lines.append("  --radius-\(slug(step.name)): \(valStr)px;")
        }

        // ── Opacity ──────────────────────────────────────────────
        lines.append("")
        lines.append("  /* ── Opacity ── */")
        for step in ds.opacity.steps {
            lines.append("  --opacity-\(slug(step.name)): \(step.value);")
        }

        // ── Typography ───────────────────────────────────────────
        lines.append("")
        lines.append("  /* ── Typography ── */")
        for family in ds.typography.families {
            lines.append("  --font-family-\(slug(family.name)): '\(family.fontFamily)', sans-serif;")
        }
        let typoSteps = TypeScaleGenerator.generate(foundation: ds.typography)
        for role in ds.typography.roles {
            guard let step = typoSteps.first(where: { $0.step == role.scaleStep }) else { continue }
            let tokenSlug = slug(role.tokenName)
            let sizePx = step.sizePx
            let sizeRem = (sizePx / 16.0)
            let remStr = String(format: "%.4f", sizeRem).replacingOccurrences(of: #"0+$"#, with: "", options: .regularExpression).replacingOccurrences(of: #"\.$"#, with: "", options: .regularExpression)
            lines.append("  --font-size-\(tokenSlug): \(Int(sizePx))px;")
            lines.append("  --font-size-\(tokenSlug)-rem: \(remStr)rem;")
        }

        // ── Motion ───────────────────────────────────────────────
        lines.append("")
        lines.append("  /* ── Motion ── */")
        for dur in ds.motion.durations {
            lines.append("  --motion-duration-\(slug(dur.name)): \(dur.ms)ms;")
        }
        for easing in ds.motion.easings {
            lines.append("  --motion-easing-\(slug(easing.name)): \(easing.cssValue);")
        }

        // ── Z-Index ──────────────────────────────────────────────
        lines.append("")
        lines.append("  /* ── Z-Index ── */")
        for step in ds.zIndex.steps {
            lines.append("  --z-index-\(slug(step.name)): \(step.value);")
        }

        // ── Shadows ──────────────────────────────────────────────
        lines.append("")
        lines.append("  /* ── Shadows ── */")
        for shadow in ds.shadow.shadows {
            let css = shadowToCSS(shadow)
            lines.append("  --shadow-\(slug(shadow.name)): \(css);")
        }

        // ── Semantic (Light) ─────────────────────────────────────
        let lightMode = ds.modes.first(where: { $0.name == "Light" })
        let lightModeId = lightMode?.id.uuidString

        let lightTokens = ds.semanticTokens.compactMap { token -> String? in
            guard let modeId = lightModeId,
                  let value = token.modeValues[modeId] else { return nil }
            let cssName = token.name.lowercased()
                .replacingOccurrences(of: "/", with: "-")
                .replacingOccurrences(of: " ", with: "-")
            let cssValue = tokenValueToCSS(value)
            return "  --\(cssName): \(cssValue);"
        }
        if !lightTokens.isEmpty {
            lines.append("")
            lines.append("  /* ── Semantic (Light) ── */")
            lines.append(contentsOf: lightTokens)
        }

        lines.append("}")

        // ── Semantic (Dark) ──────────────────────────────────────
        let darkMode = ds.modes.first(where: { $0.name == "Dark" })
        let darkModeId = darkMode?.id.uuidString

        let darkTokens = ds.semanticTokens.compactMap { token -> String? in
            guard let modeId = darkModeId,
                  let value = token.modeValues[modeId] else { return nil }
            let cssName = token.name.lowercased()
                .replacingOccurrences(of: "/", with: "-")
                .replacingOccurrences(of: " ", with: "-")
            let cssValue = tokenValueToCSS(value)
            return "  --\(cssName): \(cssValue);"
        }
        if !darkTokens.isEmpty {
            lines.append("")
            lines.append("[data-theme=\"dark\"] {")
            lines.append("  /* ── Semantic (Dark) ── */")
            lines.append(contentsOf: darkTokens)
            lines.append("}")
        }

        return lines.joined(separator: "\n") + "\n"
    }

    // Converts a TokenValue to a CSS expression
    private static func tokenValueToCSS(_ value: TokenValue) -> String {
        switch value {
        case .alias(let name):
            // "color/primary/500" → var(--color-primary-500)
            let cssVar = name.lowercased()
                .replacingOccurrences(of: "/", with: "-")
                .replacingOccurrences(of: " ", with: "-")
            return "var(--\(cssVar))"
        case .color(let hex):
            return hex.lowercased()
        case .number(let n):
            return "\(n)"
        case .string(let s):
            return s
        case .boolean(let b):
            return b ? "1" : "0"
        }
    }

    // MARK: - JSON Data

    static func exportJSON(ds: DesignSystem) -> Data {
        let dict = exportForFigma(ds: ds)
        return (try? JSONSerialization.data(
            withJSONObject: dict,
            options: [.prettyPrinted, .sortedKeys]
        )) ?? Data("{}".utf8)
    }

    // MARK: - Helpers

    private static func fontWeightToStyle(_ weight: Int) -> String {
        switch weight {
        case 100: return "Thin"
        case 200: return "ExtraLight"
        case 300: return "Light"
        case 400: return "Regular"
        case 500: return "Medium"
        case 600: return "SemiBold"
        case 700: return "Bold"
        case 800: return "ExtraBold"
        case 900: return "Black"
        default:  return "Regular"
        }
    }

    private static func slug(_ s: String) -> String {
        s.lowercased().replacingOccurrences(of: " ", with: "-")
    }

    private static func shadowToCSS(_ shadow: ShadowToken) -> String {
        shadow.layers.map { l in
            let hex = l.colorHex.trimmingCharacters(in: CharacterSet(charactersIn: "#"))
            let rgba = "rgba(\(hexComp(hex, 0)),\(hexComp(hex, 1)),\(hexComp(hex, 2)),\(l.opacity))"
            let inner = l.isInner ? " inset" : ""
            return "\(Int(l.x))px \(Int(l.y))px \(Int(l.blur))px \(Int(l.spread))px \(rgba)\(inner)"
        }.joined(separator: ", ")
    }

    private static func hexComp(_ hex: String, _ idx: Int) -> Int {
        let h = hex.count == 3
            ? hex.map { "\($0)\($0)" }.joined()
            : hex
        guard h.count == 6 else { return 0 }
        let start = h.index(h.startIndex, offsetBy: idx * 2)
        let end   = h.index(start, offsetBy: 2)
        return Int(h[start..<end], radix: 16) ?? 0
    }

    private static func tokenValueToAny(_ value: TokenValue) -> Any {
        switch value {
        case .alias(let name):  return "{\(name)}"
        case .color(let hex):   return hex.uppercased()
        case .number(let n):    return n
        case .string(let s):    return s
        case .boolean(let b):   return b
        }
    }
}
