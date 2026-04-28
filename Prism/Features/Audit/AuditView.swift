import SwiftUI

struct AuditView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var filterMode: AuditFilter = .all
    @State private var colorBlindMode: ColorBlindMode = .none

    private var pairs: [ContrastPair] {
        generateContrastPairs()
    }

    private var filtered: [ContrastPair] {
        switch filterMode {
        case .all: return pairs
        case .failsOnly: return pairs.filter { $0.wcagLevel == .fail }
        case .aaOnly: return pairs.filter { $0.wcagLevel == .aa || $0.wcagLevel == .aaa }
        case .aaaOnly: return pairs.filter { $0.wcagLevel == .aaa }
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "checkmark.shield.fill",
                title: "Accessibility Audit",
                subtitle: "WCAG contrast check for all semantic text/background pairs.",
                tokenCount: pairs.count
            )

            // Controls
            HStack {
                Picker("Filter", selection: $filterMode) {
                    ForEach(AuditFilter.allCases, id: \.self) { Text($0.rawValue).tag($0) }
                }
                .pickerStyle(.segmented)
                .frame(width: 320)

                Spacer()

                Picker("Colorblind", selection: $colorBlindMode) {
                    ForEach(ColorBlindMode.allCases, id: \.self) { Text($0.rawValue).tag($0) }
                }
                .frame(width: 180)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 12)

            Divider()

            // Summary badges
            HStack(spacing: 16) {
                AuditSummaryBadge(label: "Fail", count: pairs.filter { $0.wcagLevel == .fail }.count, color: .red)
                AuditSummaryBadge(label: "AA Pass", count: pairs.filter { $0.wcagLevel == .aa || $0.wcagLevel == .aaa }.count, color: .green)
                AuditSummaryBadge(label: "AAA", count: pairs.filter { $0.wcagLevel == .aaa }.count, color: .blue)
                Spacer()
                Button("Export Report") {}
                    .buttonStyle(.bordered)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 12)

            Divider()

            // Table
            if pairs.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "checkmark.shield.fill")
                        .font(.system(size: 40))
                        .foregroundStyle(.green)
                    Text("No semantic tokens yet")
                        .foregroundStyle(.secondary)
                    Text("Add semantic color tokens to audit their contrast ratios.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                ScrollView {
                    LazyVStack(spacing: 0) {
                        ForEach(filtered) { pair in
                            ContrastRow(pair: pair)
                            Divider().padding(.horizontal, 24)
                        }
                    }
                }
            }
        }
    }

    private func generateContrastPairs() -> [ContrastPair] {
        // TODO: iterate semantic tokens, find text+bg pairs, compute contrast
        return []
    }
}

// MARK: - Models

struct ContrastPair: Identifiable {
    var id = UUID()
    var textToken: String
    var bgToken: String
    var textHex: String
    var bgHex: String
    var ratio: Double
    var wcagLevel: WCAGLevel
}

enum AuditFilter: String, CaseIterable {
    case all = "All"
    case failsOnly = "Fails"
    case aaOnly = "AA+"
    case aaaOnly = "AAA"
}

enum ColorBlindMode: String, CaseIterable {
    case none = "Normal"
    case deuteranopia = "Deuteranopia"
    case protanopia = "Protanopia"
    case tritanopia = "Tritanopia"
    case achromatopsia = "Achromatopsia"
}

// MARK: - Summary Badge

struct AuditSummaryBadge: View {
    let label: String
    let count: Int
    let color: Color

    var body: some View {
        HStack(spacing: 6) {
            Circle().fill(color).frame(width: 8, height: 8)
            Text("\(count) \(label)")
                .font(.subheadline)
        }
    }
}

// MARK: - Contrast Row

struct ContrastRow: View {
    let pair: ContrastPair

    var body: some View {
        HStack(spacing: 16) {
            // Color preview
            ZStack {
                RoundedRectangle(cornerRadius: 6)
                    .fill(Color(hex: pair.bgHex) ?? .white)
                    .frame(width: 48, height: 32)
                Text("Aa")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundStyle(Color(hex: pair.textHex) ?? .black)
            }

            // Token names
            VStack(alignment: .leading, spacing: 2) {
                Text(pair.textToken)
                    .font(.system(.caption, design: .monospaced))
                Text(pair.bgToken)
                    .font(.system(.caption, design: .monospaced))
                    .foregroundStyle(.secondary)
            }

            Spacer()

            // Ratio
            Text(String(format: "%.2f:1", pair.ratio))
                .font(.system(.body, design: .monospaced))
                .foregroundStyle(.secondary)

            // Badge
            WCAGBadge(level: pair.wcagLevel, label: pair.wcagLevel.label)
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 12)
    }
}
