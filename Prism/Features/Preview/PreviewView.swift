import SwiftUI

struct PreviewView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var isDarkMode = false
    @State private var selectedSection: PreviewSection = .components

    var modeName: String { isDarkMode ? "Dark" : "Light" }

    var resolver: TokenResolver? {
        guard let ds = projectStore.currentProject else { return nil }
        return TokenResolver(ds: ds)
    }

    var hasTokens: Bool {
        !(projectStore.currentProject?.semanticTokens.isEmpty ?? true)
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "eye.fill",
                title: "Preview",
                subtitle: "Live component showcase using your semantic tokens.",
                tokenCount: projectStore.currentProject?.semanticTokens.count ?? 0
            )
            Divider()

            // Section picker
            HStack(spacing: 0) {
                ForEach(PreviewSection.allCases, id: \.self) { sec in
                    Button(sec.label) {
                        selectedSection = sec
                    }
                    .buttonStyle(.plain)
                    .font(.system(size: 13, weight: selectedSection == sec ? .semibold : .regular))
                    .foregroundStyle(selectedSection == sec ? .blue : .secondary)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    .overlay(alignment: .bottom) {
                        if selectedSection == sec {
                            Rectangle().fill(Color.blue).frame(height: 2)
                        }
                    }
                }
                Spacer()

                // Light / Dark toggle
                HStack(spacing: 6) {
                    Image(systemName: "sun.min").foregroundStyle(.secondary)
                    Toggle("", isOn: $isDarkMode)
                        .toggleStyle(.switch)
                        .labelsHidden()
                        .scaleEffect(0.85)
                    Image(systemName: "moon.fill").foregroundStyle(.secondary)
                }
                .padding(.trailing, 20)
            }
            .background(Color(nsColor: .windowBackgroundColor))

            Divider()

            if !hasTokens {
                noTokensState
            } else {
                ScrollView {
                    VStack(alignment: .leading, spacing: 32) {
                        switch selectedSection {
                        case .components: componentsSection
                        case .typography:  typographySection
                        case .colors:      colorsSection
                        }
                    }
                    .padding(32)
                }
                .background(bgColor)
            }
        }
    }

    // MARK: - Background

    var bgColor: Color {
        resolver?.resolveColor(tokenName: "bg/default", modeName: modeName) ?? Color(nsColor: .windowBackgroundColor)
    }

    // MARK: - No Tokens State

    var noTokensState: some View {
        VStack(spacing: 16) {
            Image(systemName: "eye.slash")
                .font(.system(size: 40))
                .foregroundStyle(.secondary)
            Text("No semantic tokens")
                .font(.title3.bold())
            Text("Go to Tokens → Semantic Tokens → Generate Color System\nto create tokens that power this preview.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    // MARK: - Components Section

    var componentsSection: some View {
        VStack(alignment: .leading, spacing: 32) {
            buttonShowcase
            inputShowcase
            alertShowcase
            cardShowcase
            badgeShowcase
            liquidGlassShowcase
        }
    }

    var buttonShowcase: some View {
        PreviewBlock(title: "Buttons", resolver: resolver, modeName: modeName) {
            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: 10) {
                    TokenButton(label: "Primary", bg: "button/primary-bg", fg: "button/primary-text",
                                resolver: resolver, modeName: modeName)
                    TokenButton(label: "Secondary", bg: "button/secondary-bg", fg: "button/secondary-text",
                                resolver: resolver, modeName: modeName)
                    TokenButton(label: "Destructive", bg: "button/destructive-bg", fg: "button/destructive-text",
                                resolver: resolver, modeName: modeName)
                    TokenButton(label: "Ghost", bg: nil, fg: "button/ghost-text",
                                resolver: resolver, modeName: modeName, bordered: true)
                }

                // Disabled state
                HStack(spacing: 10) {
                    TokenButton(label: "Disabled", bg: "button/primary-bg", fg: "button/primary-text",
                                resolver: resolver, modeName: modeName, opacity: 0.4)
                    Text("Disabled state (opacity 40%)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }

    var inputShowcase: some View {
        PreviewBlock(title: "Form Inputs", resolver: resolver, modeName: modeName) {
            VStack(spacing: 10) {
                TokenInput(label: "Default", placeholder: "Enter value…",
                           borderToken: "border/default", bgToken: "bg/surface",
                           resolver: resolver, modeName: modeName)
                TokenInput(label: "Focus", placeholder: "Focused input",
                           borderToken: "border/focus", bgToken: "bg/surface",
                           resolver: resolver, modeName: modeName)
                TokenInput(label: "Error", placeholder: "Invalid value",
                           borderToken: "border/error", bgToken: "bg/error",
                           resolver: resolver, modeName: modeName, errorText: "This field is required")
            }
        }
    }

    var alertShowcase: some View {
        PreviewBlock(title: "Alerts & Status", resolver: resolver, modeName: modeName) {
            VStack(spacing: 8) {
                TokenAlert(icon: "checkmark.circle.fill", iconColor: "icon/success",
                           bg: "bg/success", text: "status/success-text",
                           message: "Your changes were saved successfully.",
                           resolver: resolver, modeName: modeName)
                TokenAlert(icon: "exclamationmark.triangle.fill", iconColor: "icon/default",
                           bg: "bg/warning", text: "status/warning-text",
                           message: "You're approaching your usage limit.",
                           resolver: resolver, modeName: modeName)
                TokenAlert(icon: "xmark.circle.fill", iconColor: "icon/error",
                           bg: "bg/error", text: "status/error-text",
                           message: "Unable to process your request.",
                           resolver: resolver, modeName: modeName)
                TokenAlert(icon: "info.circle.fill", iconColor: "icon/primary",
                           bg: "bg/info", text: "text/link",
                           message: "A new version is available.",
                           resolver: resolver, modeName: modeName)
            }
        }
    }

    var cardShowcase: some View {
        PreviewBlock(title: "Cards", resolver: resolver, modeName: modeName) {
            HStack(alignment: .top, spacing: 12) {
                ForEach(["Analytics", "Revenue", "Users"], id: \.self) { title in
                    TokenCard(title: title, resolver: resolver, modeName: modeName)
                }
            }
        }
    }

    var badgeShowcase: some View {
        PreviewBlock(title: "Badges & Labels", resolver: resolver, modeName: modeName) {
            HStack(spacing: 8) {
                ForEach([
                    ("Active",   "icon/success", "bg/success"),
                    ("Warning",  "icon/error",   "bg/warning"),
                    ("Error",    "icon/error",   "bg/error"),
                    ("Default",  "icon/default", "bg/sunken"),
                    ("Primary",  "button/primary-text", "button/primary-bg"),
                ], id: \.0) { badge in
                    TokenBadge(label: badge.0, fgToken: badge.1, bgToken: badge.2,
                               resolver: resolver, modeName: modeName)
                }
            }
        }
    }

    var liquidGlassShowcase: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Liquid Glass")
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.secondary)

            ZStack {
                // Colorful gradient backdrop
                LinearGradient(
                    colors: [
                        resolver?.resolveColor(tokenName: "button/primary-bg", modeName: modeName) ?? .blue,
                        (resolver?.resolveColor(tokenName: "icon/success", modeName: modeName) ?? .purple).opacity(0.8),
                        (resolver?.resolveColor(tokenName: "icon/error", modeName: modeName) ?? .pink).opacity(0.7)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .frame(height: 148)
                .clipShape(RoundedRectangle(cornerRadius: 16))

                HStack(spacing: 10) {
                    GlassCard(icon: "sparkles",    label: "Glass Card",  accent: .white)
                    GlassCard(icon: "bolt.fill",   label: "Frosted",     accent: .white)
                    GlassCard(icon: "drop.fill",   label: "Vibrancy",    accent: .white)
                }
                .padding(.horizontal, 16)
            }

            // Flat glass bars
            VStack(spacing: 6) {
                ForEach([
                    ("sidebar.left", "Navigation Bar — .ultraThinMaterial"),
                    ("rectangle.bottomthird.inset.filled", "Tab Bar — .thinMaterial"),
                    ("square.grid.2x2", "Sheet — .regularMaterial")
                ], id: \.0) { item in
                    HStack(spacing: 10) {
                        Image(systemName: item.0)
                            .font(.system(size: 12))
                            .frame(width: 20)
                            .foregroundStyle(.secondary)
                        Text(item.1)
                            .font(.system(size: 12))
                            .foregroundStyle(.secondary)
                        Spacer()
                        RoundedRectangle(cornerRadius: 6)
                            .fill(.ultraThinMaterial)
                            .frame(width: 64, height: 22)
                            .overlay(
                                RoundedRectangle(cornerRadius: 6)
                                    .strokeBorder(.white.opacity(0.2), lineWidth: 1)
                            )
                    }
                }
            }
            .padding(12)
            .background(
                resolver?.resolveColor(tokenName: "bg/card", modeName: modeName) ?? Color(nsColor: .controlBackgroundColor)
            )
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .strokeBorder(
                        resolver?.resolveColor(tokenName: "border/default", modeName: modeName) ?? Color(nsColor: .separatorColor),
                        lineWidth: 1
                    )
            )
        }
    }

    // MARK: - Typography Section

    var typographySection: some View {
        PreviewBlock(title: "Typography Scale", resolver: resolver, modeName: modeName) {
            VStack(alignment: .leading, spacing: 8) {
                let textColor = resolver?.resolveColor(tokenName: "text/primary", modeName: modeName) ?? .primary
                let secondaryColor = resolver?.resolveColor(tokenName: "text/secondary", modeName: modeName) ?? .secondary

                Group {
                    Text("Display 1 — 48px / 700").font(.system(size: 48, weight: .bold)).foregroundStyle(textColor)
                    Text("Heading 1 — 32px / 700").font(.system(size: 32, weight: .bold)).foregroundStyle(textColor)
                    Text("Heading 2 — 24px / 600").font(.system(size: 24, weight: .semibold)).foregroundStyle(textColor)
                    Text("Heading 3 — 20px / 600").font(.system(size: 20, weight: .semibold)).foregroundStyle(textColor)
                    Text("Body Large — 18px / Regular").font(.system(size: 18)).foregroundStyle(textColor)
                    Text("Body — 16px / Regular").font(.system(size: 16)).foregroundStyle(textColor)
                    Text("Body Small — 14px / Regular").font(.system(size: 14)).foregroundStyle(secondaryColor)
                    Text("Caption — 12px / Regular").font(.system(size: 12)).foregroundStyle(secondaryColor)
                    Text("LABEL / OVERLINE — 11px / 600 UPPERCASE")
                        .font(.system(size: 11, weight: .semibold))
                        .tracking(0.5)
                        .foregroundStyle(secondaryColor)
                }
            }
        }
    }

    // MARK: - Colors Section

    var colorsSection: some View {
        VStack(alignment: .leading, spacing: 24) {
            if let ds = projectStore.currentProject, let resolver {
                let primitives = resolver.primitiveColors

                ForEach(ds.colors.ramps, id: \.id) { ramp in
                    let swatches = ColorGenerator.generate(ramp: ramp)
                    VStack(alignment: .leading, spacing: 8) {
                        Text(ramp.name)
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundStyle(resolver.resolveColor(tokenName: "text/primary", modeName: modeName) ?? .primary)

                        HStack(spacing: 4) {
                            ForEach(swatches, id: \.step) { swatch in
                                VStack(spacing: 4) {
                                    Rectangle()
                                        .fill(Color(hex: swatch.hex) ?? .gray)
                                        .frame(height: 40)
                                    Text("\(swatch.step)")
                                        .font(.system(size: 9))
                                        .foregroundStyle(.secondary)
                                }
                            }
                        }
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                    }
                }
            }
        }
    }
}

// MARK: - Preview Section Enum

enum PreviewSection: CaseIterable {
    case components, typography, colors
    var label: String {
        switch self {
        case .components: return "Components"
        case .typography:  return "Typography"
        case .colors:      return "Color Ramps"
        }
    }
}

// MARK: - Reusable Preview Blocks

struct PreviewBlock<Content: View>: View {
    let title: String
    let resolver: TokenResolver?
    let modeName: String
    @ViewBuilder let content: () -> Content

    var cardBg: Color {
        resolver?.resolveColor(tokenName: "bg/card", modeName: modeName) ?? Color(nsColor: .controlBackgroundColor)
    }
    var borderColor: Color {
        resolver?.resolveColor(tokenName: "border/default", modeName: modeName) ?? Color(nsColor: .separatorColor)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.secondary)

            content()
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(cardBg)
                .overlay(RoundedRectangle(cornerRadius: 12).strokeBorder(borderColor, lineWidth: 1))
                .clipShape(RoundedRectangle(cornerRadius: 12))
        }
    }
}

struct TokenButton: View {
    let label: String
    let bg: String?
    let fg: String
    let resolver: TokenResolver?
    let modeName: String
    var opacity: Double = 1.0
    var bordered: Bool = false

    var bgColor: Color { bg.flatMap { resolver?.resolveColor(tokenName: $0, modeName: modeName) } ?? .clear }
    var fgColor: Color { resolver?.resolveColor(tokenName: fg, modeName: modeName) ?? .primary }

    var body: some View {
        Text(label)
            .font(.system(size: 13, weight: .semibold))
            .foregroundStyle(fgColor)
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .background(bgColor)
            .overlay(bordered ? Capsule().strokeBorder(fgColor, lineWidth: 1.5) : nil)
            .clipShape(Capsule())
            .opacity(opacity)
    }
}

struct TokenInput: View {
    let label: String
    let placeholder: String
    let borderToken: String
    let bgToken: String
    let resolver: TokenResolver?
    let modeName: String
    var errorText: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(resolver?.resolveColor(tokenName: "text/secondary", modeName: modeName) ?? .secondary)

            HStack {
                Text(placeholder)
                    .font(.system(size: 14))
                    .foregroundStyle(resolver?.resolveColor(tokenName: "text/tertiary", modeName: modeName) ?? .secondary)
                Spacer()
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(resolver?.resolveColor(tokenName: bgToken, modeName: modeName) ?? Color(nsColor: .controlBackgroundColor))
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .strokeBorder(
                        resolver?.resolveColor(tokenName: borderToken, modeName: modeName) ?? Color(nsColor: .separatorColor),
                        lineWidth: 1.5
                    )
            )
            .clipShape(RoundedRectangle(cornerRadius: 8))

            if let err = errorText {
                Text(err)
                    .font(.caption)
                    .foregroundStyle(resolver?.resolveColor(tokenName: "status/error-text", modeName: modeName) ?? .red)
            }
        }
    }
}

struct TokenAlert: View {
    let icon: String
    let iconColor: String
    let bg: String
    let text: String
    let message: String
    let resolver: TokenResolver?
    let modeName: String

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: icon)
                .foregroundStyle(resolver?.resolveColor(tokenName: iconColor, modeName: modeName) ?? .primary)
            Text(message)
                .font(.system(size: 13))
                .foregroundStyle(resolver?.resolveColor(tokenName: text, modeName: modeName) ?? .primary)
            Spacer()
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(resolver?.resolveColor(tokenName: bg, modeName: modeName) ?? Color.secondary.opacity(0.1))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

struct TokenCard: View {
    let title: String
    let resolver: TokenResolver?
    let modeName: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 12, weight: .semibold))
                .foregroundStyle(resolver?.resolveColor(tokenName: "text/secondary", modeName: modeName) ?? .secondary)
            Text(["$12,483", "2,841", "94.2%"].randomElement() ?? "$0")
                .font(.system(size: 22, weight: .bold))
                .foregroundStyle(resolver?.resolveColor(tokenName: "text/primary", modeName: modeName) ?? .primary)
            Text("+4.1% this week")
                .font(.system(size: 11))
                .foregroundStyle(resolver?.resolveColor(tokenName: "status/success-text", modeName: modeName) ?? .green)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(resolver?.resolveColor(tokenName: "bg/surface", modeName: modeName) ?? Color(nsColor: .controlBackgroundColor))
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .strokeBorder(resolver?.resolveColor(tokenName: "border/default", modeName: modeName) ?? Color(nsColor: .separatorColor))
        )
        .clipShape(RoundedRectangle(cornerRadius: 10))
    }
}

struct TokenBadge: View {
    let label: String
    let fgToken: String
    let bgToken: String
    let resolver: TokenResolver?
    let modeName: String

    var body: some View {
        Text(label)
            .font(.system(size: 11, weight: .semibold))
            .foregroundStyle(resolver?.resolveColor(tokenName: fgToken, modeName: modeName) ?? .primary)
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(resolver?.resolveColor(tokenName: bgToken, modeName: modeName) ?? Color.secondary.opacity(0.1))
            .clipShape(Capsule())
    }
}

struct GlassCard: View {
    let icon: String
    let label: String
    let accent: Color

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundStyle(accent)
            Text(label)
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(accent)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 20)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay(
            RoundedRectangle(cornerRadius: 14)
                .strokeBorder(.white.opacity(0.3), lineWidth: 1)
        )
    }
}
