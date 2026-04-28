import SwiftUI

struct OnboardingView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var showNewSheet = false
    @State private var showOpenPanel = false

    var body: some View {
        ZStack {
            Color(nsColor: .windowBackgroundColor)
                .ignoresSafeArea()

            VStack(spacing: 0) {
                // Header
                VStack(spacing: 8) {
                    Image(systemName: "triangle.fill")
                        .font(.system(size: 48))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.purple, .blue, .cyan],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                    Text("Prism")
                        .font(.largeTitle.bold())
                    Text("Design System Builder")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .padding(.top, 60)
                .padding(.bottom, 40)

                // Actions
                HStack(spacing: 16) {
                    OnboardingActionCard(
                        icon: "plus.square.fill",
                        title: "New Design System",
                        subtitle: "Start from blank or preset"
                    ) { showNewSheet = true }

                    OnboardingActionCard(
                        icon: "folder.fill",
                        title: "Open Existing",
                        subtitle: "Open a .prism file"
                    ) { openFile() }
                }
                .padding(.horizontal, 60)

                // Recent projects
                if !projectStore.recentProjects.isEmpty {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Recent")
                            .font(.headline)
                            .foregroundStyle(.secondary)
                            .padding(.horizontal, 60)

                        ScrollView {
                            VStack(spacing: 4) {
                                ForEach(projectStore.recentProjects) { recent in
                                    RecentProjectRow(project: recent) {
                                        try? projectStore.open(url: recent.url)
                                    }
                                }
                            }
                            .padding(.horizontal, 60)
                        }
                    }
                    .padding(.top, 32)
                }

                Spacer()
            }
        }
        .sheet(isPresented: $showNewSheet) {
            NewProjectSheet()
        }
    }

    private func openFile() {
        let panel = NSOpenPanel()
        panel.allowedContentTypes = [.init(filenameExtension: "prism")!]
        panel.canChooseFiles = true
        panel.canChooseDirectories = false
        if panel.runModal() == .OK, let url = panel.url {
            try? projectStore.open(url: url)
        }
    }
}

// MARK: - Action Card

struct OnboardingActionCard: View {
    let icon: String
    let title: String
    let subtitle: String
    let action: () -> Void

    @State private var isHovered = false

    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.system(size: 28))
                    .foregroundStyle(.blue)
                Text(title)
                    .font(.headline)
                Text(subtitle)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .frame(maxWidth: .infinity)
            .padding(24)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color(nsColor: .controlBackgroundColor))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .strokeBorder(isHovered ? Color.blue.opacity(0.5) : Color.clear, lineWidth: 1.5)
                    )
            )
        }
        .buttonStyle(.plain)
        .onHover { isHovered = $0 }
    }
}

// MARK: - Recent Project Row

struct RecentProjectRow: View {
    let project: RecentProject
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack {
                Image(systemName: "triangle.fill")
                    .foregroundStyle(.purple)
                VStack(alignment: .leading, spacing: 2) {
                    Text(project.name)
                        .font(.body)
                    Text(project.url.path)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
                Spacer()
                Text(project.openedAt.formatted(.relative(presentation: .named)))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(.vertical, 8)
            .padding(.horizontal, 12)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}
