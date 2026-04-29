import Foundation
import SwiftUI

/// Resolves semantic token aliases to their raw values (hex, number, etc.)
struct TokenResolver {
    let ds: DesignSystem

    // MARK: - Primitive color map: token name → hex

    var primitiveColors: [String: String] {
        var map: [String: String] = [:]
        for ramp in ds.colors.ramps where ramp.isVisible {
            let swatches = ColorGenerator.generate(ramp: ramp)
            let rampKey = ramp.name.lowercased().replacingOccurrences(of: " ", with: "-")
            for swatch in swatches {
                map["color/\(rampKey)/\(swatch.step)"] = swatch.hex
            }
        }
        for color in ds.colors.standalones {
            let key = "color/\(color.name.lowercased().replacingOccurrences(of: " ", with: "-"))"
            map[key] = color.hex
        }
        return map
    }

    /// All primitive token names sorted
    var allPrimitiveNames: [String] { primitiveColors.keys.sorted() }

    // MARK: - Resolve semantic token → hex for a given mode name

    func resolveHex(tokenName: String, modeName: String) -> String? {
        let modeId = ds.modes.first { $0.name == modeName }?.id.uuidString
        guard let token = ds.semanticTokens.first(where: { $0.name == tokenName }) else { return nil }
        let value = modeId.flatMap { token.modeValues[$0] } ?? token.modeValues.values.first
        return resolveValueToHex(value, modeName: modeName, depth: 5)
    }

    func resolveColor(tokenName: String, modeName: String) -> Color? {
        guard let hex = resolveHex(tokenName: tokenName, modeName: modeName) else { return nil }
        return Color(hex: hex)
    }

    /// Recursively resolve a TokenValue to hex — passes modeName through the chain
    func resolveValueToHex(_ value: TokenValue?, modeName: String = "Light", depth: Int = 5) -> String? {
        guard depth > 0, let value = value else { return nil }
        switch value {
        case .color(let hex):
            return hex
        case .alias(let name):
            // Primitives first (color ramps)
            if let hex = primitiveColors[name] { return hex }
            // Semantic alias — resolve with correct mode
            let modeId = ds.modes.first { $0.name == modeName }?.id.uuidString
            let semToken = ds.semanticTokens.first { $0.name == name }
            let semVal = modeId.flatMap { semToken?.modeValues[$0] } ?? semToken?.modeValues.values.first
            return resolveValueToHex(semVal, modeName: modeName, depth: depth - 1)
        default:
            return nil
        }
    }

    /// Parse a string into a TokenValue
    static func parseValue(_ raw: String, type: TokenType) -> TokenValue {
        let trimmed = raw.trimmingCharacters(in: .whitespaces)
        if trimmed.hasPrefix("{") && trimmed.hasSuffix("}") {
            return .alias(String(trimmed.dropFirst().dropLast()))
        }
        switch type {
        case .color:                return .color(trimmed)
        case .number, .dimension:  return .number(Double(trimmed) ?? 0)
        case .boolean:             return .boolean(trimmed.lowercased() == "true")
        default:                   return .string(trimmed)
        }
    }

    /// Display string for a TokenValue
    static func displayValue(_ value: TokenValue?) -> String {
        switch value {
        case .alias(let name):  return "{\(name)}"
        case .color(let hex):   return hex
        case .number(let n):    return String(format: "%.2f", n)
        case .string(let s):    return s
        case .boolean(let b):   return b ? "true" : "false"
        case nil:               return "—"
        }
    }
}
