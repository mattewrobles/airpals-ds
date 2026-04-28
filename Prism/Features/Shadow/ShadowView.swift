import SwiftUI

struct ShadowView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: SimpleTab = .edit

    private var foundation: ShadowFoundation {
        projectStore.currentProject?.shadow ?? ShadowFoundation()
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "rectangle.3.group",
                title: "Shadow",
                subtitle: "Box shadow tokens with support for multiple layers per token.",
                tokenCount: foundation.shadows.count
            )
            TabBar(selected: $selectedTab)
            Divider()
            ScrollView {
                switch selectedTab {
                case .edit:     ShadowEditTab()
                case .tokens:   ShadowTokensTab()
                case .code:     ShadowCodeTab()
                case .overview: ShadowOverviewTab()
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }
}

// MARK: - Edit

struct ShadowEditTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    private var foundation: ShadowFoundation {
        projectStore.currentProject?.shadow ?? ShadowFoundation()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            ForEach(foundation.shadows) { shadow in
                ShadowTokenCard(token: shadow)
            }
            Button {
                projectStore.update { ds in
                    ds.shadow.shadows.append(ShadowToken(name: "custom", layers: [ShadowLayer()]))
                }
            } label: { Label("Add Shadow", systemImage: "plus") }
            .buttonStyle(.bordered)
        }
        .padding(24)
    }
}

struct ShadowTokenCard: View {
    @EnvironmentObject var projectStore: ProjectStore
    let token: ShadowToken

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("shadow/\(token.name)")
                    .font(.system(.subheadline, design: .monospaced).bold())
                Spacer()
                // Preview box
                RoundedRectangle(cornerRadius: 8)
                    .fill(.white)
                    .frame(width: 48, height: 32)
                    .shadow(
                        color: Color(hex: token.layers.first?.colorHex ?? "#000000")?.opacity(token.layers.first?.opacity ?? 0.1) ?? .black.opacity(0.1),
                        radius: (token.layers.first?.blur ?? 4) / 2,
                        x: token.layers.first?.x ?? 0,
                        y: token.layers.first?.y ?? 4
                    )
                    .padding(.trailing, 8)
            }

            ForEach(token.layers) { layer in
                HStack(spacing: 12) {
                    Label("Layer", systemImage: "square.stack").font(.caption).foregroundStyle(.secondary)
                    Text("x:\(Int(layer.x)) y:\(Int(layer.y)) blur:\(Int(layer.blur)) spread:\(Int(layer.spread))")
                        .font(.system(.caption, design: .monospaced))
                        .foregroundStyle(.secondary)
                    Spacer()
                    Circle()
                        .fill(Color(hex: layer.colorHex) ?? .black)
                        .frame(width: 14, height: 14)
                    Text(String(format: "%.0f%%", layer.opacity * 100))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(16)
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 10))
    }
}

// MARK: - Tokens

struct ShadowTokensTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    var body: some View {
        let f = projectStore.currentProject?.shadow ?? ShadowFoundation()
        VStack(spacing: 2) {
            ForEach(f.shadows) { s in
                let val = s.layers.map { "\(Int($0.x))px \(Int($0.y))px \(Int($0.blur))px \($0.colorHex)" }.joined(separator: ", ")
                TokenRow(name: "shadow/\(s.name)", value: val, color: nil)
            }
        }
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .padding(24)
    }
}

// MARK: - Code

struct ShadowCodeTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var copied = false

    var body: some View {
        let f = projectStore.currentProject?.shadow ?? ShadowFoundation()
        let code = generateCSS(f)
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("CSS Variables").font(.subheadline.bold())
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
                Text(code).font(.system(.caption, design: .monospaced)).frame(maxWidth: .infinity, alignment: .leading).padding(24).textSelection(.enabled)
            }
        }
    }

    private func generateCSS(_ f: ShadowFoundation) -> String {
        var lines = [":root {", "  /* Box Shadows */"]
        for s in f.shadows {
            let val = s.layers.map { l -> String in
                let r = Int(l.opacity * 255)
                let g = Int(l.opacity * 255)
                let b = Int(l.opacity * 255)
                return "\(Int(l.x))px \(Int(l.y))px \(Int(l.blur))px \(Int(l.spread))px rgba(\(r),\(g),\(b),\(l.opacity))"
            }.joined(separator: ", ")
            lines.append("  --shadow-\(s.name): \(val);")
        }
        lines.append("}")
        return lines.joined(separator: "\n")
    }
}

// MARK: - Overview Card (extracted to help type checker)

struct ShadowOverviewCard: View {
    let token: ShadowToken

    var body: some View {
        let layer = token.layers.first
        let shadowColor: Color = Color(hex: layer?.colorHex ?? "#000000")?.opacity(layer?.opacity ?? 0.1) ?? .black.opacity(0.1)
        let radius: CGFloat = (layer?.blur ?? 4) / 2
        let x: CGFloat = layer?.x ?? 0
        let y: CGFloat = layer?.y ?? 4

        VStack(spacing: 12) {
            RoundedRectangle(cornerRadius: 10)
                .fill(Color(nsColor: .white))
                .frame(width: 80, height: 60)
                .shadow(color: shadowColor, radius: radius, x: x, y: y)
            Text(token.name).font(.caption).foregroundStyle(.secondary)
        }
    }
}

// MARK: - Overview

struct ShadowOverviewTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    var body: some View {
        let f = projectStore.currentProject?.shadow ?? ShadowFoundation()
        HStack(alignment: .bottom, spacing: 32) {
            ForEach(f.shadows) { s in
                ShadowOverviewCard(token: s)
            }
        }
        .padding(40)
        .frame(maxWidth: .infinity)
        .background(Color.secondary.opacity(0.05))
        .padding(24)
    }
}
