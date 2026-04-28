import Foundation

// MARK: - Semantic Token (alias)

struct SemanticToken: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String                    // e.g. "text/primary"
    var type: TokenType
    var modeValues: [String: TokenValue] // modeId -> value

    // Helper: value for default (first) mode
    var defaultValue: TokenValue? {
        modeValues.values.first
    }
}

// MARK: - Component Token

struct ComponentToken: Identifiable, Codable {
    var id: UUID = UUID()
    var component: String              // e.g. "button"
    var name: String                   // e.g. "button/bg/primary"
    var type: TokenType
    var modeValues: [String: TokenValue]
}

// MARK: - Token Value (alias or raw)

enum TokenValue: Codable, Equatable {
    case alias(String)          // references another token by name
    case color(String)          // hex
    case number(Double)
    case string(String)
    case boolean(Bool)

    var isAlias: Bool {
        if case .alias = self { return true }
        return false
    }

    var aliasTarget: String? {
        if case .alias(let t) = self { return t }
        return nil
    }
}

// MARK: - Token Type

enum TokenType: String, Codable, CaseIterable {
    case color
    case number
    case string
    case boolean
    case dimension
    case fontFamily
    case fontWeight
    case duration
    case cubicBezier
    case shadow
    case typography
    case gradient
}

// MARK: - Export format options

enum ExportFormat: String, CaseIterable {
    case figmaVariables = "Figma Variables"
    case dtcg = "DTCG (Tokens Studio)"
    case cssVariables = "CSS Variables"
    case swiftTokens = "Swift Tokens"

    var description: String {
        switch self {
        case .figmaVariables: return "Drop-in for Figma's native variable importer"
        case .dtcg: return "Full fidelity — keeps composite tokens. W3C standard."
        case .cssVariables: return "CSS custom properties for web projects"
        case .swiftTokens: return "Swift enum/struct tokens for iOS/macOS"
        }
    }
}
