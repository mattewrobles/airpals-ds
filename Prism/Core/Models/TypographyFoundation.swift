import Foundation

// MARK: - Typography Foundation

struct TypographyFoundation: Codable {
    var baseSize: Double = 16           // px
    var scaleRatio: ScaleRatio = .majorThird
    var stepsAbove: Int = 5
    var stepsBelow: Int = 2
    var families: [TypographyFamily] = []
    var roles: [TypographicRole] = TypographicRole.defaults
    var letterSpacingScale: LetterSpacingScale = LetterSpacingScale()
}

// MARK: - Typographic Role
// Maps a scale step → named role (Display 1, H1, Body, etc.)

struct TypographicRole: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String            // "Display 1", "H1", "Body Large"
    var scaleStep: Int          // which step from the generated scale
    var familyName: String      // matches TypographyFamily.name ("headings", "body")
    var weight: Int = 400       // 100–900
    var lineHeight: Double = 1.5  // multiplier e.g. 1.2, 1.5
    var letterSpacing: String = "0"  // e.g. "-0.02em"
    var isVisible: Bool = true

    var tokenName: String {
        name.lowercased()
            .replacingOccurrences(of: " ", with: "-")
            .replacingOccurrences(of: "/", with: "-")
    }

    static var defaults: [TypographicRole] {
        [
            TypographicRole(name: "Display 1",  scaleStep: 5, familyName: "headings", weight: 700, lineHeight: 1.1, letterSpacing: "-0.02em"),
            TypographicRole(name: "Display 2",  scaleStep: 4, familyName: "headings", weight: 700, lineHeight: 1.15, letterSpacing: "-0.02em"),
            TypographicRole(name: "H1",         scaleStep: 3, familyName: "headings", weight: 700, lineHeight: 1.2, letterSpacing: "-0.01em"),
            TypographicRole(name: "H2",         scaleStep: 2, familyName: "headings", weight: 600, lineHeight: 1.25, letterSpacing: "-0.01em"),
            TypographicRole(name: "H3",         scaleStep: 1, familyName: "headings", weight: 600, lineHeight: 1.3, letterSpacing: "0"),
            TypographicRole(name: "H4",         scaleStep: 0, familyName: "headings", weight: 600, lineHeight: 1.4, letterSpacing: "0"),
            TypographicRole(name: "Body Large", scaleStep: 1, familyName: "body",     weight: 400, lineHeight: 1.6, letterSpacing: "0"),
            TypographicRole(name: "Body",       scaleStep: 0, familyName: "body",     weight: 400, lineHeight: 1.5, letterSpacing: "0"),
            TypographicRole(name: "Body Small", scaleStep: -1, familyName: "body",    weight: 400, lineHeight: 1.5, letterSpacing: "0"),
            TypographicRole(name: "Caption",    scaleStep: -2, familyName: "body",    weight: 400, lineHeight: 1.4, letterSpacing: "0.01em"),
            TypographicRole(name: "Label",      scaleStep: -1, familyName: "body",    weight: 500, lineHeight: 1.0, letterSpacing: "0.04em"),
            TypographicRole(name: "Overline",   scaleStep: -2, familyName: "body",    weight: 600, lineHeight: 1.0, letterSpacing: "0.08em"),
        ]
    }
}

// MARK: - Scale ratios (modular scale)

enum ScaleRatio: Double, Codable, CaseIterable {
    case minorSecond = 1.067
    case majorSecond = 1.125
    case minorThird = 1.2
    case majorThird = 1.25
    case perfectFourth = 1.333
    case augmentedFourth = 1.414
    case perfectFifth = 1.5
    case goldenRatio = 1.618
    case custom = 0

    var label: String {
        switch self {
        case .minorSecond: return "Minor Second (1.067)"
        case .majorSecond: return "Major Second (1.125)"
        case .minorThird: return "Minor Third (1.2)"
        case .majorThird: return "Major Third (1.25)"
        case .perfectFourth: return "Perfect Fourth (1.333)"
        case .augmentedFourth: return "Aug. Fourth (1.414)"
        case .perfectFifth: return "Perfect Fifth (1.5)"
        case .goldenRatio: return "Golden Ratio (1.618)"
        case .custom: return "Custom"
        }
    }
}

// MARK: - Font family card

struct TypographyFamily: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String                       // e.g. "headings", "body"
    var fontFamily: String = "Inter"
    var selectedWeights: [Int] = [400, 600, 700]   // numeric weights
    var localFontURL: URL? = nil           // if user uploaded custom font
}

// MARK: - Generated type step

struct TypeStep: Identifiable {
    var id: UUID = UUID()
    var step: Int            // 0 = base, positive = above, negative = below
    var sizePx: Double
    var sizeRem: Double
    var tokenName: String
}

// MARK: - Letter spacing scale

struct LetterSpacingScale: Codable {
    var values: [LetterSpacingStep] = LetterSpacingStep.defaults
}

struct LetterSpacingStep: Identifiable, Codable {
    var id: UUID = UUID()
    var step: Int
    var value: String    // e.g. "-0.02em", "0", "0.02em"

    static var defaults: [LetterSpacingStep] {
        [
            LetterSpacingStep(step: 800, value: "-0.02em"),
            LetterSpacingStep(step: 700, value: "-0.02em"),
            LetterSpacingStep(step: 600, value: "-0.01em"),
            LetterSpacingStep(step: 500, value: "-0.01em"),
            LetterSpacingStep(step: 400, value: "0"),
            LetterSpacingStep(step: 300, value: "0"),
            LetterSpacingStep(step: 200, value: "0.02em"),
            LetterSpacingStep(step: 100, value: "0.02em")
        ]
    }
}
