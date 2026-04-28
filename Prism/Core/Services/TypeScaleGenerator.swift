import Foundation

struct TypeScaleGenerator {

    static func generate(foundation: TypographyFoundation) -> [TypeStep] {
        let base = foundation.baseSize
        let ratio = foundation.scaleRatio.rawValue
        let above = foundation.stepsAbove
        let below = foundation.stepsBelow

        var steps: [TypeStep] = []

        // Steps below base (negative)
        for i in stride(from: below, through: 1, by: -1) {
            let sizePx = base / pow(ratio, Double(i))
            steps.append(TypeStep(
                step: -i,
                sizePx: sizePx,
                sizeRem: sizePx / 16,
                tokenName: stepLabel(step: -i, base: base, total: above + below + 1)
            ))
        }

        // Base (step 0)
        steps.append(TypeStep(
            step: 0,
            sizePx: base,
            sizeRem: base / 16,
            tokenName: "base"
        ))

        // Steps above base (positive)
        for i in 1...max(1, above) {
            let sizePx = base * pow(ratio, Double(i))
            steps.append(TypeStep(
                step: i,
                sizePx: sizePx,
                sizeRem: sizePx / 16,
                tokenName: stepLabel(step: i, base: base, total: above + below + 1)
            ))
        }

        return steps
    }

    // Name generation: xs, sm, md, lg, xl, 2xl, 3xl...
    private static func stepLabel(step: Int, base: Double, total: Int) -> String {
        switch step {
        case -2: return "xs"
        case -1: return "sm"
        case  0: return "md"
        case  1: return "lg"
        case  2: return "xl"
        case  3: return "2xl"
        case  4: return "3xl"
        case  5: return "4xl"
        case  6: return "5xl"
        case  7: return "6xl"
        case  8: return "7xl"
        case  9: return "8xl"
        default: return step < 0 ? "\(abs(step))xs" : "\(step)xl"
        }
    }
}
