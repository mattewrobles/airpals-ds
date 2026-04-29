import SwiftUI

struct OpacityView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: Int = 0

    var ds: DesignSystem? { projectStore.currentProject }
    var steps: [OpacityStep] { ds?.opacity.steps ?? [] }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "circle.lefthalf.filled",
                title: "Opacity",
                subtitle: "Opacity scale for overlays, disabled states, and transparency.",
                tokenCount: steps.count
            )
            Divider()

            TabView(selection: $selectedTab) {
                editTab.tabItem { Text("Edit") }.tag(0)
                tokensTab.tabItem { Text("Tokens") }.tag(1)
                codeTab.tabItem { Text("Code") }.tag(2)
            }
            .padding(.top, 1)
        }
    }

    // MARK: - Edit

    var editTab: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header row
                HStack {
                    Text("NAME").frame(width: 100, alignment: .leading)
                    Text("VALUE").frame(width: 80, alignment: .leading)
                    Text("PREVIEW").frame(maxWidth: .infinity, alignment: .leading)
                }
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 24)
                .padding(.vertical, 10)

                Divider()

                ForEach(steps) { step in
                    OpacityRow(step: step)
                    Divider().padding(.leading, 24)
                }
            }
        }
    }

    // MARK: - Tokens

    var tokensTab: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                ForEach(steps) { step in
                    HStack {
                        Text("opacity/\(step.name)")
                            .font(.system(size: 12, design: .monospaced))
                        Spacer()
                        Text(String(format: "%.0f%%", step.value * 100))
                            .font(.system(size: 12))
                            .foregroundStyle(.secondary)
                        Button {
                            NSPasteboard.general.clearContents()
                            NSPasteboard.general.setString("opacity/\(step.name)", forType: .string)
                        } label: {
                            Image(systemName: "doc.on.doc")
                                .font(.system(size: 11))
                        }
                        .buttonStyle(.plain)
                        .foregroundStyle(.secondary)
                    }
                    .padding(.horizontal, 24)
                    .padding(.vertical, 8)
                    Divider().padding(.leading, 24)
                }
            }
            .padding(.top, 8)
        }
    }

    // MARK: - Code

    var codeTab: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                CodeBlock(code: cssOutput)
            }
            .padding(24)
        }
    }

    var cssOutput: String {
        let lines = steps.map { step -> String in
            "--opacity-\(step.name): \(step.value);"
        }
        return ":root {\n" + lines.map { "  \($0)" }.joined(separator: "\n") + "\n}"
    }
}

// MARK: - Opacity Row

struct OpacityRow: View {
    let step: OpacityStep

    var body: some View {
        HStack(spacing: 16) {
            Text("opacity/\(step.name)")
                .font(.system(size: 12, design: .monospaced))
                .frame(width: 120, alignment: .leading)

            Text(String(format: "%.0f%%", step.value * 100))
                .font(.system(size: 12))
                .foregroundStyle(.secondary)
                .frame(width: 50, alignment: .leading)

            // Preview strip
            ZStack {
                // Checkerboard background
                CheckerboardView()
                    .frame(height: 28)
                    .clipShape(RoundedRectangle(cornerRadius: 6))

                Color.blue.opacity(step.value)
                    .frame(height: 28)
                    .clipShape(RoundedRectangle(cornerRadius: 6))
            }
            .frame(maxWidth: .infinity)
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 10)
    }
}

// MARK: - Checkerboard (shows transparency)

struct CheckerboardView: View {
    var body: some View {
        Canvas { ctx, size in
            let tile: CGFloat = 8
            let cols = Int(ceil(size.width / tile))
            let rows = Int(ceil(size.height / tile))
            for row in 0..<rows {
                for col in 0..<cols {
                    let isLight = (row + col) % 2 == 0
                    let color = isLight ? Color.white : Color(white: 0.85)
                    ctx.fill(
                        Path(CGRect(x: CGFloat(col) * tile, y: CGFloat(row) * tile, width: tile, height: tile)),
                        with: .color(color)
                    )
                }
            }
        }
    }
}

// MARK: - Code Block helper (reused across views)

struct CodeBlock: View {
    let code: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Spacer()
                Button("Copy") {
                    NSPasteboard.general.clearContents()
                    NSPasteboard.general.setString(code, forType: .string)
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }
            ScrollView(.horizontal) {
                Text(code)
                    .font(.system(size: 12, design: .monospaced))
                    .textSelection(.enabled)
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(nsColor: .controlBackgroundColor))
                    .clipShape(RoundedRectangle(cornerRadius: 8))
            }
        }
    }
}
