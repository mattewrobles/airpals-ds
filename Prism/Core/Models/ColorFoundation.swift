import Foundation
import SwiftUI

// MARK: - Color Foundation

struct ColorFoundation: Codable {
    var ramps: [ColorRamp] = []
    var standalones: [StandaloneColor] = []
}

// MARK: - Color Ramp (e.g. Primary, Neutral, Success)

struct ColorRamp: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var seedHex: String          // base color user picks
    var steps: Int = 11          // number of swatches (e.g. 100–900 or 50–950)
    var oklch: OKLCHConfig = OKLCHConfig()
    var figmaScope: FigmaScope = .all
    var isVisible: Bool = true

    // Computed at runtime — not stored
    var generatedSwatches: [ColorSwatch] = []

    enum CodingKeys: String, CodingKey {
        case id, name, seedHex, steps, oklch, figmaScope, isVisible
    }
}

// MARK: - OKLCH generation config

struct OKLCHConfig: Codable {
    // Chroma
    var chromaStart: Double = 0.18       // chroma at step 0 (lightest)
    var chromaEnd: Double = 0.18         // chroma at step max (darkest)
    var chromaFalloff: Double = 0.75     // falloff at extremes (0–1)

    // Lightness
    var lightnessTop: Double = 0.97      // lightness of lightest step
    var lightnessBottom: Double = 0.15   // lightness of darkest step
    var lightnessCurve: EasingCurve = .easeInOut

    // Hue
    var hueStart: Double = 0             // hue of seed color (auto-detected)
    var hueShift: Double = 0             // optional hue rotation across ramp
}

enum EasingCurve: String, Codable, CaseIterable {
    case linear = "Linear"
    case easeIn = "Ease In"
    case easeOut = "Ease Out"
    case easeInOut = "Ease In Out"
    case circularIn = "Circular In"
    case circularOut = "Circular Out"
}

// MARK: - Individual swatch (generated)

struct ColorSwatch: Identifiable {
    var id: UUID = UUID()
    var step: Int               // e.g. 100, 200...900
    var hex: String
    var oklchL: Double
    var oklchC: Double
    var oklchH: Double
    var contrastOnWhite: Double
    var contrastOnBlack: Double
    var tokenName: String

    var wcagOnWhite: WCAGLevel {
        WCAGLevel.from(ratio: contrastOnWhite)
    }
    var wcagOnBlack: WCAGLevel {
        WCAGLevel.from(ratio: contrastOnBlack)
    }
}

enum WCAGLevel {
    case fail, aa, aaLarge, aaa

    static func from(ratio: Double) -> WCAGLevel {
        if ratio >= 7.0 { return .aaa }
        if ratio >= 4.5 { return .aa }
        if ratio >= 3.0 { return .aaLarge }
        return .fail
    }

    var label: String {
        switch self {
        case .fail: return "FAIL"
        case .aaLarge: return "AA+"
        case .aa: return "AA"
        case .aaa: return "AAA"
        }
    }

    var color: Color {
        switch self {
        case .fail: return .red
        case .aaLarge: return .orange
        case .aa: return .blue
        case .aaa: return .green
        }
    }
}

// MARK: - Standalone color

struct StandaloneColor: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var hex: String
    var figmaScope: FigmaScope = .all
}

// MARK: - Figma scope

enum FigmaScope: String, Codable, CaseIterable {
    case all = "All"
    case fillColor = "Fill Color"
    case strokeColor = "Stroke Color"
    case textColor = "Text Fill"
    case effectColor = "Effect Color"
    case frameColor = "Frame Fill"
    case none = "None"
}
