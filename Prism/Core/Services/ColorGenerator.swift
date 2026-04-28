import Foundation
import SwiftUI

// MARK: - OKLCH Color Generator
// Generates perceptually uniform color ramps using OKLCH color space

struct ColorGenerator {

    /// Generate all swatches for a ramp
    static func generate(ramp: ColorRamp) -> [ColorSwatch] {
        let config = ramp.oklch
        let steps = ramp.steps
        let seed = OKLCHColor.fromHex(ramp.seedHex)

        return (0..<steps).map { index in
            let t = steps <= 1 ? 0.5 : Double(index) / Double(steps - 1)

            // Lightness: interpolate from top to bottom with curve
            let rawL = lerp(config.lightnessTop, config.lightnessBottom, t: t, curve: config.lightnessCurve)

            // Chroma: flat with optional falloff at extremes
            let extremeFactor = min(t, 1 - t) * 2  // 0 at edges, 1 at center
            let chroma = lerp(config.chromaStart, config.chromaEnd, t: t)
                * (1 - config.chromaFalloff * (1 - extremeFactor))

            // Hue from seed + optional shift
            let hue = seed.h + config.hueShift * (t - 0.5)

            let oklch = OKLCHColor(l: rawL, c: max(0, chroma), h: hue)
            let hex = oklch.toHex()

            let stepLabel = stepName(index: index, total: steps)
            let contrastWhite = contrastRatio(hex1: hex, hex2: "#FFFFFF")
            let contrastBlack = contrastRatio(hex1: hex, hex2: "#000000")

            return ColorSwatch(
                step: stepLabel,
                hex: hex,
                oklchL: oklch.l,
                oklchC: oklch.c,
                oklchH: oklch.h,
                contrastOnWhite: contrastWhite,
                contrastOnBlack: contrastBlack,
                tokenName: ""
            )
        }
    }

    // MARK: - Step naming (100, 200... or 50, 100... based on count)
    private static func stepName(index: Int, total: Int) -> Int {
        if total == 11 {
            // 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
            let names = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
            return names[min(index, names.count - 1)]
        }
        return (index + 1) * (1000 / total)
    }

    // MARK: - Easing interpolation
    private static func lerp(_ a: Double, _ b: Double, t: Double, curve: EasingCurve = .linear) -> Double {
        let eased = applyEasing(t, curve: curve)
        return a + (b - a) * eased
    }

    private static func applyEasing(_ t: Double, curve: EasingCurve) -> Double {
        switch curve {
        case .linear: return t
        case .easeIn: return t * t
        case .easeOut: return t * (2 - t)
        case .easeInOut: return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        case .circularIn: return 1 - sqrt(1 - t * t)
        case .circularOut: return sqrt(1 - (t - 1) * (t - 1))
        }
    }

    // MARK: - WCAG Contrast
    static func contrastRatio(hex1: String, hex2: String) -> Double {
        let l1 = relativeLuminance(hex: hex1)
        let l2 = relativeLuminance(hex: hex2)
        let lighter = max(l1, l2)
        let darker = min(l1, l2)
        return (lighter + 0.05) / (darker + 0.05)
    }

    private static func relativeLuminance(hex: String) -> Double {
        let rgb = hexToRGB(hex)
        func linearize(_ c: Double) -> Double {
            c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4)
        }
        return 0.2126 * linearize(rgb.r) + 0.7152 * linearize(rgb.g) + 0.0722 * linearize(rgb.b)
    }

    static func hexToRGB(_ hex: String) -> (r: Double, g: Double, b: Double) {
        var h = hex.trimmingCharacters(in: .alphanumerics.inverted)
        if h.count == 3 { h = h.map { "\($0)\($0)" }.joined() }
        guard h.count == 6, let value = UInt64(h, radix: 16) else { return (0, 0, 0) }
        return (
            Double((value >> 16) & 0xFF) / 255,
            Double((value >> 8) & 0xFF) / 255,
            Double(value & 0xFF) / 255
        )
    }
}

// MARK: - OKLCH Color struct

struct OKLCHColor {
    var l: Double   // 0–1 lightness
    var c: Double   // 0–0.4 chroma
    var h: Double   // 0–360 hue

    // Approximate OKLCH → sRGB hex conversion
    func toHex() -> String {
        let (r, g, b) = oklchToSRGB(l: l, c: c, h: h)
        let ri = Int(clamp(r, 0, 1) * 255)
        let gi = Int(clamp(g, 0, 1) * 255)
        let bi = Int(clamp(b, 0, 1) * 255)
        return String(format: "#%02X%02X%02X", ri, gi, bi)
    }

    // Approximate hex → OKLCH (via OKLab)
    static func fromHex(_ hex: String) -> OKLCHColor {
        let rgb = ColorGenerator.hexToRGB(hex)
        return sRGBToOKLCH(r: rgb.r, g: rgb.g, b: rgb.b)
    }

    // MARK: - Color space math

    private static func sRGBToOKLCH(r: Double, g: Double, b: Double) -> OKLCHColor {
        func linearize(_ c: Double) -> Double {
            c >= 0.04045 ? pow((c + 0.055) / 1.055, 2.4) : c / 12.92
        }
        let rl = linearize(r); let gl = linearize(g); let bl = linearize(b)

        // Linear sRGB → OKLab
        let l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl
        let m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl
        let s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl

        let lp = Foundation.cbrt(l); let mp = Foundation.cbrt(m); let sp = Foundation.cbrt(s)

        let okL = 0.2104542553 * lp + 0.7936177850 * mp - 0.0040720468 * sp
        let okA = 1.9779984951 * lp - 2.4285922050 * mp + 0.4505937099 * sp
        let okB = 0.0259040371 * lp + 0.7827717662 * mp - 0.8086757660 * sp

        let C = sqrt(okA * okA + okB * okB)
        let H = (atan2(okB, okA) * 180 / .pi + 360).truncatingRemainder(dividingBy: 360)
        return OKLCHColor(l: okL, c: C, h: H)
    }

    private func oklchToSRGB(l: Double, c: Double, h: Double) -> (Double, Double, Double) {
        let hRad = h * .pi / 180
        let okA = c * cos(hRad)
        let okB = c * sin(hRad)

        let lp = l + 0.3963377774 * okA + 0.2158037573 * okB
        let mp = l - 0.1055613458 * okA - 0.0638541728 * okB
        let sp = l - 0.0894841775 * okA - 1.2914855480 * okB

        let lv = lp * lp * lp
        let mv = mp * mp * mp
        let sv = sp * sp * sp

        let rl = +4.0767416621 * lv - 3.3077115913 * mv + 0.2309699292 * sv
        let gl = -1.2684380046 * lv + 2.6097574011 * mv - 0.3413193965 * sv
        let bl = -0.0041960863 * lv - 0.7034186147 * mv + 1.7076147010 * sv

        func toSRGB(_ c: Double) -> Double {
            c >= 0.0031308 ? 1.055 * pow(c, 1 / 2.4) - 0.055 : 12.92 * c
        }
        return (toSRGB(rl), toSRGB(gl), toSRGB(bl))
    }

    private func clamp(_ v: Double, _ lo: Double, _ hi: Double) -> Double {
        min(max(v, lo), hi)
    }
}
