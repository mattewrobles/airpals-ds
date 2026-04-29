import Foundation
import SwiftUI
import Combine

@MainActor
final class ProjectStore: ObservableObject {
    @Published var currentProject: DesignSystem? = nil
    @Published var recentProjects: [RecentProject] = []
    @Published var isSaving: Bool = false
    @Published var isDirty: Bool = false

    let localServer = LocalServer()

    private let recentProjectsKey = "prism.recentProjects"

    init() {
        loadRecentProjects()
        localServer.tokenProvider = { [weak self] in
            guard let ds = self?.currentProject else { return Data("{}".utf8) }
            return TokenExporter.exportJSON(ds: ds)
        }
        localServer.start()
    }

    // MARK: - Project lifecycle

    func createNew(name: String, preset: DSPreset = .blank) {
        var ds = preset.makeDesignSystem()
        ds.name = name
        currentProject = ds
        isDirty = true
    }

    func open(url: URL) throws {
        let data = try Data(contentsOf: url)
        let ds = try JSONDecoder().decode(DesignSystem.self, from: data)
        currentProject = ds
        addRecent(name: ds.name, url: url)
        isDirty = false
    }

    func save(to url: URL) throws {
        guard let ds = currentProject else { return }
        isSaving = true
        defer { isSaving = false }
        let data = try JSONEncoder().encode(ds)
        try data.write(to: url, options: .atomic)
        addRecent(name: ds.name, url: url)
        isDirty = false
    }

    func close() {
        currentProject = nil
        isDirty = false
    }

    // MARK: - Mutations

    func update(_ block: (inout DesignSystem) -> Void) {
        guard currentProject != nil else { return }
        block(&currentProject!)
        isDirty = true
    }

    // MARK: - Recent projects

    private func loadRecentProjects() {
        guard let data = UserDefaults.standard.data(forKey: recentProjectsKey),
              let projects = try? JSONDecoder().decode([RecentProject].self, from: data)
        else { return }
        recentProjects = projects
    }

    private func addRecent(name: String, url: URL) {
        let recent = RecentProject(name: name, url: url, openedAt: Date())
        recentProjects.removeAll { $0.url == url }
        recentProjects.insert(recent, at: 0)
        recentProjects = Array(recentProjects.prefix(10))
        if let data = try? JSONEncoder().encode(recentProjects) {
            UserDefaults.standard.set(data, forKey: recentProjectsKey)
        }
    }
}

// MARK: - Recent Project

struct RecentProject: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var url: URL
    var openedAt: Date
}

// MARK: - DS Presets

enum DSPreset: String, CaseIterable {
    case blank = "Blank"
    case material = "Material Design 3"
    case primer = "GitHub Primer"
    case radix = "Radix UI"
    case tailwind = "Tailwind CSS"

    func makeDesignSystem() -> DesignSystem {
        switch self {
        case .blank:
            return DesignSystem(name: "Untitled")
        case .tailwind:
            return DesignSystem.tailwindPreset()
        default:
            // Other presets TODO in v2
            return DesignSystem(name: rawValue)
        }
    }
}

// MARK: - Tailwind-style preset

extension DesignSystem {
    static func tailwindPreset() -> DesignSystem {
        var ds = DesignSystem(name: "Tailwind Preset")
        ds.colors.ramps = [
            ColorRamp(name: "Primary", seedHex: "#3B82F6", steps: 11),
            ColorRamp(name: "Neutral", seedHex: "#6B7280", steps: 11),
            ColorRamp(name: "Success", seedHex: "#10B981", steps: 11),
            ColorRamp(name: "Warning", seedHex: "#F59E0B", steps: 11),
            ColorRamp(name: "Error", seedHex: "#EF4444", steps: 11)
        ]

        // Default semantic tokens — Light (index 0) and Dark (index 1)
        let lightId = ds.modes[0].id.uuidString
        let darkId  = ds.modes[1].id.uuidString

        func makeToken(_ name: String, light: String, dark: String) -> SemanticToken {
            SemanticToken(
                name: name,
                type: .color,
                modeValues: [
                    lightId: .alias(light),
                    darkId:  .alias(dark)
                ]
            )
        }

        ds.semanticTokens = [
            // Text
            makeToken("text/primary",    light: "color/neutral/900",  dark: "color/neutral/50"),
            makeToken("text/secondary",  light: "color/neutral/600",  dark: "color/neutral/400"),
            makeToken("text/tertiary",   light: "color/neutral/400",  dark: "color/neutral/600"),
            makeToken("text/disabled",   light: "color/neutral/300",  dark: "color/neutral/700"),
            makeToken("text/on-primary", light: "color/neutral/50",   dark: "color/neutral/50"),
            // Backgrounds
            makeToken("bg/default",       light: "color/neutral/50",   dark: "color/neutral/950"),
            makeToken("bg/surface",       light: "color/neutral/100",  dark: "color/neutral/900"),
            makeToken("bg/card",          light: "color/neutral/50",   dark: "color/neutral/800"),
            makeToken("bg/primary",       light: "color/primary/500",  dark: "color/primary/500"),
            makeToken("bg/primary-hover", light: "color/primary/600",  dark: "color/primary/400"),
            // Borders
            makeToken("border/default",  light: "color/neutral/200",  dark: "color/neutral/700"),
            makeToken("border/strong",   light: "color/neutral/400",  dark: "color/neutral/500"),
            // Icons
            makeToken("icon/default",    light: "color/neutral/500",  dark: "color/neutral/400"),
            makeToken("icon/primary",    light: "color/primary/500",  dark: "color/primary/400"),
            // Status
            makeToken("status/success",  light: "color/success/500",  dark: "color/success/400"),
            makeToken("status/warning",  light: "color/warning/500",  dark: "color/warning/400"),
            makeToken("status/error",    light: "color/error/500",    dark: "color/error/400")
        ]

        return ds
    }
}
