import SwiftUI
import AppKit

struct TypographyView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: TypoTab = .edit

    private var foundation: TypographyFoundation {
        projectStore.currentProject?.typography ?? TypographyFoundation()
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "textformat",
                title: "Typography",
                subtitle: "Font families, scale, and typographic roles (Display, H1–H4, Body, Caption…).",
                tokenCount: foundation.roles.count
            )
            TabBar(selected: $selectedTab)
            Divider()
            ScrollView {
                switch selectedTab {
                case .edit:     TypoEditTab()
                case .tokens:   TypoTokensTab()
                case .code:     TypoCodeTab()
                case .overview: TypoOverviewTab()
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }
}

enum TypoTab: String, CaseIterable {
    case edit = "Edit"
    case tokens = "Tokens"
    case code = "Code"
    case overview = "Overview"
}

// MARK: ─── Edit Tab ────────────────────────────────────────────

struct TypoEditTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    private var typo: TypographyFoundation {
        projectStore.currentProject?.typography ?? TypographyFoundation()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 32) {

            // ── Scale config ──────────────────────────────────
            ScaleConfigPanel(typo: typo)

            Divider()

            // ── Font families ─────────────────────────────────
            VStack(alignment: .leading, spacing: 12) {
                Label("FAMILIES", systemImage: "textformat.abc")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(.secondary)
                Text("Each card is a font family with its available weights.")
                    .font(.caption).foregroundStyle(.secondary)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(alignment: .top, spacing: 16) {
                        ForEach(typo.families) { family in
                            FontFamilyCard(family: family)
                                .frame(width: 240)
                        }
                        AddFamilyButton()
                    }
                    .padding(.bottom, 4)
                }
            }

            Divider()

            // ── Roles ─────────────────────────────────────────
            TypographicRolesPanel(typo: typo)
        }
        .padding(24)
    }
}

// MARK: ─── Scale Config Panel ─────────────────────────────────

struct ScaleConfigPanel: View {
    @EnvironmentObject var projectStore: ProjectStore
    let typo: TypographyFoundation

    var body: some View {
        HStack(spacing: 24) {
            // Base size
            VStack(alignment: .leading, spacing: 6) {
                Text("BASE SIZE").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                HStack(spacing: 6) {
                    TextField("16", value: bind(\.baseSize), format: .number)
                        .textFieldStyle(.roundedBorder).frame(width: 64)
                    Text("px").font(.caption).foregroundStyle(.secondary)
                }
            }

            // Ratio
            VStack(alignment: .leading, spacing: 6) {
                Text("SCALE RATIO").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                Picker("", selection: bind(\.scaleRatio)) {
                    ForEach(ScaleRatio.allCases.filter { $0 != .custom }, id: \.self) {
                        Text($0.label).tag($0)
                    }
                }.frame(width: 220)
            }

            // Steps above
            VStack(alignment: .leading, spacing: 6) {
                Text("STEPS ABOVE").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                Stepper("\(typo.stepsAbove)", value: bind(\.stepsAbove), in: 1...10).frame(width: 100)
            }

            // Steps below
            VStack(alignment: .leading, spacing: 6) {
                Text("STEPS BELOW").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                Stepper("\(typo.stepsBelow)", value: bind(\.stepsBelow), in: 0...6).frame(width: 100)
            }

            Spacer()

            // Scale preview (mini)
            VStack(alignment: .trailing, spacing: 2) {
                let steps = TypeScaleGenerator.generate(foundation: typo)
                ForEach(steps.reversed().prefix(5)) { step in
                    Text(String(format: "%.1fpx", step.sizePx))
                        .font(.system(size: step.sizePx * 0.4 + 6, design: .rounded))
                        .foregroundStyle(.primary.opacity(0.6 + step.sizePx / 100))
                        .lineLimit(1)
                }
            }
        }
    }

    private func bind<V>(_ kp: WritableKeyPath<TypographyFoundation, V>) -> Binding<V> {
        Binding(
            get: { projectStore.currentProject?.typography[keyPath: kp] ?? TypographyFoundation()[keyPath: kp] },
            set: { val in projectStore.update { $0.typography[keyPath: kp] = val } }
        )
    }
}

// MARK: ─── Typographic Roles Panel ────────────────────────────

struct TypographicRolesPanel: View {
    @EnvironmentObject var projectStore: ProjectStore
    let typo: TypographyFoundation

    private var steps: [TypeStep] {
        TypeScaleGenerator.generate(foundation: typo)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Label("ROLES", systemImage: "list.bullet.rectangle")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(.secondary)
                Text("Semantic names mapped to scale steps — these become your design tokens.")
                    .font(.caption).foregroundStyle(.secondary)
                Spacer()
                Button {
                    projectStore.update { ds in
                        ds.typography.roles.append(
                            TypographicRole(name: "Custom", scaleStep: 0, familyName: typo.families.first?.name ?? "body")
                        )
                    }
                } label: { Label("Add Role", systemImage: "plus") }
                .buttonStyle(.bordered)
            }

            // Table header
            RoleTableHeader()

            // Rows
            VStack(spacing: 0) {
                ForEach(typo.roles) { role in
                    RoleRow(role: role, steps: steps, families: typo.families)
                    Divider()
                }
            }
            .background(Color(nsColor: .controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }
    }
}

struct RoleTableHeader: View {
    var body: some View {
        HStack(spacing: 0) {
            Text("NAME").frame(width: 140, alignment: .leading)
            Text("SCALE STEP").frame(width: 100, alignment: .leading)
            Text("SIZE").frame(width: 60, alignment: .leading)
            Text("FAMILY").frame(width: 100, alignment: .leading)
            Text("WEIGHT").frame(width: 80, alignment: .leading)
            Text("LINE H.").frame(width: 70, alignment: .leading)
            Text("TRACKING").frame(width: 80, alignment: .leading)
            Text("PREVIEW").frame(maxWidth: .infinity, alignment: .leading)
        }
        .font(.system(size: 10, weight: .semibold))
        .foregroundStyle(.secondary)
        .padding(.horizontal, 16)
        .padding(.vertical, 6)
    }
}

struct RoleRow: View {
    @EnvironmentObject var projectStore: ProjectStore
    let role: TypographicRole
    let steps: [TypeStep]
    let families: [TypographyFamily]

    private var resolvedStep: TypeStep? {
        steps.first { $0.step == role.scaleStep }
    }

    private var resolvedFamily: TypographyFamily? {
        families.first { $0.name == role.familyName }
    }

    private let weightNames: [Int: String] = [
        100: "Thin", 200: "ExtraLight", 300: "Light", 400: "Regular",
        500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black"
    ]

    var body: some View {
        HStack(spacing: 0) {
            // Name (editable)
            TextField("Role name", text: bind(\.name))
                .textFieldStyle(.plain)
                .font(.system(.subheadline, weight: .medium))
                .frame(width: 140)

            // Scale step picker
            Picker("", selection: bind(\.scaleStep)) {
                ForEach(steps) { step in
                    Text(step.tokenName).tag(step.step)
                }
            }
            .labelsHidden()
            .frame(width: 100)

            // Resolved size
            Text(resolvedStep.map { String(format: "%.1fpx", $0.sizePx) } ?? "–")
                .font(.system(.caption, design: .monospaced))
                .foregroundStyle(.secondary)
                .frame(width: 60, alignment: .leading)

            // Family picker
            Picker("", selection: bind(\.familyName)) {
                ForEach(families) { fam in
                    Text(fam.name).tag(fam.name)
                }
                if families.isEmpty {
                    Text("(no families)").tag("")
                }
            }
            .labelsHidden()
            .frame(width: 100)

            // Weight picker
            Picker("", selection: bind(\.weight)) {
                let availableWeights = resolvedFamily?.selectedWeights ?? [400]
                ForEach(availableWeights, id: \.self) { w in
                    Text(weightNames[w] ?? "\(w)").tag(w)
                }
            }
            .labelsHidden()
            .frame(width: 80)

            // Line height
            TextField("1.5", value: bind(\.lineHeight), format: .number)
                .textFieldStyle(.plain)
                .font(.system(.caption, design: .monospaced))
                .frame(width: 70)

            // Letter spacing
            TextField("0", text: bind(\.letterSpacing))
                .textFieldStyle(.plain)
                .font(.system(.caption, design: .monospaced))
                .frame(width: 80)

            // Live preview
            if let step = resolvedStep, let fam = resolvedFamily {
                Text("Ag — \(role.name)")
                    .font(.custom(fam.fontFamily, size: min(step.sizePx, 28)))
                    .fontWeight(Font.Weight(numeric: role.weight))
                    .lineLimit(1)
                    .frame(maxWidth: .infinity, alignment: .leading)
            } else {
                Text("Add a family first")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }

            // Delete
            Button {
                projectStore.update { ds in
                    ds.typography.roles.removeAll { $0.id == role.id }
                }
            } label: {
                Image(systemName: "trash")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .buttonStyle(.plain)
            .padding(.leading, 8)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
    }

    private func bind<V>(_ kp: WritableKeyPath<TypographicRole, V>) -> Binding<V> {
        Binding(
            get: {
                projectStore.currentProject?.typography.roles
                    .first(where: { $0.id == role.id })?[keyPath: kp]
                    ?? role[keyPath: kp]
            },
            set: { val in
                projectStore.update { ds in
                    if let i = ds.typography.roles.firstIndex(where: { $0.id == role.id }) {
                        ds.typography.roles[i][keyPath: kp] = val
                    }
                }
            }
        )
    }
}

// MARK: ─── Font Family Card ───────────────────────────────────

struct FontFamilyCard: View {
    @EnvironmentObject var projectStore: ProjectStore
    let family: TypographyFamily

    private let allWeights: [Int] = [100, 200, 300, 400, 500, 600, 700, 800, 900]
    private let weightNames: [Int: String] = [
        100: "Thin", 200: "ExtraLight", 300: "Light", 400: "Regular",
        500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black"
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header: editable name
            HStack {
                TextField("family name", text: nameBinding)
                    .textFieldStyle(.plain)
                    .font(.headline)
                Spacer()
                Button { deleteSelf() } label: {
                    Image(systemName: "xmark").font(.caption).foregroundStyle(.secondary)
                }.buttonStyle(.plain)
            }

            // Font picker
            Picker("", selection: familyBinding) {
                ForEach(availableFamilies.prefix(200), id: \.self) { Text($0).tag($0) }
            }

            // Weight chips
            Text("WEIGHTS").font(.system(size: 9, weight: .semibold)).foregroundStyle(.secondary)
            FlowLayout(spacing: 4) {
                ForEach(allWeights, id: \.self) { w in
                    let on = family.selectedWeights.contains(w)
                    Button("\(w)") { toggleWeight(w) }
                        .font(.system(size: 11))
                        .padding(.horizontal, 8).padding(.vertical, 4)
                        .background(on ? Color.blue : Color.secondary.opacity(0.1))
                        .foregroundStyle(on ? .white : .primary)
                        .clipShape(RoundedRectangle(cornerRadius: 4))
                        .buttonStyle(.plain)
                }
            }

            // Named weights
            Text("FIGMA NAMES").font(.system(size: 9, weight: .semibold)).foregroundStyle(.secondary)
            FlowLayout(spacing: 4) {
                ForEach(family.selectedWeights, id: \.self) { w in
                    if let nm = weightNames[w] {
                        Text(nm)
                            .font(.system(size: 11))
                            .padding(.horizontal, 8).padding(.vertical, 4)
                            .background(Color.blue)
                            .foregroundStyle(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 4))
                    }
                }
            }

            // Live preview per selected weight
            VStack(alignment: .leading, spacing: 3) {
                ForEach(family.selectedWeights.prefix(4), id: \.self) { w in
                    HStack(spacing: 6) {
                        Text("\(w)")
                            .font(.system(size: 9, design: .monospaced))
                            .foregroundStyle(.secondary)
                            .frame(width: 28, alignment: .trailing)
                        Text("The quick brown fox")
                            .font(.custom(family.fontFamily, size: 13))
                            .fontWeight(Font.Weight(numeric: w))
                            .lineLimit(1)
                    }
                }
            }
        }
        .padding(16)
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    private var nameBinding: Binding<String> {
        Binding(
            get: { projectStore.currentProject?.typography.families.first(where: { $0.id == family.id })?.name ?? family.name },
            set: { v in projectStore.update { ds in
                if let i = ds.typography.families.firstIndex(where: { $0.id == family.id }) {
                    ds.typography.families[i].name = v
                }
            }}
        )
    }

    private var familyBinding: Binding<String> {
        Binding(
            get: { projectStore.currentProject?.typography.families.first(where: { $0.id == family.id })?.fontFamily ?? family.fontFamily },
            set: { v in projectStore.update { ds in
                if let i = ds.typography.families.firstIndex(where: { $0.id == family.id }) {
                    ds.typography.families[i].fontFamily = v
                }
            }}
        )
    }

    private func toggleWeight(_ weight: Int) {
        projectStore.update { ds in
            guard let i = ds.typography.families.firstIndex(where: { $0.id == family.id }) else { return }
            if ds.typography.families[i].selectedWeights.contains(weight) {
                ds.typography.families[i].selectedWeights.removeAll { $0 == weight }
            } else {
                ds.typography.families[i].selectedWeights.append(weight)
                ds.typography.families[i].selectedWeights.sort()
            }
        }
    }

    private func deleteSelf() {
        projectStore.update { ds in ds.typography.families.removeAll { $0.id == family.id } }
    }

    private var availableFamilies: [String] { NSFontManager.shared.availableFontFamilies }
}

struct AddFamilyButton: View {
    @EnvironmentObject var projectStore: ProjectStore
    var body: some View {
        Button {
            projectStore.update { ds in
                ds.typography.families.append(TypographyFamily(name: "new", fontFamily: "Inter"))
            }
        } label: {
            VStack(spacing: 8) {
                Image(systemName: "plus.circle").font(.title2).foregroundStyle(.secondary)
                Text("Add family").font(.caption).foregroundStyle(.secondary)
            }
            .frame(width: 240, height: 120)
            .background(Color.secondary.opacity(0.06))
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(RoundedRectangle(cornerRadius: 12).strokeBorder(Color.secondary.opacity(0.2), style: StrokeStyle(lineWidth: 1, dash: [4])))
        }
        .buttonStyle(.plain)
    }
}

// MARK: ─── Tokens Tab ─────────────────────────────────────────

struct TypoTokensTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    var body: some View {
        let typo = projectStore.currentProject?.typography ?? TypographyFoundation()
        let steps = TypeScaleGenerator.generate(foundation: typo)

        VStack(alignment: .leading, spacing: 24) {
            // Roles tokens
            VStack(alignment: .leading, spacing: 6) {
                Text("ROLES").font(.system(size: 11, weight: .semibold)).foregroundStyle(.secondary)
                VStack(spacing: 2) {
                    ForEach(typo.roles) { role in
                        let step = steps.first { $0.step == role.scaleStep }
                        let sizeStr = step.map { String(format: "%.1fpx / %.3frem", $0.sizePx, $0.sizeRem) } ?? "–"
                        TokenRow(
                            name: "typography/\(role.tokenName)",
                            value: "\(sizeStr) · w\(role.weight) · lh\(role.lineHeight)",
                            color: nil
                        )
                    }
                }
                .background(Color(nsColor: .controlBackgroundColor))
                .clipShape(RoundedRectangle(cornerRadius: 8))
            }

            // Scale primitives
            VStack(alignment: .leading, spacing: 6) {
                Text("SCALE PRIMITIVES").font(.system(size: 11, weight: .semibold)).foregroundStyle(.secondary)
                VStack(spacing: 2) {
                    ForEach(steps) { step in
                        TokenRow(
                            name: "font/size/\(step.tokenName)",
                            value: "\(String(format: "%.1f", step.sizePx))px / \(String(format: "%.4f", step.sizeRem))rem",
                            color: nil
                        )
                    }
                }
                .background(Color(nsColor: .controlBackgroundColor))
                .clipShape(RoundedRectangle(cornerRadius: 8))
            }
        }
        .padding(24)
    }
}

// MARK: ─── Code Tab ───────────────────────────────────────────

struct TypoCodeTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var format: TypoCodeFormat = .css
    @State private var copied = false

    enum TypoCodeFormat: String, CaseIterable {
        case css = "CSS Variables"
        case swift = "Swift"
    }

    var body: some View {
        let typo = projectStore.currentProject?.typography ?? TypographyFoundation()
        let code = format == .css ? generateCSS(typo) : generateSwift(typo)

        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Picker("Format", selection: $format) {
                    ForEach(TypoCodeFormat.allCases, id: \.self) { Text($0.rawValue).tag($0) }
                }
                .pickerStyle(.segmented).frame(width: 240)
                Spacer()
                Button {
                    NSPasteboard.general.clearContents()
                    NSPasteboard.general.setString(code, forType: .string)
                    withAnimation { copied = true }
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { copied = false }
                } label: { Label(copied ? "Copied!" : "Copy", systemImage: copied ? "checkmark" : "doc.on.doc") }
                .buttonStyle(.bordered)
            }
            .padding(24)
            Divider()
            ScrollView {
                Text(code)
                    .font(.system(.caption, design: .monospaced))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(24)
                    .textSelection(.enabled)
            }
        }
    }

    private func generateCSS(_ typo: TypographyFoundation) -> String {
        let steps = TypeScaleGenerator.generate(foundation: typo)
        var lines = [":root {"]

        lines.append("  /* === Scale Primitives === */")
        for step in steps {
            lines.append("  --font-size-\(step.tokenName): \(String(format: "%.4f", step.sizeRem))rem; /* \(String(format: "%.1f", step.sizePx))px */")
        }

        lines.append("")
        lines.append("  /* === Font Families === */")
        for fam in typo.families {
            lines.append("  --font-family-\(fam.name): '\(fam.fontFamily)', sans-serif;")
        }

        lines.append("")
        lines.append("  /* === Typographic Roles === */")
        for role in typo.roles {
            let step = steps.first { $0.step == role.scaleStep }
            let sizePx = step.map { String(format: "%.1f", $0.sizePx) } ?? "16"
            let sizeRem = step.map { String(format: "%.4f", $0.sizeRem) } ?? "1.0000"
            let family = typo.families.first { $0.name == role.familyName }?.fontFamily ?? "inherit"
            lines.append("  /* \(role.name) */")
            lines.append("  --typo-\(role.tokenName)-size: \(sizeRem)rem; /* \(sizePx)px */")
            lines.append("  --typo-\(role.tokenName)-weight: \(role.weight);")
            lines.append("  --typo-\(role.tokenName)-line-height: \(role.lineHeight);")
            lines.append("  --typo-\(role.tokenName)-letter-spacing: \(role.letterSpacing);")
            lines.append("  --typo-\(role.tokenName)-family: var(--font-family-\(role.familyName), '\(family)');")
        }

        lines.append("}")
        return lines.joined(separator: "\n")
    }

    private func generateSwift(_ typo: TypographyFoundation) -> String {
        let steps = TypeScaleGenerator.generate(foundation: typo)
        var lines = ["import SwiftUI", "", "// MARK: - Typography Tokens", ""]

        lines.append("extension Font {")
        lines.append("    // Scale primitives")
        for step in steps {
            lines.append("    static let \(step.tokenName): Font = .system(size: \(String(format: "%.1f", step.sizePx)))")
        }
        lines.append("")
        lines.append("    // Typographic roles")
        for role in typo.roles {
            let step = steps.first { $0.step == role.scaleStep }
            let size = step.map { String(format: "%.1f", $0.sizePx) } ?? "16.0"
            let family = typo.families.first { $0.name == role.familyName }?.fontFamily ?? "SF Pro"
            lines.append("    static let \(role.tokenName): Font = .custom(\"\(family)\", size: \(size)).weight(.\(swiftWeight(role.weight)))")
        }
        lines.append("}")
        return lines.joined(separator: "\n")
    }

    private func swiftWeight(_ w: Int) -> String {
        switch w {
        case 100: return "ultraLight"
        case 200: return "thin"
        case 300: return "light"
        case 400: return "regular"
        case 500: return "medium"
        case 600: return "semibold"
        case 700: return "bold"
        case 800: return "heavy"
        case 900: return "black"
        default: return "regular"
        }
    }
}

// MARK: ─── Overview Tab ───────────────────────────────────────

struct TypoOverviewTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    var body: some View {
        let typo = projectStore.currentProject?.typography ?? TypographyFoundation()
        let steps = TypeScaleGenerator.generate(foundation: typo)

        VStack(alignment: .leading, spacing: 0) {
            ForEach(typo.roles) { role in
                TypoOverviewRow(role: role, steps: steps, families: typo.families)
                Divider().padding(.horizontal, 24)
            }
        }
        .padding(.vertical, 8)
    }
}

struct TypoOverviewRow: View {
    let role: TypographicRole
    let steps: [TypeStep]
    let families: [TypographyFamily]

    private var step: TypeStep? { steps.first { $0.step == role.scaleStep } }
    private var family: TypographyFamily? { families.first { $0.name == role.familyName } }

    var body: some View {
        HStack(alignment: .center, spacing: 20) {
            // Meta
            VStack(alignment: .trailing, spacing: 2) {
                Text(role.name)
                    .font(.system(size: 11, weight: .semibold))
                HStack(spacing: 6) {
                    Text(step.map { String(format: "%.0fpx", $0.sizePx) } ?? "–")
                    Text("w\(role.weight)")
                    Text("lh \(String(format: "%.1f", role.lineHeight))")
                }
                .font(.system(size: 10, design: .monospaced))
                .foregroundStyle(.secondary)
            }
            .frame(width: 120, alignment: .trailing)

            // Preview
            if let step, let fam = family {
                Text("The quick brown fox jumps over the lazy dog")
                    .font(.custom(fam.fontFamily, size: min(step.sizePx, 48)))
                    .fontWeight(Font.Weight(numeric: role.weight))
                    .lineLimit(1)
                    .frame(maxWidth: .infinity, alignment: .leading)
            } else {
                Text("Add families in Edit tab")
                    .font(.caption).foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 12)
    }
}

// MARK: ─── FlowLayout ─────────────────────────────────────────

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let rows = computeRows(proposal: proposal, subviews: subviews)
        let height = rows.map { $0.map { $0.sizeThatFits(.unspecified).height }.max() ?? 0 }.reduce(0, +)
            + CGFloat(max(rows.count - 1, 0)) * spacing
        return CGSize(width: proposal.width ?? 0, height: height)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let rows = computeRows(proposal: proposal, subviews: subviews)
        var y = bounds.minY
        for row in rows {
            var x = bounds.minX
            let rowH = row.map { $0.sizeThatFits(.unspecified).height }.max() ?? 0
            for view in row {
                let size = view.sizeThatFits(.unspecified)
                view.place(at: CGPoint(x: x, y: y), proposal: ProposedViewSize(size))
                x += size.width + spacing
            }
            y += rowH + spacing
        }
    }

    private func computeRows(proposal: ProposedViewSize, subviews: Subviews) -> [[LayoutSubview]] {
        var rows: [[LayoutSubview]] = [[]]
        var x: CGFloat = 0
        let maxW = proposal.width ?? .infinity
        for view in subviews {
            let w = view.sizeThatFits(.unspecified).width
            if x + w > maxW, !rows[rows.endIndex - 1].isEmpty { rows.append([]); x = 0 }
            rows[rows.endIndex - 1].append(view)
            x += w + spacing
        }
        return rows
    }
}

// MARK: ─── Font.Weight from numeric ───────────────────────────

extension Font.Weight {
    init(numeric: Int) {
        switch numeric {
        case 100: self = .ultraLight
        case 200: self = .thin
        case 300: self = .light
        case 400: self = .regular
        case 500: self = .medium
        case 600: self = .semibold
        case 700: self = .bold
        case 800: self = .heavy
        case 900: self = .black
        default:  self = .regular
        }
    }
}
