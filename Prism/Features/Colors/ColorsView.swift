import SwiftUI

struct ColorsView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: ColorTab = .edit

    var body: some View {
        VStack(spacing: 0) {
            // Header
            SectionHeader(
                icon: "paintpalette.fill",
                title: "Colors",
                subtitle: "OKLCH color ramps, standalone colors, and accessibility contrast reporting.",
                tokenCount: tokenCount
            )

            // Tab bar
            TabBar(selected: $selectedTab)

            Divider()

            // Content
            ScrollView {
                switch selectedTab {
                case .edit:
                    ColorEditTab()
                case .tokens:
                    ColorTokensTab()
                case .code:
                    ColorCodeTab()
                case .overview:
                    ColorOverviewTab()
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }

    private var tokenCount: Int {
        let ramps = projectStore.currentProject?.colors.ramps ?? []
        return ramps.reduce(0) { $0 + $1.steps }
    }
}

// MARK: - Tabs

enum ColorTab: String, CaseIterable {
    case edit = "Edit"
    case tokens = "Tokens"
    case code = "Code"
    case overview = "Overview"
}

struct TabBar<T: RawRepresentable & CaseIterable & Hashable>: View where T.RawValue == String {
    @Binding var selected: T

    var body: some View {
        HStack(spacing: 0) {
            ForEach(Array(T.allCases as! [T]), id: \.self) { tab in
                Button(tab.rawValue) { selected = tab }
                    .buttonStyle(TabButtonStyle(isSelected: selected == tab))
            }
            Spacer()
        }
        .padding(.horizontal, 24)
        .padding(.top, 8)
    }
}

struct TabButtonStyle: ButtonStyle {
    let isSelected: Bool
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.subheadline.weight(isSelected ? .semibold : .regular))
            .foregroundStyle(isSelected ? .primary : .secondary)
            .padding(.vertical, 8)
            .padding(.horizontal, 12)
            .overlay(alignment: .bottom) {
                if isSelected {
                    Rectangle()
                        .frame(height: 2)
                        .foregroundStyle(.blue)
                }
            }
    }
}

// MARK: - Edit Tab

struct ColorEditTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    private var foundation: ColorFoundation {
        projectStore.currentProject?.colors ?? ColorFoundation()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header row with title + Add Ramp button
            HStack {
                Text("RAMPS")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(.secondary)
                Text("· \(foundation.ramps.count) · color/name/step")
                    .font(.system(size: 11, design: .monospaced))
                    .foregroundStyle(.secondary)
                Spacer()
                Button {
                    projectStore.update { ds in
                        ds.colors.ramps.append(ColorRamp(name: "New", seedHex: "#6366F1", steps: 11))
                    }
                } label: {
                    Label("Add Ramp", systemImage: "plus").font(.subheadline)
                }
                .buttonStyle(.bordered)
            }
            .padding(.horizontal, 24)
            .padding(.top, 24)
            .padding(.bottom, 12)

            if foundation.ramps.isEmpty {
                Button {
                    projectStore.update { ds in
                        ds.colors.ramps.append(ColorRamp(name: "Primary", seedHex: "#6366F1", steps: 11))
                    }
                } label: {
                    Label("Add first ramp", systemImage: "plus.circle")
                        .font(.subheadline).foregroundStyle(.secondary)
                }
                .buttonStyle(.plain)
                .padding(.top, 24)
                .frame(maxWidth: .infinity)
            } else {
                LazyVStack(spacing: 0) {
                    ForEach(Array(foundation.ramps.enumerated()), id: \.element.id) { index, ramp in
                        ColorRampCard(ramp: ramp, index: index, totalCount: foundation.ramps.count)
                            .padding(.horizontal, 24)
                            .padding(.vertical, 6)
                    }
                }
            }
        }
    }
}

// MARK: - Color Ramp Card

struct ColorRampCard: View {
    @EnvironmentObject var projectStore: ProjectStore
    let ramp: ColorRamp
    let index: Int
    let totalCount: Int
    @State private var isExpanded = false
    @State private var showColorPopover = false
    @State private var showDeleteAlert = false

    private var swatches: [ColorSwatch] {
        ColorGenerator.generate(ramp: ramp)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header row
            HStack(spacing: 8) {
                // Color circle → opens popover with ColorPicker
                Button {
                    showColorPopover = true
                } label: {
                    Circle()
                        .fill(Color(hex: ramp.seedHex) ?? .blue)
                        .frame(width: 28, height: 28)
                        .overlay(Circle().strokeBorder(.white.opacity(0.25), lineWidth: 1.5))
                        .shadow(color: .black.opacity(0.15), radius: 3, y: 1)
                }
                .buttonStyle(.plain)
                .popover(isPresented: $showColorPopover, arrowEdge: .bottom) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Seed Color").font(.caption.bold()).foregroundStyle(.secondary)
                        ColorPicker("", selection: colorBinding).labelsHidden()
                    }
                    .padding(16)
                    .frame(width: 180)
                }

                // Hex text field
                TextField("#RRGGBB", text: hexBinding)
                    .textFieldStyle(.plain)
                    .font(.system(size: 11, design: .monospaced))
                    .frame(width: 74)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 3)
                    .background(Color.secondary.opacity(0.08))
                    .clipShape(RoundedRectangle(cornerRadius: 5))

                // Ramp name (editable)
                TextField("Name", text: nameBinding)
                    .textFieldStyle(.plain)
                    .font(.system(size: 14, weight: .semibold))
                    .frame(minWidth: 50, maxWidth: 110)
                    .lineLimit(1)

                Spacer()

                // Steps: − count +
                HStack(spacing: 3) {
                    Text("STEPS")
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundStyle(.secondary)
                    Button {
                        projectStore.update { ds in
                            if let i = ds.colors.ramps.firstIndex(where: { $0.id == ramp.id }) {
                                ds.colors.ramps[i].steps = max(3, ds.colors.ramps[i].steps - 2)
                            }
                        }
                    } label: {
                        Image(systemName: "minus").font(.system(size: 9, weight: .bold)).frame(width: 18, height: 18)
                    }
                    .buttonStyle(.plain).foregroundStyle(.secondary)
                    .disabled(ramp.steps <= 3)

                    Text("\(ramp.steps)")
                        .font(.system(size: 11, design: .monospaced))
                        .frame(width: 20, alignment: .center)

                    Button {
                        projectStore.update { ds in
                            if let i = ds.colors.ramps.firstIndex(where: { $0.id == ramp.id }) {
                                ds.colors.ramps[i].steps = min(21, ds.colors.ramps[i].steps + 2)
                            }
                        }
                    } label: {
                        Image(systemName: "plus").font(.system(size: 9, weight: .bold)).frame(width: 18, height: 18)
                    }
                    .buttonStyle(.plain).foregroundStyle(.secondary)
                    .disabled(ramp.steps >= 21)
                }

                // Reorder
                VStack(spacing: 1) {
                    Button { moveUp() } label: {
                        Image(systemName: "arrow.up")
                            .font(.system(size: 9, weight: .semibold))
                            .frame(width: 20, height: 16)
                    }
                    .buttonStyle(.plain)
                    .foregroundStyle(index == 0 ? Color.secondary.opacity(0.25) : .secondary)
                    .disabled(index == 0)

                    Button { moveDown() } label: {
                        Image(systemName: "arrow.down")
                            .font(.system(size: 9, weight: .semibold))
                            .frame(width: 20, height: 16)
                    }
                    .buttonStyle(.plain)
                    .foregroundStyle(index == totalCount - 1 ? Color.secondary.opacity(0.25) : .secondary)
                    .disabled(index == totalCount - 1)
                }

                // Tune / delete
                Button(isExpanded ? "Hide" : "Tune") {
                    withAnimation { isExpanded.toggle() }
                }
                .font(.caption)
                .buttonStyle(.bordered)

                Button {
                    showDeleteAlert = true
                } label: {
                    Image(systemName: "trash")
                        .font(.caption)
                        .foregroundStyle(.red.opacity(0.7))
                }
                .buttonStyle(.plain)
                .alert("Delete \"\(ramp.name)\"?", isPresented: $showDeleteAlert) {
                    Button("Delete", role: .destructive) {
                        projectStore.update { ds in ds.colors.ramps.removeAll { $0.id == ramp.id } }
                    }
                    Button("Cancel", role: .cancel) {}
                } message: {
                    Text("This action cannot be undone.")
                }
            }

            // OKLCH sliders (collapsible)
            if isExpanded {
                OKLCHControls(ramp: ramp)
                    .transition(.opacity)
            }

            // Swatch strip
            HStack(spacing: 4) {
                ForEach(swatches) { swatch in
                    SwatchCell(swatch: swatch)
                }
            }
        }
        .padding(16)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(nsColor: .controlBackgroundColor))
        )
    }

    // MARK: - Reorder

    private func moveUp() {
        projectStore.update { ds in
            guard index > 0 else { return }
            ds.colors.ramps.swapAt(index, index - 1)
        }
    }

    private func moveDown() {
        projectStore.update { ds in
            guard index < ds.colors.ramps.count - 1 else { return }
            ds.colors.ramps.swapAt(index, index + 1)
        }
    }

    // MARK: - Bindings

    private var colorBinding: Binding<Color> {
        Binding(
            get: { Color(hex: ramp.seedHex) ?? .blue },
            set: { color in
                projectStore.update { ds in
                    if let i = ds.colors.ramps.firstIndex(where: { $0.id == ramp.id }) {
                        ds.colors.ramps[i].seedHex = color.toHex()
                    }
                }
            }
        )
    }

    private var hexBinding: Binding<String> {
        Binding(
            get: { ramp.seedHex },
            set: { val in
                var hex = val.trimmingCharacters(in: .whitespaces)
                if !hex.hasPrefix("#") { hex = "#" + hex }
                guard hex.count == 7, Color(hex: hex) != nil else { return }
                projectStore.update { ds in
                    if let i = ds.colors.ramps.firstIndex(where: { $0.id == ramp.id }) {
                        ds.colors.ramps[i].seedHex = hex.uppercased()
                    }
                }
            }
        )
    }

    private var nameBinding: Binding<String> {
        Binding(
            get: { projectStore.currentProject?.colors.ramps.first(where: { $0.id == ramp.id })?.name ?? ramp.name },
            set: { val in
                projectStore.update { ds in
                    if let i = ds.colors.ramps.firstIndex(where: { $0.id == ramp.id }) {
                        ds.colors.ramps[i].name = val
                    }
                }
            }
        )
    }

    private var stepsBinding: Binding<Int> {
        Binding(
            get: { projectStore.currentProject?.colors.ramps.first(where: { $0.id == ramp.id })?.steps ?? ramp.steps },
            set: { val in
                projectStore.update { ds in
                    if let i = ds.colors.ramps.firstIndex(where: { $0.id == ramp.id }) {
                        ds.colors.ramps[i].steps = val
                    }
                }
            }
        )
    }
}

// MARK: - Swatch Cell

struct SwatchCell: View {
    let swatch: ColorSwatch
    @State private var isHovered = false

    var body: some View {
        VStack(spacing: 0) {
            // WCAG badges
            VStack(spacing: 2) {
                WCAGBadge(level: swatch.wcagOnWhite, label: "W", ratio: swatch.contrastOnWhite)
                WCAGBadge(level: swatch.wcagOnBlack, label: "B", ratio: swatch.contrastOnBlack)
            }
            .padding(4)

            // Color block
            Rectangle()
                .fill(Color(hex: swatch.hex) ?? .gray)
                .frame(height: 80)
            if swatch.wcagOnWhite == .fail && swatch.wcagOnBlack == .fail {
                Image(systemName: "exclamationmark.triangle.fill")
                    .font(.system(size: 9))
                    .foregroundStyle(.orange)
                    .padding(3)
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
                    .allowsHitTesting(false)
            }

            // Label
            VStack(spacing: 2) {
                Text("\(swatch.step)")
                    .font(.system(size: 10, weight: .semibold))
                Text(swatch.hex.lowercased())
                    .font(.system(size: 9, design: .monospaced))
                    .foregroundStyle(.secondary)
            }
            .padding(.vertical, 6)
            .padding(.horizontal, 4)
        }
        .frame(minWidth: 60)
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .strokeBorder(isHovered ? Color.blue.opacity(0.5) : Color.clear, lineWidth: 1.5)
        )
        .onHover { isHovered = $0 }
    }
}

struct WCAGBadge: View {
    let level: WCAGLevel
    let label: String
    var ratio: Double? = nil

    var body: some View {
        HStack(spacing: 2) {
            Text(level.label)
                .font(.system(size: 8, weight: .bold))
            Text(label)
                .font(.system(size: 8))
        }
        .padding(.horizontal, 4)
        .padding(.vertical, 2)
        .background(level.color.opacity(0.15))
        .foregroundStyle(level.color)
        .clipShape(RoundedRectangle(cornerRadius: 3))
        .help(ratio.map { String(format: "%.1f:1 — \(level.label)", $0) } ?? level.label)
    }
}

// MARK: - OKLCH Controls

struct OKLCHControls: View {
    @EnvironmentObject var projectStore: ProjectStore
    let ramp: ColorRamp

    var body: some View {
        VStack(spacing: 12) {
            HStack(alignment: .top, spacing: 32) {
                // Chroma
                VStack(alignment: .leading, spacing: 6) {
                    Text("CHROMA").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                    SliderRow(label: "flat", value: binding(\.oklch.chromaStart), range: 0...0.4)
                    Text("falloff at extremes").font(.caption2).foregroundStyle(.secondary)
                    SliderRow(label: "", value: binding(\.oklch.chromaFalloff), range: 0...1)
                }
                .frame(maxWidth: .infinity)

                // Lightness
                VStack(alignment: .leading, spacing: 6) {
                    Text("LIGHTNESS").font(.system(size: 10, weight: .semibold)).foregroundStyle(.secondary)
                    SliderRow(label: "top", value: binding(\.oklch.lightnessTop), range: 0...1)
                    SliderRow(label: "bottom", value: binding(\.oklch.lightnessBottom), range: 0...1)
                    HStack {
                        Text("curve").font(.caption).foregroundStyle(.secondary)
                        Picker("", selection: binding(\.oklch.lightnessCurve)) {
                            ForEach(EasingCurve.allCases, id: \.self) { curve in
                                Text(curve.rawValue).tag(curve)
                            }
                        }
                        .labelsHidden()
                        .frame(maxWidth: 160)
                    }
                }
                .frame(maxWidth: .infinity)
            }
        }
        .padding(16)
        .background(Color.secondary.opacity(0.05))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }

    private func binding<V>(_ keyPath: WritableKeyPath<ColorRamp, V>) -> Binding<V> {
        Binding(
            get: {
                projectStore.currentProject?.colors.ramps.first(where: { $0.id == ramp.id })?[keyPath: keyPath]
                    ?? ramp[keyPath: keyPath]
            },
            set: { newValue in
                projectStore.update { ds in
                    if let i = ds.colors.ramps.firstIndex(where: { $0.id == ramp.id }) {
                        ds.colors.ramps[i][keyPath: keyPath] = newValue
                    }
                }
            }
        )
    }
}

struct SliderRow: View {
    let label: String
    @Binding var value: Double
    let range: ClosedRange<Double>

    var body: some View {
        HStack {
            if !label.isEmpty {
                Text(label).font(.caption).foregroundStyle(.secondary).frame(width: 36, alignment: .leading)
            }
            Slider(value: $value, in: range)
            Text(String(format: "%.2f", value))
                .font(.caption.monospacedDigit())
                .frame(width: 36)
        }
    }
}

// MARK: - Tokens Tab

struct ColorTokensTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    private var ramps: [ColorRamp] {
        projectStore.currentProject?.colors.ramps ?? []
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            ForEach(ramps) { ramp in
                let swatches = ColorGenerator.generate(ramp: ramp)
                VStack(alignment: .leading, spacing: 8) {
                    Text(ramp.name)
                        .font(.headline)
                    VStack(spacing: 2) {
                        ForEach(swatches) { swatch in
                            TokenRow(
                                name: "color/\(ramp.name.lowercased())/\(swatch.step)",
                                value: swatch.hex,
                                color: Color(hex: swatch.hex)
                            )
                        }
                    }
                    .background(Color(nsColor: .controlBackgroundColor))
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                }
            }

            if ramps.isEmpty {
                Text("No ramps yet. Add one in the Edit tab.")
                    .foregroundStyle(.secondary)
                    .padding()
            }
        }
        .padding(24)
    }
}

struct TokenRow: View {
    let name: String
    let value: String
    let color: Color?
    @State private var copied = false

    var body: some View {
        HStack(spacing: 12) {
            if let color {
                RoundedRectangle(cornerRadius: 4)
                    .fill(color)
                    .frame(width: 20, height: 20)
                    .overlay(RoundedRectangle(cornerRadius: 4).strokeBorder(.black.opacity(0.08), lineWidth: 0.5))
            }
            Text(name)
                .font(.system(.caption, design: .monospaced))
                .foregroundStyle(.primary)
            Spacer()
            Text(value.lowercased())
                .font(.system(.caption, design: .monospaced))
                .foregroundStyle(.secondary)
            Button {
                NSPasteboard.general.clearContents()
                NSPasteboard.general.setString(name, forType: .string)
                withAnimation { copied = true }
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { copied = false }
            } label: {
                Image(systemName: copied ? "checkmark" : "doc.on.doc")
                    .font(.caption)
                    .foregroundStyle(copied ? .green : .secondary)
            }
            .buttonStyle(.plain)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 7)
    }
}

// MARK: - Code Tab

struct ColorCodeTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedFormat: CodeFormat = .cssVariables
    @State private var copied = false

    enum CodeFormat: String, CaseIterable {
        case cssVariables = "CSS Variables"
        case swiftEnum = "Swift"
        case json = "JSON"
    }

    private var ramps: [ColorRamp] {
        projectStore.currentProject?.colors.ramps ?? []
    }

    private var generatedCode: String {
        switch selectedFormat {
        case .cssVariables: return generateCSS()
        case .swiftEnum: return generateSwift()
        case .json: return generateJSON()
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Format picker + copy
            HStack {
                Picker("Format", selection: $selectedFormat) {
                    ForEach(CodeFormat.allCases, id: \.self) { Text($0.rawValue).tag($0) }
                }
                .pickerStyle(.segmented)
                .frame(width: 320)
                Spacer()
                Button {
                    NSPasteboard.general.clearContents()
                    NSPasteboard.general.setString(generatedCode, forType: .string)
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
                Text(generatedCode)
                    .font(.system(.caption, design: .monospaced))
                    .foregroundStyle(.primary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(24)
                    .textSelection(.enabled)
            }
        }
    }

    private func generateCSS() -> String {
        var lines = [":root {"]
        for ramp in ramps {
            let swatches = ColorGenerator.generate(ramp: ramp)
            lines.append("  /* \(ramp.name) */")
            for swatch in swatches {
                lines.append("  --color-\(ramp.name.lowercased())-\(swatch.step): \(swatch.hex.lowercased());")
            }
        }
        lines.append("}")
        return lines.joined(separator: "\n")
    }

    private func generateSwift() -> String {
        var lines = ["import SwiftUI", "", "extension Color {"]
        for ramp in ramps {
            let swatches = ColorGenerator.generate(ramp: ramp)
            lines.append("    // MARK: - \(ramp.name)")
            for swatch in swatches {
                let name = "\(ramp.name.lowercased())\(swatch.step)"
                lines.append("    static let \(name) = Color(hex: \"\(swatch.hex)\")!")
            }
        }
        lines.append("}")
        return lines.joined(separator: "\n")
    }

    private func generateJSON() -> String {
        var dict: [String: [String: String]] = [:]
        for ramp in ramps {
            let swatches = ColorGenerator.generate(ramp: ramp)
            var rampDict: [String: String] = [:]
            for swatch in swatches {
                rampDict["\(swatch.step)"] = swatch.hex.lowercased()
            }
            dict[ramp.name.lowercased()] = rampDict
        }
        let wrapper = ["color": dict]
        if let data = try? JSONSerialization.data(withJSONObject: wrapper, options: .prettyPrinted),
           let str = String(data: data, encoding: .utf8) {
            return str
        }
        return "{}"
    }
}

// MARK: - Overview Tab

struct ColorOverviewTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    private var ramps: [ColorRamp] {
        projectStore.currentProject?.colors.ramps ?? []
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 32) {
            ForEach(ramps) { ramp in
                let swatches = ColorGenerator.generate(ramp: ramp)
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Text(ramp.name).font(.headline)
                        Text("\(swatches.count) steps").font(.caption).foregroundStyle(.secondary)
                    }
                    HStack(spacing: 0) {
                        ForEach(swatches) { swatch in
                            OverviewSwatchBlock(swatch: swatch)
                        }
                    }
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                }
            }
        }
        .padding(24)
    }
}

struct OverviewSwatchBlock: View {
    let swatch: ColorSwatch
    @State private var isHovered = false

    var body: some View {
        ZStack(alignment: .bottom) {
            Rectangle()
                .fill(Color(hex: swatch.hex) ?? .gray)
                .frame(height: isHovered ? 72 : 56)
            if isHovered {
                VStack(spacing: 1) {
                    Text("\(swatch.step)").font(.system(size: 9, weight: .bold))
                    Text(swatch.hex.lowercased()).font(.system(size: 8, design: .monospaced))
                }
                .foregroundStyle(.white.opacity(0.9))
                .shadow(color: .black.opacity(0.6), radius: 2)
                .padding(.bottom, 4)
            }
        }
        .frame(maxWidth: .infinity)
        .animation(.easeInOut(duration: 0.15), value: isHovered)
        .onHover { isHovered = $0 }
    }
}
