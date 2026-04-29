import SwiftUI

// MARK: - Sizes View
// Element dimensions scale: icon sizes, avatar sizes, touch targets

struct SizesView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: Int = 0

    // Fixed size scale — common element dimensions used across design systems
    static let sizeScale: [(name: String, px: Double, use: String)] = [
        ("1",  4,  "Micro indicator, dot"),
        ("2",  8,  "Tiny icon, badge dot"),
        ("3",  12, "Caption icon"),
        ("4",  16, "Default icon (sm)"),
        ("5",  20, "Icon, checkbox"),
        ("6",  24, "Icon (md), avatar sm"),
        ("8",  32, "Icon (lg), avatar md"),
        ("10", 40, "Touch target, avatar lg"),
        ("12", 48, "Toolbar icon, avatar xl"),
        ("14", 56, "Large action target"),
        ("16", 64, "Hero icon, avatar 2xl"),
        ("20", 80, "Illustration placeholder"),
        ("24", 96, "Large illustration")
    ]

    var ds: DesignSystem? { projectStore.currentProject }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "ruler",
                title: "Sizes",
                subtitle: "Element dimension scale: icon sizes, avatars, and touch targets.",
                tokenCount: Self.sizeScale.count
            )
            Divider()

            TabView(selection: $selectedTab) {
                editTab.tabItem { Text("Scale") }.tag(0)
                tokensTab.tabItem { Text("Tokens") }.tag(1)
                codeTab.tabItem { Text("Code") }.tag(2)
            }
            .padding(.top, 1)
        }
    }

    // MARK: - Scale Tab

    var editTab: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header
                HStack {
                    Text("TOKEN").frame(width: 100, alignment: .leading)
                    Text("PX").frame(width: 60, alignment: .leading)
                    Text("USE").frame(width: 200, alignment: .leading)
                    Text("PREVIEW").frame(maxWidth: .infinity, alignment: .leading)
                }
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 24)
                .padding(.vertical, 10)

                Divider()

                ForEach(Self.sizeScale, id: \.name) { size in
                    HStack(spacing: 16) {
                        Text("size/\(size.name)")
                            .font(.system(size: 12, design: .monospaced))
                            .frame(width: 100, alignment: .leading)

                        Text("\(Int(size.px))px")
                            .font(.system(size: 12))
                            .foregroundStyle(.secondary)
                            .frame(width: 60, alignment: .leading)

                        Text(size.use)
                            .font(.system(size: 11))
                            .foregroundStyle(.tertiary)
                            .frame(width: 200, alignment: .leading)

                        // Square preview showing actual proportional size
                        HStack(alignment: .center, spacing: 8) {
                            let displaySize = min(size.px, 64)
                            RoundedRectangle(cornerRadius: displaySize * 0.15)
                                .fill(Color.blue.opacity(0.15))
                                .frame(width: displaySize, height: displaySize)
                                .overlay(
                                    RoundedRectangle(cornerRadius: displaySize * 0.15)
                                        .strokeBorder(Color.blue.opacity(0.3), lineWidth: 1)
                                )
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .padding(.horizontal, 24)
                    .padding(.vertical, 6)
                    Divider().padding(.leading, 24)
                }
            }
            .padding(.top, 4)
        }
    }

    // MARK: - Tokens Tab

    var tokensTab: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                ForEach(Self.sizeScale, id: \.name) { size in
                    HStack {
                        Text("size/\(size.name)")
                            .font(.system(size: 12, design: .monospaced))
                        Spacer()
                        Text("\(Int(size.px))px")
                            .font(.system(size: 12))
                            .foregroundStyle(.secondary)
                        Button {
                            NSPasteboard.general.clearContents()
                            NSPasteboard.general.setString("size/\(size.name)", forType: .string)
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

    // MARK: - Code Tab

    var codeTab: some View {
        ScrollView {
            CodeBlock(code: cssOutput)
                .padding(24)
        }
    }

    var cssOutput: String {
        let lines = Self.sizeScale.map { "  --size-\($0.name): \(Int($0.px))px;" }
        return ":root {\n" + lines.joined(separator: "\n") + "\n}"
    }
}
