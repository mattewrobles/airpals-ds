import Foundation
import SwiftUI

// MARK: - Root Design System model

struct DesignSystem: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var description: String = ""
    var version: String = "1.0.0"
    var createdAt: Date = Date()
    var updatedAt: Date = Date()

    // Foundations
    var colors: ColorFoundation = ColorFoundation()
    var typography: TypographyFoundation = TypographyFoundation()
    var spacing: SpacingFoundation = SpacingFoundation()
    var radius: RadiusFoundation = RadiusFoundation()
    var shadow: ShadowFoundation = ShadowFoundation()
    var opacity: OpacityFoundation = OpacityFoundation()
    var motion: MotionFoundation = MotionFoundation()
    var zIndex: ZIndexFoundation = ZIndexFoundation()
    var grid: GridFoundation = GridFoundation()

    // Tokens
    var semanticTokens: [SemanticToken] = []
    var componentTokens: [ComponentToken] = []

    // Config
    var tokenNaming: TokenNaming = TokenNaming()
    var modes: [DSMode] = [DSMode(name: "Light"), DSMode(name: "Dark")]
}

// MARK: - Modes

struct DSMode: Identifiable, Codable, Hashable {
    var id: UUID = UUID()
    var name: String
}

// MARK: - Token Naming

struct TokenNaming: Codable {
    var separator: TokenSeparator = .slash
    var segments: [NamingSegment] = [
        NamingSegment(type: .fixed, value: "color"),
        NamingSegment(type: .ramp, value: nil),
        NamingSegment(type: .step, value: nil)
    ]
}

enum TokenSeparator: String, Codable, CaseIterable {
    case slash = "/"
    case dot = "."
    case dash = "-"
    case underscore = "_"
}

struct NamingSegment: Identifiable, Codable {
    var id: UUID = UUID()
    var type: NamingSegmentType
    var value: String?
}

enum NamingSegmentType: String, Codable {
    case fixed, ramp, step, mode, category
}
