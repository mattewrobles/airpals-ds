import SwiftUI

struct SpacingView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: SimpleTab = .edit

    private var foundation: SpacingFoundation {
        projectStore.currentProject?.spacing ?? SpacingFoundation()
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "arrow.left.and.right",
                title: "Spacing",
                subtitle: "Spacing scale based on a base unit. All values are multiples of the base.",
                tokenCount: foundation.steps.count
            )
            TabBar(selected: $selectedTab)
            Divider()
            ScrollView {
                switch selectedTab {
                case .edit:     SpacingEditTab()
                case .tokens:   SpacingTokensTab()
                case .code:     SpacingCodeTab()
                case .overview: SpacingOverviewTab()
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }
}

enum SimpleTab: String, CaseIterable {
    case edit = "Edit"
    case tokens = "Tokens"
    case code = "Code"
    case overview = "Overview"
}

// MARK: - Edit Tab

struct SpacingEditTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    private var foundation: SpacingFoundation {
        projectStore.currentProject?.spacing ?? SpacingFoundation()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            // Base unit
            HStack(spacing: 8) {
                Text("BASE UNIT")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundStyle(.secondary)
                TextField("4", value: Binding(
                    get: { foundation.baseUnit },
                    set: { v in projectStore.update { $0.spacing.baseUnit = v } }
                ), format: .number)
                .textFieldStyle(.roundedBorder)
                .frame(width: 64)
                Text("px").font(.caption).foregroundStyle(.secondary)
            }

            // Steps table
            VStack(spacing: 0) {
                // Header
                HStack {
                    Text("NAME").frame(width: 80, alignment: .leading)
                    Text("MULTIPLIER").frame(width: 100, alignment: .leading)
                    Text("VALUE").frame(width: 80, alignment: .leading)
                    Text("PREVIEW").frame(maxWidth: .infinity, alignment: .leading)
                }
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)

                Divider()

                ForEach(foundation.steps) { step in
                    SpacingStepRow(step: step, baseUnit: foundation.baseUnit)
                    Divider()
                }
            }
            .background(Color(nsColor: .controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 8))

            Button {
                projectStore.update { ds in
                    let next = Double(ds.spacing.steps.count)
                    ds.spacing.steps.append(SpacingStep(name: "\(Int(next))", multiplier: next))
                }
            } label: {
                Label("Add Step", systemImage: "plus")
            }
            .buttonStyle(.bordered)
        }
        .padding(24)
    }
}

struct SpacingStepRow: View {
    let step: SpacingStep
    let baseUnit: Double

    var body: some View {
        HStack {
            Text(step.name)
                .font(.system(.caption, design: .monospaced))
                .frame(width: 80, alignment: .leading)
            Text(String(format: "×%.0f", step.multiplier))
                .font(.system(.caption, design: .monospaced))
                .foregroundStyle(.secondary)
                .frame(width: 100, alignment: .leading)
            Text(String(format: "%.0fpx", step.valuePx))
                .font(.system(.caption, design: .monospaced))
                .foregroundStyle(.secondary)
                .frame(width: 80, alignment: .leading)
            // Visual bar
            Rectangle()
                .fill(Color.blue.opacity(0.3))
                .frame(width: min(step.valuePx, 200), height: 12)
                .clipShape(RoundedRectangle(cornerRadius: 2))
            Spacer()
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
    }
}

// MARK: - Tokens Tab

struct SpacingTokensTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    var body: some View {
        let foundation = projectStore.currentProject?.spacing ?? SpacingFoundation()
        VStack(spacing: 2) {
            ForEach(foundation.steps) { step in
                TokenRow(
                    name: "spacing/\(step.name)",
                    value: "\(String(format: "%.0f", step.valuePx))px",
                    color: nil
                )
            }
        }
        .background(Color(nsColor: .controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .padding(24)
    }
}

// MARK: - Code Tab

struct SpacingCodeTab: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var copied = false

    var body: some View {
        let foundation = projectStore.currentProject?.spacing ?? SpacingFoundation()
        let code = generateCSS(foundation)
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("CSS Variables").font(.subheadline.bold())
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

    private func generateCSS(_ f: SpacingFoundation) -> String {
        var lines = [":root {", "  /* Spacing */"]
        for step in f.steps {
            lines.append("  --spacing-\(step.name): \(String(format: "%.0f", step.valuePx))px;")
        }
        lines.append("}")
        return lines.joined(separator: "\n")
    }
}

// MARK: - Overview Tab

struct SpacingOverviewTab: View {
    @EnvironmentObject var projectStore: ProjectStore

    var body: some View {
        let foundation = projectStore.currentProject?.spacing ?? SpacingFoundation()
        VStack(alignment: .leading, spacing: 12) {
            ForEach(foundation.steps) { step in
                HStack(spacing: 16) {
                    Text(step.name)
                        .font(.system(.caption, design: .monospaced))
                        .frame(width: 40, alignment: .trailing)
                    Text(String(format: "%.0fpx", step.valuePx))
                        .font(.system(.caption, design: .monospaced))
                        .foregroundStyle(.secondary)
                        .frame(width: 50)
                    Rectangle()
                        .fill(Color.blue)
                        .frame(width: min(step.valuePx * 2, 300), height: step.valuePx > 0 ? min(step.valuePx, 32) : 2)
                        .clipShape(RoundedRectangle(cornerRadius: 2))
                }
            }
        }
        .padding(24)
    }
}
