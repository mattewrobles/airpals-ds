import SwiftUI

struct RadiusView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: SimpleTab = .edit

    private var foundation: RadiusFoundation {
        projectStore.currentProject?.radius ?? RadiusFoundation()
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "rectangle.roundedtop",
                title: "Radius",
                subtitle: "Border radius scale from none to full (pill).",
                tokenCount: foundation.steps.count
            )
            TabBar(selected: $selectedTab)
            Divider()
            ScrollView {
                switch selectedTab {
                case .edit:     RadiusEditTab()
                case .tokens:   RadiusTokensTab()
                case .code:     RadiusCodeTab()
                case .overview: RadiusOverviewTab()
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }
}

// MARK: - Edit

struct RadiusEditTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    private var foundation: RadiusFoundation {
        projectStore.currentProject?.radius ?? RadiusFoundation()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            VStack(spacing: 0) {
                HStack {
                    Text("NAME").frame(width: 80, alignment: .leading)
                    Text("VALUE (px)").frame(width: 100, alignment: .leading)
                    Text("PREVIEW").frame(maxWidth: .infinity, alignment: .leading)
                }
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 16).padding(.vertical, 8)
                Divider()

                ForEach(foundation.steps) { step in
                    HStack(spacing: 16) {
                        Text("radius/\(step.name)")
                            .font(.system(.caption, design: .monospaced))
                            .frame(width: 120, alignment: .leading)
                        Text(step.isFull ? "9999" : String(format: "%.0f", step.value))
                            .font(.system(.caption, design: .monospaced))
                            .foregroundStyle(.secondary)
                            .frame(width: 60)
                        RoundedRectangle(cornerRadius: step.isFull ? 16 : min(step.value, 16))
                            .fill(Color.blue.opacity(0.15))
                            .overlay(RoundedRectangle(cornerRadius: step.isFull ? 16 : min(step.value, 16)).strokeBorder(Color.blue, lineWidth: 1.5))
                            .frame(width: 64, height: 32)
                        Spacer()
                    }
                    .padding(.horizontal, 16).padding(.vertical, 10)
                    Divider()
                }
            }
            .background(Color(nsColor: .controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .padding(24)
    }
}

// MARK: - Tokens

struct RadiusTokensTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    var body: some View {
        let f = projectStore.currentProject?.radius ?? RadiusFoundation()
        VStack(spacing: 2) {
            ForEach(f.steps) { step in
                TokenRow(name: "radius/\(step.name)", value: step.isFull ? "9999px" : "\(Int(step.value))px", color: nil)
            }
        }
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .padding(24)
    }
}

// MARK: - Code

struct RadiusCodeTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var copied = false

    var body: some View {
        let f = projectStore.currentProject?.radius ?? RadiusFoundation()
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

    private func generateCSS(_ f: RadiusFoundation) -> String {
        var lines = [":root {", "  /* Border Radius */"]
        for step in f.steps {
            let val = step.isFull ? "9999px" : "\(Int(step.value))px"
            lines.append("  --radius-\(step.name): \(val);")
        }
        lines.append("}")
        return lines.joined(separator: "\n")
    }
}

// MARK: - Overview

struct RadiusOverviewTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    var body: some View {
        let f = projectStore.currentProject?.radius ?? RadiusFoundation()
        HStack(alignment: .top, spacing: 20) {
            ForEach(f.steps) { step in
                VStack(spacing: 8) {
                    let r = step.isFull ? 40.0 : min(step.value, 40)
                    RoundedRectangle(cornerRadius: r)
                        .fill(Color.blue.opacity(0.12))
                        .overlay(RoundedRectangle(cornerRadius: r).strokeBorder(Color.blue, lineWidth: 1.5))
                        .frame(width: 64, height: 64)
                    Text(step.name).font(.caption).foregroundStyle(.secondary)
                    Text(step.isFull ? "∞" : "\(Int(step.value))px").font(.system(size: 10, design: .monospaced)).foregroundStyle(.secondary)
                }
            }
        }
        .padding(24)
    }
}
