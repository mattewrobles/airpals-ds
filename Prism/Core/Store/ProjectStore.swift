import Foundation
import SwiftUI
import Combine

@MainActor
final class ProjectStore: ObservableObject {
    @Published var currentProject: DesignSystem? = nil
    @Published var recentProjects: [RecentProject] = []
    @Published var isSaving: Bool = false
    @Published var isDirty: Bool = false

    private let recentProjectsKey = "prism.recentProjects"

    init() {
        loadRecentProjects()
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
        return ds
    }
}
