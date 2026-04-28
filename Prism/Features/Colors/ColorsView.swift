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
    @State private var showNamingConfig = false

    private var foundation: ColorFoundation {
        projectStore.currentProject?.colors ?? ColorFoundation()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            // Metadata row
            HStack {
                Text("\(foundation.ramps.count) ramps · \(foundation.standalones.count) standalones · drag grid to reorder · light mode")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Spacer()
                Button("Naming") { showNamingConfig.toggle() }
                    .font(.caption)
            }

            // Naming preview
            HStack(spacing: 4) {
                Text("TOKEN NAMING")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundStyle(.secondary)
                Text("color/primary/500")
                    .font(.system(size: 11, design: .monospaced))
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(Color.secondary.opacity(0.1))
                    .clipShape(RoundedRectangle(cornerRadius: 4))
            }

            // Ramps
            Text("RAMPS")
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.secondary)

            ForEach(foundation.ramps) { ramp in
                ColorRampCard(ramp: ramp)
            }

            // Add ramp button
            Button {
                projectStore.update { ds in
                    ds.colors.ramps.append(ColorRamp(name: "New", seedHex: "#6366F1", steps: 11))
                }
            } label: {
                Label("Add Ramp", systemImage: "plus")
                    .font(.subheadline)
            }
            .buttonStyle(.bordered)
        }
        .padding(24)
    }
}

// MARK: - Color Ramp Card

struct ColorRampCard: View {
    @EnvironmentObject var projectStore: ProjectStore
    let ramp: ColorRamp
    @State private var isExpanded = false

    private var swatches: [ColorSwatch] {
        ColorGenerator.generate(ramp: ramp)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Ramp header
            HStack {
                // Color circle + name
                ColorPicker("", selection: Binding(
                    get: { Color(hex: ramp.seedHex) ?? .blue },
                    set: { color in
                        projectStore.update { ds in
                            if let i = ds.colors.ramps.firstIndex(where: { $0.id == ramp.id }) {
                                ds.colors.ramps[i].seedHex = color.toHex()
                            }
                        }
                    }
                ))
                .labelsHidden()
                .frame(width: 24, height: 24)

                Text(ramp.name)
                    .font(.headline)

                Spacer()

                // Steps config
                HStack(spacing: 4) {
                    Text("STEPS")
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundStyle(.secondary)
                    Text("\(ramp.steps)")
                        .font(.system(size: 12, design: .monospaced))
                        .frame(width: 30)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Color.secondary.opacity(0.1))
                        .clipShape(RoundedRectangle(cornerRadius: 4))
                }

                Button(isExpanded ? "Hide variation" : "Variation") {
                    withAnimation { isExpanded.toggle() }
                }
                .font(.caption)
                .buttonStyle(.bordered)
            }

            // Variation controls (OKLCH sliders)
            if isExpanded {
                OKLCHControls(ramp: ramp)
                    .transition(.opacity.combined(with: .move(edge: .top)))
            }

            // Swatches row
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
}

// MARK: - Swatch Cell

struct SwatchCell: View {
    let swatch: ColorSwatch
    @State private var isHovered = false

    var body: some View {
        VStack(spacing: 0) {
            // WCAG badges
            VStack(spacing: 2) {
                WCAGBadge(level: swatch.wcagOnWhite, label: "1:0")
                WCAGBadge(level: swatch.wcagOnBlack, label: "21:1")
            }
            .padding(4)

            // Color block
            Rectangle()
                .fill(Color(hex: swatch.hex) ?? .gray)
                .frame(height: 80)

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

// MARK: - Placeholder tabs

struct ColorTokensTab: View {
    var body: some View { Text("Tokens").padding() }
}
struct ColorCodeTab: View {
    var body: some View { Text("Code").padding() }
}
struct ColorOverviewTab: View {
    var body: some View { Text("Overview").padding() }
}
