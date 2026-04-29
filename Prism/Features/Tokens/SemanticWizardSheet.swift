import SwiftUI

// MARK: - Semantic System Wizard
// Guides the user through generating a complete semantic color system
// from their existing primitive ramps.

struct SemanticWizardSheet: View {
    @EnvironmentObject var projectStore: ProjectStore
    @Environment(\.dismiss) var dismiss

    let onGenerate: ([SemanticToken]) -> Void

    // Available ramp names from the DS
    var rampNames: [String] {
        projectStore.currentProject?.colors.ramps.map(\.name) ?? []
    }

    // Wizard state
    @State private var step: Int = 0
    @State private var brandRamp: String = ""
    @State private var neutralRamp: String = ""
    @State private var successRamp: String = ""
    @State private var warningRamp: String = ""
    @State private var errorRamp: String = ""
    @State private var infoRamp: String = ""

    // Preview of generated tokens
    @State private var showPreview: Bool = false

    var isStep1Valid: Bool { !brandRamp.isEmpty && !neutralRamp.isEmpty }
    var isStep2Valid: Bool { !successRamp.isEmpty && !warningRamp.isEmpty && !errorRamp.isEmpty }
    var totalTokens: Int { generateTokens().count }

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Generate Semantic Color System")
                        .font(.title3.bold())
                    Text("Step \(step + 1) of 3")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                Button { dismiss() } label: {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title3)
                        .foregroundStyle(.secondary)
                }
                .buttonStyle(.plain)
            }
            .padding(20)

            // Step indicator
            HStack(spacing: 6) {
                ForEach(0..<3, id: \.self) { i in
                    Capsule()
                        .fill(i <= step ? Color.blue : Color.secondary.opacity(0.2))
                        .frame(maxWidth: .infinity)
                        .frame(height: 4)
                        .animation(.easeInOut, value: step)
                }
            }
            .padding(.horizontal, 20)
            .padding(.bottom, 20)

            Divider()

            ScrollView {
                VStack(alignment: .leading, spacing: 28) {
                    switch step {
                    case 0:  step1
                    case 1:  step2
                    default: step3
                    }
                }
                .padding(24)
            }

            Divider()

            // Navigation buttons
            HStack {
                if step > 0 {
                    Button("Back") { withAnimation { step -= 1 } }
                        .buttonStyle(.bordered)
                }

                Spacer()

                if step < 2 {
                    Button(step == 0 ? "Next: States →" : "Next: Preview →") {
                        withAnimation { step += 1 }
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(step == 0 ? !isStep1Valid : !isStep2Valid)
                } else {
                    Button("Generate \(totalTokens) Tokens") {
                        onGenerate(generateTokens())
                        dismiss()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(.purple)
                }
            }
            .padding(20)
        }
        .frame(width: 620, height: 640)
        .onAppear {
            // Auto-select ramps by common names
            autoDetectRamps()
        }
    }

    // MARK: - Step 1: Brand + Neutral

    var step1: some View {
        VStack(alignment: .leading, spacing: 24) {
            VStack(alignment: .leading, spacing: 6) {
                Label("Brand Color", systemImage: "paintpalette.fill")
                    .font(.headline)
                Text("Your primary brand color — used for buttons, links, focus rings, and active states.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }

            RampPickerGrid(
                selected: $brandRamp,
                ramps: projectStore.currentProject?.colors.ramps ?? []
            )

            Divider()

            VStack(alignment: .leading, spacing: 6) {
                Label("Neutral / Gray", systemImage: "circle.lefthalf.filled")
                    .font(.headline)
                Text("Your gray scale — used for text, backgrounds, borders, and disabled states. Typically a cool gray or slate.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }

            RampPickerGrid(
                selected: $neutralRamp,
                ramps: projectStore.currentProject?.colors.ramps ?? []
            )
        }
    }

    // MARK: - Step 2: State Colors

    var step2: some View {
        VStack(alignment: .leading, spacing: 24) {
            Text("State Colors")
                .font(.headline)
            Text("These define feedback states across your UI — alerts, form validation, status indicators.")
                .font(.subheadline)
                .foregroundStyle(.secondary)

            stateRampRow(
                icon: "checkmark.circle.fill",
                color: .green,
                label: "Success",
                desc: "Confirmations, completed actions, valid inputs",
                binding: $successRamp
            )

            stateRampRow(
                icon: "exclamationmark.triangle.fill",
                color: .orange,
                label: "Warning",
                desc: "Caution messages, approaching limits",
                binding: $warningRamp
            )

            stateRampRow(
                icon: "xmark.circle.fill",
                color: .red,
                label: "Error / Destructive",
                desc: "Errors, invalid inputs, dangerous actions",
                binding: $errorRamp
            )

            stateRampRow(
                icon: "info.circle.fill",
                color: .blue,
                label: "Info (optional)",
                desc: "Informational messages, tips",
                binding: $infoRamp
            )
        }
    }

    func stateRampRow(icon: String, color: Color, label: String, desc: String, binding: Binding<String>) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Label(label, systemImage: icon)
                .font(.subheadline.bold())
                .foregroundStyle(color)
            Text(desc)
                .font(.caption)
                .foregroundStyle(.secondary)
            RampPickerCompact(
                selected: binding,
                ramps: projectStore.currentProject?.colors.ramps ?? [],
                allowNone: label.contains("optional")
            )
        }
        .padding(14)
        .background(color.opacity(0.04))
        .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(color.opacity(0.15)))
        .clipShape(RoundedRectangle(cornerRadius: 10))
    }

    // MARK: - Step 3: Preview

    var step3: some View {
        VStack(alignment: .leading, spacing: 20) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Ready to generate \(totalTokens) tokens")
                        .font(.headline)
                    Text("Review the color system below. You can edit individual tokens after generating.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                Spacer()
            }

            let tokens = generateTokens()
            let ds = projectStore.currentProject
            let resolver = ds.map { TokenResolver(ds: $0) }

            // Group preview by category
            let categories = ["text", "bg", "border", "icon", "status", "button"]
            ForEach(categories, id: \.self) { cat in
                let catTokens = tokens.filter { $0.name.hasPrefix("\(cat)/") }
                if !catTokens.isEmpty {
                    TokenPreviewGroup(
                        category: cat,
                        tokens: catTokens,
                        resolver: resolver,
                        ds: ds
                    )
                }
            }
        }
    }

    // MARK: - Token Generation

    func generateTokens() -> [SemanticToken] {
        guard let ds = projectStore.currentProject,
              !brandRamp.isEmpty, !neutralRamp.isEmpty else { return [] }

        let lightId = ds.modes.first { $0.name == "Light" }?.id.uuidString
                   ?? ds.modes.first?.id.uuidString ?? ""
        let darkId  = ds.modes.first { $0.name == "Dark" }?.id.uuidString
                   ?? (ds.modes.count > 1 ? ds.modes[1].id.uuidString : "")

        let p = brandRamp.lowercased().replacingOccurrences(of: " ", with: "-")
        let n = neutralRamp.lowercased().replacingOccurrences(of: " ", with: "-")
        let s = successRamp.isEmpty ? "green" : successRamp.lowercased().replacingOccurrences(of: " ", with: "-")
        let w = warningRamp.isEmpty ? "yellow" : warningRamp.lowercased().replacingOccurrences(of: " ", with: "-")
        let e = errorRamp.isEmpty   ? "red"    : errorRamp.lowercased().replacingOccurrences(of: " ", with: "-")
        let i = infoRamp.isEmpty    ? p        : infoRamp.lowercased().replacingOccurrences(of: " ", with: "-")

        func tok(_ name: String, light lv: String, dark dv: String) -> SemanticToken {
            SemanticToken(name: name, type: .color, modeValues: [
                lightId: .alias(lv),
                darkId:  .alias(dv)
            ])
        }

        return [
            // ── Text ────────────────────────────────────────────
            tok("text/primary",      light: "color/\(n)/900",  dark: "color/\(n)/50"),
            tok("text/secondary",    light: "color/\(n)/600",  dark: "color/\(n)/400"),
            tok("text/tertiary",     light: "color/\(n)/400",  dark: "color/\(n)/600"),
            tok("text/disabled",     light: "color/\(n)/300",  dark: "color/\(n)/700"),
            tok("text/inverse",      light: "color/\(n)/50",   dark: "color/\(n)/900"),
            tok("text/on-primary",   light: "color/\(n)/50",   dark: "color/\(n)/50"),
            tok("text/link",         light: "color/\(p)/600",  dark: "color/\(p)/400"),
            tok("text/link-hover",   light: "color/\(p)/700",  dark: "color/\(p)/300"),
            tok("text/error",        light: "color/\(e)/600",  dark: "color/\(e)/400"),

            // ── Backgrounds ─────────────────────────────────────
            tok("bg/default",        light: "color/\(n)/50",   dark: "color/\(n)/950"),
            tok("bg/surface",        light: "color/\(n)/100",  dark: "color/\(n)/900"),
            tok("bg/card",           light: "color/\(n)/50",   dark: "color/\(n)/800"),
            tok("bg/sunken",         light: "color/\(n)/200",  dark: "color/\(n)/950"),
            tok("bg/primary",        light: "color/\(p)/500",  dark: "color/\(p)/500"),
            tok("bg/primary-hover",  light: "color/\(p)/600",  dark: "color/\(p)/400"),
            tok("bg/primary-subtle", light: "color/\(p)/50",   dark: "color/\(p)/950"),
            tok("bg/success",        light: "color/\(s)/50",   dark: "color/\(s)/950"),
            tok("bg/warning",        light: "color/\(w)/50",   dark: "color/\(w)/950"),
            tok("bg/error",          light: "color/\(e)/50",   dark: "color/\(e)/950"),
            tok("bg/info",           light: "color/\(i)/50",   dark: "color/\(i)/950"),

            // ── Borders ─────────────────────────────────────────
            tok("border/default",    light: "color/\(n)/200",  dark: "color/\(n)/700"),
            tok("border/strong",     light: "color/\(n)/400",  dark: "color/\(n)/500"),
            tok("border/subtle",     light: "color/\(n)/100",  dark: "color/\(n)/800"),
            tok("border/focus",      light: "color/\(p)/500",  dark: "color/\(p)/400"),
            tok("border/error",      light: "color/\(e)/500",  dark: "color/\(e)/400"),

            // ── Icons ───────────────────────────────────────────
            tok("icon/default",      light: "color/\(n)/500",  dark: "color/\(n)/400"),
            tok("icon/secondary",    light: "color/\(n)/400",  dark: "color/\(n)/600"),
            tok("icon/primary",      light: "color/\(p)/500",  dark: "color/\(p)/400"),
            tok("icon/on-primary",   light: "color/\(n)/50",   dark: "color/\(n)/50"),
            tok("icon/error",        light: "color/\(e)/500",  dark: "color/\(e)/400"),
            tok("icon/success",      light: "color/\(s)/500",  dark: "color/\(s)/400"),

            // ── Status ──────────────────────────────────────────
            tok("status/success-text", light: "color/\(s)/700", dark: "color/\(s)/300"),
            tok("status/warning-text", light: "color/\(w)/700", dark: "color/\(w)/300"),
            tok("status/error-text",   light: "color/\(e)/700", dark: "color/\(e)/300"),
            tok("status/info-text",    light: "color/\(i)/700", dark: "color/\(i)/300"),

            // ── Button ──────────────────────────────────────────
            tok("button/primary-bg",         light: "color/\(p)/500", dark: "color/\(p)/500"),
            tok("button/primary-bg-hover",   light: "color/\(p)/600", dark: "color/\(p)/400"),
            tok("button/primary-text",       light: "color/\(n)/50",  dark: "color/\(n)/50"),
            tok("button/secondary-bg",       light: "color/\(n)/100", dark: "color/\(n)/800"),
            tok("button/secondary-bg-hover", light: "color/\(n)/200", dark: "color/\(n)/700"),
            tok("button/secondary-text",     light: "color/\(n)/900", dark: "color/\(n)/50"),
            tok("button/destructive-bg",     light: "color/\(e)/500", dark: "color/\(e)/500"),
            tok("button/destructive-bg-hover",light:"color/\(e)/600", dark: "color/\(e)/400"),
            tok("button/destructive-text",   light: "color/\(n)/50",  dark: "color/\(n)/50"),
            tok("button/ghost-text",         light: "color/\(p)/600", dark: "color/\(p)/400"),
        ]
    }

    // MARK: - Auto-detect ramps

    func autoDetectRamps() {
        let names = rampNames.map { $0.lowercased() }
        func pick(_ keywords: [String]) -> String {
            for kw in keywords {
                if let found = rampNames.first(where: { $0.lowercased().contains(kw) }) {
                    return found
                }
            }
            return ""
        }
        brandRamp   = pick(["primary", "brand", "blue", "indigo", "violet"])
        neutralRamp = pick(["neutral", "gray", "grey", "slate", "zinc", "stone"])
        successRamp = pick(["success", "green", "emerald", "teal"])
        warningRamp = pick(["warning", "orange", "amber", "yellow"])
        errorRamp   = pick(["error", "danger", "red", "rose", "pink"])
        infoRamp    = pick(["info", "cyan", "sky"])

        // Fallbacks when auto-detect misses
        if brandRamp.isEmpty   { brandRamp   = rampNames.first ?? "" }
        if neutralRamp.isEmpty || neutralRamp == brandRamp {
            neutralRamp = rampNames.first(where: { $0 != brandRamp }) ?? ""
        }
    }
}

// MARK: - Ramp Picker (Grid of color strips)

struct RampPickerGrid: View {
    @Binding var selected: String
    let ramps: [ColorRamp]
    var exclude: [String] = []

    var available: [ColorRamp] { ramps.filter { !exclude.contains($0.name) } }

    var body: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 160), spacing: 10)], spacing: 10) {
            ForEach(available) { ramp in
                RampCard(ramp: ramp, isSelected: selected == ramp.name)
                    .onTapGesture { selected = ramp.name }
            }
        }
    }
}

struct RampCard: View {
    let ramp: ColorRamp
    let isSelected: Bool

    var swatches: [ColorSwatch] { ColorGenerator.generate(ramp: ramp) }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            // Color strip
            HStack(spacing: 2) {
                ForEach(swatches.prefix(9), id: \.step) { swatch in
                    Rectangle()
                        .fill(Color(hex: swatch.hex) ?? .gray)
                        .frame(height: 28)
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: 6))
            .overlay(
                RoundedRectangle(cornerRadius: 6)
                    .strokeBorder(isSelected ? Color.blue : Color.clear, lineWidth: 2)
            )

            Text(ramp.name)
                .font(.system(size: 12, weight: isSelected ? .semibold : .regular))
                .foregroundStyle(isSelected ? .blue : .primary)
        }
        .padding(10)
        .background(
            RoundedRectangle(cornerRadius: 10)
                .fill(isSelected ? Color.blue.opacity(0.06) : Color(nsColor: .controlBackgroundColor))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .strokeBorder(isSelected ? Color.blue.opacity(0.4) : Color(nsColor: .separatorColor), lineWidth: 1)
        )
    }
}

// MARK: - Compact Ramp Picker (for state colors)

struct RampPickerCompact: View {
    @Binding var selected: String
    let ramps: [ColorRamp]
    var allowNone: Bool = false

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                if allowNone {
                    CompactRampChip(name: "None", swatches: [], isSelected: selected.isEmpty)
                        .onTapGesture { selected = "" }
                }
                ForEach(ramps) { ramp in
                    CompactRampChip(
                        name: ramp.name,
                        swatches: ColorGenerator.generate(ramp: ramp),
                        isSelected: selected == ramp.name
                    )
                    .onTapGesture { selected = ramp.name }
                }
            }
            .padding(.vertical, 2)
        }
    }
}

struct CompactRampChip: View {
    let name: String
    let swatches: [ColorSwatch]
    let isSelected: Bool

    var body: some View {
        HStack(spacing: 4) {
            if !swatches.isEmpty {
                HStack(spacing: 1) {
                    ForEach([1, 4, 6], id: \.self) { idx in
                        if idx < swatches.count {
                            Circle()
                                .fill(Color(hex: swatches[idx].hex) ?? .gray)
                                .frame(width: 10, height: 10)
                        }
                    }
                }
            }
            Text(name)
                .font(.system(size: 12, weight: isSelected ? .semibold : .regular))
                .foregroundStyle(isSelected ? .blue : .primary)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 6)
        .background(isSelected ? Color.blue.opacity(0.1) : Color(nsColor: .controlBackgroundColor))
        .overlay(
            Capsule()
                .strokeBorder(isSelected ? Color.blue.opacity(0.5) : Color(nsColor: .separatorColor), lineWidth: 1)
        )
        .clipShape(Capsule())
    }
}

// MARK: - Token Preview Group

struct TokenPreviewGroup: View {
    let category: String
    let tokens: [SemanticToken]
    let resolver: TokenResolver?
    let ds: DesignSystem?

    var lightId: String { ds?.modes.first { $0.name == "Light" }?.id.uuidString ?? "" }
    var darkId:  String { ds?.modes.first { $0.name == "Dark" }?.id.uuidString ?? "" }

    func hex(for value: TokenValue?) -> String? {
        guard let value else { return nil }
        return resolver?.resolveValueToHex(value)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(category.uppercased())
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(.secondary)

            VStack(spacing: 2) {
                ForEach(tokens) { token in
                    let lightVal = token.modeValues[lightId]
                    let darkVal  = token.modeValues[darkId]
                    let lightHex = hex(for: lightVal)
                    let darkHex  = hex(for: darkVal)

                    HStack(spacing: 8) {
                        // Light swatch
                        if let h = lightHex {
                            RoundedRectangle(cornerRadius: 4)
                                .fill(Color(hex: h) ?? .gray)
                                .frame(width: 20, height: 20)
                                .overlay(RoundedRectangle(cornerRadius: 4).strokeBorder(Color.black.opacity(0.06)))
                        }

                        Text(token.name)
                            .font(.system(size: 11, design: .monospaced))
                            .frame(maxWidth: .infinity, alignment: .leading)

                        // Light alias label
                        if let v = lightVal {
                            Text(TokenResolver.displayValue(v))
                                .font(.system(size: 10, design: .monospaced))
                                .foregroundStyle(.secondary)
                                .lineLimit(1)
                        }

                        // Dark swatch
                        if let h = darkHex {
                            RoundedRectangle(cornerRadius: 4)
                                .fill(Color(hex: h) ?? .gray)
                                .frame(width: 20, height: 20)
                                .overlay(RoundedRectangle(cornerRadius: 4).strokeBorder(Color.black.opacity(0.06)))
                        }
                    }
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(Color(nsColor: .controlBackgroundColor))
                    .clipShape(RoundedRectangle(cornerRadius: 6))
                }
            }
        }
    }
}
