import SwiftUI

struct GridView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: Int = 0

    var ds: DesignSystem? { projectStore.currentProject }
    var breakpoints: [GridBreakpoint] { ds?.grid.breakpoints ?? [] }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "grid",
                title: "Grid",
                subtitle: "Responsive grid breakpoints: columns, gutter, and margin.",
                tokenCount: breakpoints.count
            )
            Divider()

            TabView(selection: $selectedTab) {
                editTab.tabItem { Text("Edit") }.tag(0)
                codeTab.tabItem { Text("Code") }.tag(1)
            }
            .padding(.top, 1)
        }
    }

    // MARK: - Edit

    var editTab: some View {
        ScrollView {
            VStack(spacing: 20) {
                ForEach(breakpoints) { bp in
                    GridBreakpointCard(bp: bp)
                }
            }
            .padding(24)
        }
    }

    // MARK: - Code

    var codeTab: some View {
        ScrollView {
            CodeBlock(code: cssOutput)
                .padding(24)
        }
    }

    var cssOutput: String {
        breakpoints.map { bp in
            let minW = bp.minWidth == 0 ? "/* mobile */" : "@media (min-width: \(Int(bp.minWidth))px)"
            return "\(minW) {\n  --grid-\(bp.name)-columns: \(bp.columns);\n  --grid-\(bp.name)-gutter: \(Int(bp.gutter))px;\n  --grid-\(bp.name)-margin: \(Int(bp.margin))px;\n}"
        }.joined(separator: "\n\n")
    }
}

// MARK: - Grid Breakpoint Card

struct GridBreakpointCard: View {
    let bp: GridBreakpoint

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(bp.name.uppercased())
                    .font(.system(size: 13, weight: .bold))
                if bp.minWidth > 0 {
                    Text("≥ \(Int(bp.minWidth))px")
                        .font(.system(size: 12))
                        .foregroundStyle(.secondary)
                } else {
                    Text("Mobile first")
                        .font(.system(size: 12))
                        .foregroundStyle(.secondary)
                }
                Spacer()
            }

            // Stats row
            HStack(spacing: 24) {
                statPill(label: "Columns", value: "\(bp.columns)")
                statPill(label: "Gutter", value: "\(Int(bp.gutter))px")
                statPill(label: "Margin", value: "\(Int(bp.margin))px")
            }

            // Grid visual
            GeometryReader { geo in
                HStack(spacing: CGFloat(bp.gutter) / 4) {
                    ForEach(0..<min(bp.columns, 12), id: \.self) { _ in
                        RoundedRectangle(cornerRadius: 3)
                            .fill(Color.blue.opacity(0.15))
                            .frame(height: 28)
                    }
                }
                .padding(.horizontal, CGFloat(bp.margin) / 4)
            }
            .frame(height: 28)
        }
        .padding(16)
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    func statPill(label: String, value: String) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(label)
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(.secondary)
            Text(value)
                .font(.system(size: 14, weight: .semibold))
        }
    }
}
