import SwiftUI
import UniformTypeIdentifiers

struct MainAppView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedSection: DSSection = .colors
    @State private var columnVisibility: NavigationSplitViewVisibility = .all

    var body: some View {
        NavigationSplitView(columnVisibility: $columnVisibility) {
            SidebarView(selectedSection: $selectedSection)
                .navigationSplitViewColumnWidth(min: 200, ideal: 220, max: 260)
        } detail: {
            DetailView(section: selectedSection)
        }
        .navigationTitle(projectStore.currentProject?.name ?? "Prism")
        .toolbar {
            ToolbarItem(placement: .navigation) {
                Text(projectStore.currentProject?.name ?? "")
                    .font(.headline)
            }
            ToolbarItem(placement: .navigation) {
                Button {
                    let panel = NSOpenPanel()
                    panel.allowedContentTypes = [UTType(filenameExtension: "prism") ?? .data]
                    panel.title = "Open Design System"
                    if panel.runModal() == .OK, let url = panel.url {
                        try? projectStore.open(url: url)
                    }
                } label: {
                    Label("Open", systemImage: "folder")
                }
            }
            ToolbarItem(placement: .navigation) {
                Button {
                    let panel = NSSavePanel()
                    panel.allowedContentTypes = [UTType(filenameExtension: "prism") ?? .data]
                    panel.title = "Save Design System"
                    panel.nameFieldStringValue = (projectStore.currentProject?.name ?? "Untitled") + ".prism"
                    if panel.runModal() == .OK, let url = panel.url {
                        try? projectStore.save(to: url)
                    }
                } label: {
                    Label("Save", systemImage: projectStore.isDirty ? "square.and.arrow.down.fill" : "square.and.arrow.down")
                }
                .keyboardShortcut("s", modifiers: .command)
            }
            ToolbarItem(placement: .primaryAction) {
                Button {
                    NotificationCenter.default.post(name: .exportTokens, object: nil)
                } label: {
                    Label("Export", systemImage: "square.and.arrow.up")
                }
            }
            ToolbarItem(placement: .primaryAction) {
                Button {
                    NotificationCenter.default.post(name: .openFigmaSync, object: nil)
                } label: {
                    Label("Figma Sync", systemImage: "arrow.triangle.2.circlepath")
                }
            }
        }
    }
}

// MARK: - DS Sections

enum DSSection: String, CaseIterable, Identifiable {
    // Foundations
    case colors = "Colors"
    case typography = "Typography"
    case sizes = "Sizes"
    case spacing = "Spacing"
    case radius = "Radius"
    case opacity = "Opacity"
    case shadow = "Shadow"
    case motion = "Motion"
    case zIndex = "Z-Index"
    case grid = "Grid"
    // Tokens
    case primitives = "Primitives"
    case semantic = "Semantic Tokens"
    case component = "Component Tokens"
    // Other
    case preview = "Preview"
    case audit = "Accessibility Audit"
    case figmaSync = "Figma Sync"

    var id: String { rawValue }

    var icon: String {
        switch self {
        case .colors: return "paintpalette.fill"
        case .typography: return "textformat"
        case .sizes: return "ruler"
        case .spacing: return "arrow.left.and.right"
        case .radius: return "capsule.fill"
        case .opacity: return "circle.lefthalf.filled"
        case .shadow: return "rectangle.3.group"
        case .motion: return "waveform.path"
        case .zIndex: return "square.3.layers.3d"
        case .grid: return "grid"
        case .primitives: return "circle.grid.3x3"
        case .semantic: return "tag.fill"
        case .component: return "puzzlepiece.fill"
        case .preview: return "eye.fill"
        case .audit: return "checkmark.shield.fill"
        case .figmaSync: return "arrow.triangle.2.circlepath"
        }
    }
}

// MARK: - Sidebar

struct SidebarView: View {
    @Binding var selectedSection: DSSection

    var body: some View {
        List(selection: $selectedSection) {
            SidebarGroup(title: "Foundations", sections: [
                .colors, .typography, .sizes, .spacing, .radius,
                .opacity, .shadow, .motion, .zIndex, .grid
            ], selected: $selectedSection)

            SidebarGroup(title: "Tokens", sections: [
                .primitives, .semantic, .component
            ], selected: $selectedSection)

            Divider().padding(.vertical, 4)

            SidebarItem(section: .preview, selected: $selectedSection)
            SidebarItem(section: .audit, selected: $selectedSection)
            SidebarItem(section: .figmaSync, selected: $selectedSection)
        }
        .listStyle(.sidebar)
    }
}

struct SidebarGroup: View {
    let title: String
    let sections: [DSSection]
    @Binding var selected: DSSection

    var body: some View {
        Section(title) {
            ForEach(sections) { section in
                SidebarItem(section: section, selected: $selected)
            }
        }
    }
}

struct SidebarItem: View {
    let section: DSSection
    @Binding var selected: DSSection

    var body: some View {
        Label(section.rawValue, systemImage: section.icon)
            .tag(section)
    }
}

// MARK: - Detail router

struct DetailView: View {
    let section: DSSection

    var body: some View {
        switch section {
        case .colors:       ColorsView()
        case .typography:   TypographyView()
        case .sizes:        SizesView()
        case .spacing:      SpacingView()
        case .radius:       RadiusView()
        case .shadow:       ShadowView()
        case .opacity:      OpacityView()
        case .motion:       MotionView()
        case .zIndex:       ZIndexView()
        case .grid:         GridView()
        case .primitives:   PrimitivesView()
        case .semantic:     SemanticTokensView()
        case .component:    ComponentTokensView()
        case .preview:      PreviewView()
        case .audit:        AuditView()
        case .figmaSync:    FigmaSyncView()
        }
    }
}

struct PlaceholderView: View {
    let section: DSSection
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: section.icon)
                .font(.system(size: 40))
                .foregroundStyle(.secondary)
            Text(section.rawValue)
                .font(.title2.bold())
            Text("Coming soon")
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
