import Foundation

// MARK: - Spacing

struct SpacingFoundation: Codable {
    var baseUnit: Double = 4             // px — all spacing = multiples of base
    var steps: [SpacingStep] = SpacingStep.defaults
}

struct SpacingStep: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String           // e.g. "0", "1", "2", "xs", "sm", "md"
    var multiplier: Double     // value = base * multiplier
    var alias: String? = nil   // optional semantic name

    var valuePx: Double { 4 * multiplier }

    static var defaults: [SpacingStep] {
        let pairs: [(String, Double)] = [
            ("0", 0), ("1", 1), ("2", 2), ("3", 3), ("4", 4),
            ("5", 5), ("6", 6), ("8", 8), ("10", 10), ("12", 12),
            ("16", 16), ("20", 20), ("24", 24), ("32", 32), ("40", 40), ("48", 48)
        ]
        return pairs.map { SpacingStep(name: $0.0, multiplier: $0.1) }
    }
}

// MARK: - Radius

struct RadiusFoundation: Codable {
    var steps: [RadiusStep] = RadiusStep.defaults
}

struct RadiusStep: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var value: Double          // px. 9999 = full
    var isNone: Bool = false
    var isFull: Bool = false

    static var defaults: [RadiusStep] {
        [
            RadiusStep(name: "none", value: 0, isNone: true),
            RadiusStep(name: "sm", value: 2),
            RadiusStep(name: "md", value: 4),
            RadiusStep(name: "lg", value: 8),
            RadiusStep(name: "xl", value: 12),
            RadiusStep(name: "2xl", value: 16),
            RadiusStep(name: "3xl", value: 24),
            RadiusStep(name: "full", value: 9999, isFull: true)
        ]
    }
}

// MARK: - Shadow

struct ShadowFoundation: Codable {
    var shadows: [ShadowToken] = ShadowToken.defaults
}

struct ShadowToken: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var layers: [ShadowLayer] = []

    static var defaults: [ShadowToken] {
        [
            ShadowToken(name: "sm", layers: [ShadowLayer(x: 0, y: 1, blur: 2, spread: 0, colorHex: "#000000", opacity: 0.05)]),
            ShadowToken(name: "md", layers: [ShadowLayer(x: 0, y: 4, blur: 6, spread: -1, colorHex: "#000000", opacity: 0.1)]),
            ShadowToken(name: "lg", layers: [ShadowLayer(x: 0, y: 10, blur: 15, spread: -3, colorHex: "#000000", opacity: 0.1)]),
            ShadowToken(name: "xl", layers: [ShadowLayer(x: 0, y: 20, blur: 25, spread: -5, colorHex: "#000000", opacity: 0.1)])
        ]
    }
}

struct ShadowLayer: Identifiable, Codable {
    var id: UUID = UUID()
    var x: Double = 0
    var y: Double = 4
    var blur: Double = 8
    var spread: Double = 0
    var colorHex: String = "#000000"
    var opacity: Double = 0.1
    var isInner: Bool = false
}

// MARK: - Opacity

struct OpacityFoundation: Codable {
    var steps: [OpacityStep] = OpacityStep.defaults
}

struct OpacityStep: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var value: Double          // 0.0 – 1.0

    static var defaults: [OpacityStep] {
        [("0", 0), ("5", 0.05), ("10", 0.1), ("20", 0.2), ("30", 0.3),
         ("40", 0.4), ("50", 0.5), ("60", 0.6), ("70", 0.7), ("80", 0.8),
         ("90", 0.9), ("95", 0.95), ("100", 1.0)]
        .map { OpacityStep(name: $0.0, value: $0.1) }
    }
}

// MARK: - Motion

struct MotionFoundation: Codable {
    var durations: [MotionDuration] = MotionDuration.defaults
    var easings: [MotionEasing] = MotionEasing.defaults
}

struct MotionDuration: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var ms: Double

    static var defaults: [MotionDuration] {
        [("instant", 0.0), ("fast", 100.0), ("normal", 200.0), ("slow", 300.0), ("slower", 500.0)]
        .map { MotionDuration(name: $0.0, ms: $0.1) }
    }
}

struct MotionEasing: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var cssValue: String

    static var defaults: [MotionEasing] {
        [
            MotionEasing(name: "linear", cssValue: "linear"),
            MotionEasing(name: "ease", cssValue: "ease"),
            MotionEasing(name: "ease-in", cssValue: "ease-in"),
            MotionEasing(name: "ease-out", cssValue: "ease-out"),
            MotionEasing(name: "ease-in-out", cssValue: "ease-in-out"),
            MotionEasing(name: "spring", cssValue: "cubic-bezier(0.34, 1.56, 0.64, 1)")
        ]
    }
}

// MARK: - Z-Index

struct ZIndexFoundation: Codable {
    var steps: [ZIndexStep] = ZIndexStep.defaults
}

struct ZIndexStep: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var value: Int

    static var defaults: [ZIndexStep] {
        [("below", -1), ("base", 0), ("raised", 10), ("dropdown", 100),
         ("sticky", 200), ("overlay", 300), ("modal", 400), ("toast", 500), ("tooltip", 600)]
        .map { ZIndexStep(name: $0.0, value: $0.1) }
    }
}

// MARK: - Grid

struct GridFoundation: Codable {
    var breakpoints: [GridBreakpoint] = GridBreakpoint.defaults
}

struct GridBreakpoint: Identifiable, Codable {
    var id: UUID = UUID()
    var name: String
    var minWidth: Double       // px
    var columns: Int
    var gutter: Double         // px
    var margin: Double         // px

    static var defaults: [GridBreakpoint] {
        [
            GridBreakpoint(name: "sm", minWidth: 0, columns: 4, gutter: 16, margin: 16),
            GridBreakpoint(name: "md", minWidth: 768, columns: 8, gutter: 24, margin: 24),
            GridBreakpoint(name: "lg", minWidth: 1024, columns: 12, gutter: 24, margin: 32),
            GridBreakpoint(name: "xl", minWidth: 1280, columns: 12, gutter: 32, margin: 40)
        ]
    }
}
