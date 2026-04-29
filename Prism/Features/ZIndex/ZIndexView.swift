import SwiftUI

struct ZIndexView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: Int = 0

    var ds: DesignSystem? { projectStore.currentProject }
    var steps: [ZIndexStep] { ds?.zIndex.steps ?? [] }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "square.3.layers.3d",
                title: "Z-Index",
                subtitle: "Stacking order tokens for overlays, modals, and tooltips.",
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
                HStack {
                    Text("NAME").frame(width: 140, alignment: .leading)
                    Text("VALUE").frame(width: 80, alignment: .leading)
                    Text("STACK VISUAL").frame(maxWidth: .infinity, alignment: .leading)
                }
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 24)
                .padding(.vertical, 10)

                Divider()

                ForEach(Array(steps.enumerated()), id: \.element.id) { idx, step in
                    HStack(spacing: 16) {
                        Text("z-index/\(step.name)")
                            .font(.system(size: 12, design: .monospaced))
                            .frame(width: 160, alignment: .leading)

                        Text(String(step.value))
                            .font(.system(size: 12))
                            .foregroundStyle(.secondary)
                            .frame(width: 60, alignment: .leading)

                        // Stack depth visual
                        ZStack {
                            ForEach(0..<min(idx + 1, 6), id: \.self) { i in
                                RoundedRectangle(cornerRadius: 4)
                                    .fill(Color.blue.opacity(0.15 + Double(i) * 0.12))
                                    .frame(width: 60, height: 22)
                                    .offset(x: CGFloat(i) * 3, y: CGFloat(i) * (-3))
                            }
                        }
                        .frame(height: 36)

                        Spacer()
                    }
                    .padding(.horizontal, 24)
                    .padding(.vertical, 10)
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
                        Text("z-index/\(step.name)")
                            .font(.system(size: 12, design: .monospaced))
                        Spacer()
                        Text(String(step.value))
                            .font(.system(size: 12))
                            .foregroundStyle(.secondary)
                        Button {
                            NSPasteboard.general.clearContents()
                            NSPasteboard.general.setString("z-index/\(step.name)", forType: .string)
                        } label: {
                            Image(systemName: "doc.on.doc").font(.system(size: 11))
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
            CodeBlock(code: cssOutput)
                .padding(24)
        }
    }

    var cssOutput: String {
        let lines = steps.map { "  --z-index-\($0.name): \($0.value);" }
        return ":root {\n" + lines.joined(separator: "\n") + "\n}"
    }
}
