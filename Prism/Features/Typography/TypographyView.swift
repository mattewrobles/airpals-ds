import SwiftUI
import AppKit

struct TypographyView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: TypoTab = .edit

    private var foundation: TypographyFoundation {
        projectStore.currentProject?.typography ?? TypographyFoundation()
    }

    private var tokenCount: Int {
        let scale = TypeScaleGenerator.generate(foundation: foundation)
        return scale.count * max(foundation.families.count, 1)
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "textformat",
                title: "Typography",
                subtitle: "Font families, weights, and grouped typographic scales.",
                tokenCount: tokenCount
            )
            TabBar(selected: $selectedTab)
            Divider()
            ScrollView {
                switch selectedTab {
                case .edit:   TypoEditTab()
                case .tokens: TypoTokensTab()
                case .code:   TypoCodeTab()
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

// MARK: - Edit Tab

struct TypoEditTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    private var typo: TypographyFoundation {
        projectStore.currentProject?.typography ?? TypographyFoundation()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 28) {

            // Scale config row
            HStack(spacing: 20) {
                VStack(alignment: .leading, spacing: 4) {
                    Label("BASE SIZE", systemImage: "textformat.size")
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundStyle(.secondary)
                    HStack {
                        TextField("16", value: binding(\.baseSize), format: .number)
                            .textFieldStyle(.roundedBorder)
                            .frame(width: 64)
                        Text("px").font(.caption).foregroundStyle(.secondary)
                    }
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text("SCALE RATIO")
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundStyle(.secondary)
                    Picker("", selection: binding(\.scaleRatio)) {
                        ForEach(ScaleRatio.allCases.filter { $0 != .custom }, id: \.self) {
                            Text($0.label).tag($0)
                        }
                    }
                    .frame(width: 220)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text("STEPS ABOVE BASE")
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundStyle(.secondary)
                    Stepper("\(typo.stepsAbove)", value: binding(\.stepsAbove), in: 1...10)
                        .frame(width: 100)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text("STEPS BELOW")
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundStyle(.secondary)
                    Stepper("\(typo.stepsBelow)", value: binding(\.stepsBelow), in: 0...6)
                        .frame(width: 100)
                }
            }

            Divider()

            // Families section
            Text("TYPOGRAPHIES")
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.secondary)
            Text("Each card defines a primitive font-family and its available font-weight primitives.")
                .font(.caption)
                .foregroundStyle(.secondary)

            HStack(alignment: .top, spacing: 16) {
                ForEach(typo.families) { family in
                    FontFamilyCard(family: family)
                        .frame(width: 240)
                }
                // Add family button
                Button {
                    projectStore.update { ds in
                        ds.typography.families.append(TypographyFamily(name: "new", fontFamily: "Inter"))
                    }
                } label: {
                    VStack(spacing: 8) {
                        Image(systemName: "plus.circle")
                            .font(.title2)
                            .foregroundStyle(.secondary)
                        Text("Add typography")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    .frame(width: 240, height: 160)
                    .background(Color.secondary.opacity(0.06))
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .overlay(RoundedRectangle(cornerRadius: 12).strokeBorder(Color.secondary.opacity(0.2), style: StrokeStyle(lineWidth: 1, dash: [4])))
                }
                .buttonStyle(.plain)
            }

            Divider()

            // Generated scale preview
            Text("GENERATED SCALE")
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.secondary)
            TypeScalePreview(foundation: typo)

            // Generated primitives list
            Text("GENERATED PRIMITIVES")
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.secondary)
            Text("Edit any value — changes flow into every role that aliases it.")
                .font(.caption)
                .foregroundStyle(.secondary)

            GeneratedPrimitivesPanel(foundation: typo)
        }
        .padding(24)
    }

    private func binding<V>(_ kp: WritableKeyPath<TypographyFoundation, V>) -> Binding<V> {
        Binding(
            get: { projectStore.currentProject?.typography[keyPath: kp] ?? TypographyFoundation()[keyPath: kp] },
            set: { val in projectStore.update { $0.typography[keyPath: kp] = val } }
        )
    }
}

// MARK: - Font Family Card

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
            // Header
            HStack {
                Text(family.name).font(.headline)
                Spacer()
                Button { deleteSelf() } label: {
                    Image(systemName: "xmark").font(.caption).foregroundStyle(.secondary)
                }
                .buttonStyle(.plain)
            }

            // Font family picker
            Picker("", selection: familyBinding) {
                ForEach(availableFamilies, id: \.self) { Text($0).tag($0) }
            }

            // Numeric weights
            Text("NUMERIC WEIGHTS").font(.system(size: 9, weight: .semibold)).foregroundStyle(.secondary)
            FlowLayout(spacing: 4) {
                ForEach(allWeights, id: \.self) { weight in
                    let isSelected = family.selectedWeights.contains(weight)
                    Button("\(weight)") {
                        toggleWeight(weight)
                    }
                    .font(.system(size: 11))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(isSelected ? Color.blue : Color.secondary.opacity(0.1))
                    .foregroundStyle(isSelected ? .white : .primary)
                    .clipShape(RoundedRectangle(cornerRadius: 4))
                    .buttonStyle(.plain)
                }
            }

            // Named weights (Figma style)
            Text("NAMED WEIGHTS (FIGMA STYLE NAMES)").font(.system(size: 9, weight: .semibold)).foregroundStyle(.secondary)
            FlowLayout(spacing: 4) {
                ForEach(family.selectedWeights, id: \.self) { weight in
                    if let name = weightNames[weight] {
                        Text(name)
                            .font(.system(size: 11))
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.blue)
                            .foregroundStyle(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 4))
                    }
                }
            }

            // Preview
            VStack(alignment: .leading, spacing: 4) {
                ForEach(family.selectedWeights.prefix(3), id: \.self) { weight in
                    Text("The quick brown fox ju...")
                        .font(.custom(family.fontFamily, size: 13))
                        .fontWeight(Font.Weight(numeric: weight))
                        .lineLimit(1)
                }
            }
        }
        .padding(16)
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    private var familyBinding: Binding<String> {
        Binding(
            get: { projectStore.currentProject?.typography.families.first(where: { $0.id == family.id })?.fontFamily ?? family.fontFamily },
            set: { val in
                projectStore.update { ds in
                    if let i = ds.typography.families.firstIndex(where: { $0.id == family.id }) {
                        ds.typography.families[i].fontFamily = val
                    }
                }
            }
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
        projectStore.update { ds in
            ds.typography.families.removeAll { $0.id == family.id }
        }
    }

    private var availableFamilies: [String] {
        NSFontManager.shared.availableFontFamilies
    }
}

// MARK: - Type Scale Preview

struct TypeScalePreview: View {
    let foundation: TypographyFoundation
    @State private var sampleText = "The quick brown fox"

    var body: some View {
        let steps = TypeScaleGenerator.generate(foundation: foundation)
        VStack(alignment: .leading, spacing: 0) {
            ForEach(steps.reversed()) { step in
                HStack(alignment: .center, spacing: 16) {
                    Text(step.tokenName)
                        .font(.system(size: 10, design: .monospaced))
                        .foregroundStyle(.secondary)
                        .frame(width: 120, alignment: .trailing)
                    Text(String(format: "%.0fpx", step.sizePx))
                        .font(.system(size: 10, design: .monospaced))
                        .foregroundStyle(.secondary)
                        .frame(width: 40)
                    Text(sampleText)
                        .font(
                            foundation.families.first.map {
                                .custom($0.fontFamily, size: step.sizePx)
                            } ?? .system(size: step.sizePx)
                        )
                        .lineLimit(1)
                    Spacer()
                }
                .padding(.vertical, 6)
                Divider()
            }
        }
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

// MARK: - Generated Primitives Panel

struct GeneratedPrimitivesPanel: View {
    let foundation: TypographyFoundation

    var body: some View {
        let steps = TypeScaleGenerator.generate(foundation: foundation)
        HStack(alignment: .top, spacing: 24) {
            // Families
            VStack(alignment: .leading, spacing: 4) {
                Text("FAMILIES").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                ForEach(foundation.families) { fam in
                    Text("font/family/\(fam.name.lowercased()) \(fam.fontFamily)")
                        .font(.system(size: 11, design: .monospaced))
                }
            }

            // Sizes
            VStack(alignment: .leading, spacing: 4) {
                Text("SIZES").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                ForEach(steps) { step in
                    Text("font/size/\(step.tokenName)  \(String(format: "%.2f", step.sizeRem))rem")
                        .font(.system(size: 11, design: .monospaced))
                }
            }

            // Letter spacing
            VStack(alignment: .leading, spacing: 4) {
                Text("LETTER SPACING").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                ForEach(foundation.letterSpacingScale.values) { ls in
                    Text("font/letter-spacing/\(ls.step)  \(ls.value)")
                        .font(.system(size: 11, design: .monospaced))
                }
            }
        }
        .padding(16)
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

// MARK: - Tokens Tab

struct TypoTokensTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    var body: some View {
        let foundation = projectStore.currentProject?.typography ?? TypographyFoundation()
        let steps = TypeScaleGenerator.generate(foundation: foundation)
        VStack(alignment: .leading, spacing: 16) {
            ForEach(foundation.families) { fam in
                VStack(alignment: .leading, spacing: 6) {
                    Text(fam.name).font(.headline)
                    ForEach(steps) { step in
                        TokenRow(
                            name: "font/\(fam.name.lowercased())/\(step.tokenName)",
                            value: "\(String(format: "%.0f", step.sizePx))px / \(String(format: "%.3f", step.sizeRem))rem",
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

// MARK: - Code Tab

struct TypoCodeTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var format: TypoCodeFormat = .css
    @State private var copied = false

    enum TypoCodeFormat: String, CaseIterable {
        case css = "CSS Variables"
        case swift = "Swift"
    }

    var body: some View {
        let foundation = projectStore.currentProject?.typography ?? TypographyFoundation()
        let code = format == .css ? generateCSS(foundation) : generateSwift(foundation)

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
                } label: {
                    Label(copied ? "Copied!" : "Copy", systemImage: copied ? "checkmark" : "doc.on.doc")
                }
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

    private func generateCSS(_ f: TypographyFoundation) -> String {
        let steps = TypeScaleGenerator.generate(foundation: f)
        var lines = [":root {", "  /* Font Sizes */"]
        for step in steps {
            lines.append("  --font-size-\(step.tokenName): \(String(format: "%.4f", step.sizeRem))rem;")
        }
        lines.append("")
        lines.append("  /* Font Families */")
        for fam in f.families {
            lines.append("  --font-family-\(fam.name.lowercased()): '\(fam.fontFamily)', sans-serif;")
        }
        lines.append("}")
        return lines.joined(separator: "\n")
    }

    private func generateSwift(_ f: TypographyFoundation) -> String {
        let steps = TypeScaleGenerator.generate(foundation: f)
        var lines = ["import SwiftUI", "", "extension Font {", "    enum Size {"]
        for step in steps {
            lines.append("        static let \(step.tokenName): CGFloat = \(String(format: "%.1f", step.sizePx))")
        }
        lines.append("    }")
        lines.append("}")
        return lines.joined(separator: "\n")
    }
}

// MARK: - Overview Tab

struct TypoOverviewTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    var body: some View {
        let foundation = projectStore.currentProject?.typography ?? TypographyFoundation()
        let steps = TypeScaleGenerator.generate(foundation: foundation)
        VStack(alignment: .leading, spacing: 0) {
            ForEach(steps.reversed()) { step in
                HStack(alignment: .firstTextBaseline, spacing: 24) {
                    VStack(alignment: .trailing, spacing: 2) {
                        Text(step.tokenName).font(.system(size: 11, design: .monospaced)).foregroundStyle(.secondary)
                        Text(String(format: "%.0fpx", step.sizePx)).font(.system(size: 10)).foregroundStyle(.secondary)
                    }
                    .frame(width: 80, alignment: .trailing)

                    Text("The quick brown fox jumps over the lazy dog")
                        .font(
                            foundation.families.first.map {
                                .custom($0.fontFamily, size: step.sizePx)
                            } ?? .system(size: step.sizePx)
                        )
                        .lineLimit(1)
                }
                .padding(.horizontal, 24)
                .padding(.vertical, 10)
                Divider().padding(.horizontal, 24)
            }
        }
        .padding(.vertical, 8)
    }
}

// MARK: - Flow Layout (for weight chips)

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
            let rowHeight = row.map { $0.sizeThatFits(.unspecified).height }.max() ?? 0
            for view in row {
                let size = view.sizeThatFits(.unspecified)
                view.place(at: CGPoint(x: x, y: y), proposal: ProposedViewSize(size))
                x += size.width + spacing
            }
            y += rowHeight + spacing
        }
    }

    private func computeRows(proposal: ProposedViewSize, subviews: Subviews) -> [[LayoutSubview]] {
        var rows: [[LayoutSubview]] = [[]]
        var x: CGFloat = 0
        let maxWidth = proposal.width ?? .infinity
        for view in subviews {
            let w = view.sizeThatFits(.unspecified).width
            if x + w > maxWidth, !rows[rows.endIndex - 1].isEmpty {
                rows.append([])
                x = 0
            }
            rows[rows.endIndex - 1].append(view)
            x += w + spacing
        }
        return rows
    }
}

// MARK: - Font.Weight from numeric

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
        default: self = .regular
        }
    }
}
