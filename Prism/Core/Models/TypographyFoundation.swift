import Foundation

// MARK: - Typography Foundation

struct TypographyFoundation: Codable {
    var baseSize: Double = 16           // px
    var scaleRatio: ScaleRatio = .majorThird
    var stepsAbove: Int = 5
    var stepsBelow: Int = 2
    var families: [TypographyFamily] = []
    var letterSpacingScale: LetterSpacingScale = LetterSpacingScale()
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
