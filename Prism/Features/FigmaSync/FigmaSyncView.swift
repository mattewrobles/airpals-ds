import SwiftUI

// MARK: - Publish Status

enum PublishStatus {
    case idle
    case publishing
    case success(Date)
    case error(String)
}

struct FigmaSyncView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var syncStatus: SyncStatus = .idle
    @State private var showDiff = false
    @State private var exportFormat: ExportFormat = .figmaVariables
    @State private var storybookPath: String = UserDefaults.standard.string(forKey: "storybookTokensPath") ?? ""
    @State private var publishStatus: PublishStatus = .idle

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "arrow.triangle.2.circlepath",
                title: "Figma Sync",
                subtitle: "Push tokens to Figma or pull changes back. Bidirectional sync via Prism Plugin.",
                tokenCount: 0
            )

            Divider()

            ScrollView {
                VStack(alignment: .leading, spacing: 28) {

                    // Server status
                    ServerStatusCard(server: projectStore.localServer)

                    // Plugin install CTA
                    PluginInstallCard()

                    // Push / Pull
                    HStack(spacing: 16) {
                        SyncActionCard(
                            icon: "arrow.up.circle.fill",
                            title: "Push to Figma",
                            subtitle: "Send your tokens as Figma Variables + Styles",
                            color: .blue
                        ) {
                            // TODO: push
                        }

                        SyncActionCard(
                            icon: "arrow.down.circle.fill",
                            title: "Pull from Figma",
                            subtitle: "Import Variables from Figma into Prism",
                            color: .purple
                        ) {
                            // TODO: pull
                        }
                    }

                    // Storybook publish
                    StorybookPublishCard(
                        ds: projectStore.currentDesignSystem,
                        storybookPath: $storybookPath,
                        publishStatus: $publishStatus
                    )

                    // Export manual
                    VStack(alignment: .leading, spacing: 12) {
                        Text("EXPORT TOKENS")
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundStyle(.secondary)

                        ForEach(ExportFormat.allCases, id: \.rawValue) { format in
                            ExportFormatRow(
                                format: format,
                                isSelected: exportFormat == format
                            ) { exportFormat = format }
                        }

                        // Module selector
                        ModuleSelector()

                        HStack {
                            Spacer()
                            Button("Download JSON") {
                                // TODO: export
                            }
                            .buttonStyle(.borderedProminent)
                        }
                    }
                    .padding(20)
                    .background(Color(nsColor: .controlBackgroundColor))
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                .padding(24)
            }
        }
    }
}

// MARK: - Plugin Install Card

struct PluginInstallCard: View {
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: "puzzlepiece.extension.fill")
                .font(.title)
                .foregroundStyle(.blue)
            VStack(alignment: .leading, spacing: 4) {
                Text("Install Prism Plugin for Figma")
                    .font(.headline)
                Text("Enable bidirectional sync between Prism and your Figma files.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Button("Get Plugin") {}
                .buttonStyle(.borderedProminent)
        }
        .padding(20)
        .background(Color.blue.opacity(0.06))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .strokeBorder(Color.blue.opacity(0.2), lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - Sync Action Card

struct SyncActionCard: View {
    let icon: String
    let title: String
    let subtitle: String
    let color: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 8) {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundStyle(color)
                Text(title).font(.headline)
                Text(subtitle)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(16)
            .background(Color(nsColor: .controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Export Format Row

struct ExportFormatRow: View {
    let format: ExportFormat
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(alignment: .top, spacing: 12) {
                Image(systemName: isSelected ? "record.circle.fill" : "circle")
                    .foregroundStyle(isSelected ? .blue : .secondary)
                    .padding(.top, 2)
                VStack(alignment: .leading, spacing: 2) {
                    Text(format.rawValue).font(.subheadline.weight(.medium))
                    Text(format.description).font(.caption).foregroundStyle(.secondary)
                }
            }
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Module Selector

struct ModuleSelector: View {
    @State private var selected: Set<String> = Set(modules)

    static let modules = ["Colors", "Sizes", "Spacing", "Radius", "Typography", "Opacity", "Shadow", "Z-Index", "Grid"]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text("Modules to bundle").font(.caption).foregroundStyle(.secondary)
                Spacer()
                Button("Deselect all") { selected.removeAll() }
                    .font(.caption)
                Button("Select all") { selected = Set(Self.modules) }
                    .font(.caption)
            }
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 6) {
                ForEach(Self.modules, id: \.self) { module in
                    Toggle(module, isOn: Binding(
                        get: { selected.contains(module) },
                        set: { if $0 { selected.insert(module) } else { selected.remove(module) } }
                    ))
                    .toggleStyle(.checkbox)
                    .font(.subheadline)
                }
            }
        }
    }
}

// MARK: - Server Status Card

struct ServerStatusCard: View {
    @ObservedObject var server: LocalServer

    var body: some View {
        HStack(spacing: 14) {
            // Dot indicator
            Circle()
                .fill(server.isRunning ? Color.green : Color.red)
                .frame(width: 10, height: 10)
                .overlay(
                    Circle()
                        .fill(server.isRunning ? Color.green.opacity(0.3) : Color.clear)
                        .frame(width: 18, height: 18)
                )

            VStack(alignment: .leading, spacing: 2) {
                Text(server.isRunning ? "Server running" : "Server stopped")
                    .font(.subheadline.weight(.semibold))
                if server.isRunning {
                    Text("localhost:\(LocalServer.port)/tokens")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .fontDesign(.monospaced)
                } else if let err = server.errorMessage {
                    Text(err)
                        .font(.caption)
                        .foregroundStyle(.red)
                } else {
                    Text("Figma plugin will auto-fetch tokens")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            Spacer()

            Button(server.isRunning ? "Stop" : "Start") {
                if server.isRunning { server.stop() } else { server.start() }
            }
            .buttonStyle(.bordered)
            .controlSize(.small)
        }
        .padding(16)
        .background(
            server.isRunning
                ? Color.green.opacity(0.06)
                : Color(nsColor: .controlBackgroundColor)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .strokeBorder(
                    server.isRunning ? Color.green.opacity(0.25) : Color(nsColor: .separatorColor),
                    lineWidth: 1
                )
        )
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

enum SyncStatus {
    case idle, syncing, success, error(String)
}
