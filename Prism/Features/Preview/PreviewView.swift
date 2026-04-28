import SwiftUI

struct PreviewView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var isDarkMode = false
    @State private var hoveredToken: String? = nil

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "eye.fill",
                title: "Preview",
                subtitle: "Live preview using your tokens. Hover elements to see their token references.",
                tokenCount: 0
            )

            Divider()

            HStack(spacing: 0) {
                // Preview canvas
                ScrollView {
                    VStack(alignment: .leading, spacing: 24) {
                        PreviewCard(isDark: isDarkMode)
                    }
                    .padding(32)
                }

                // Token inspector
                if let token = hoveredToken {
                    Divider()
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Token")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        Text(token)
                            .font(.system(.body, design: .monospaced))
                        Divider()
                        Text("Resolved value")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                    }
                    .padding()
                    .frame(width: 220)
                }
            }

            // Bottom bar
            HStack {
                Spacer()
                Toggle("Dark Mode", isOn: $isDarkMode)
                    .toggleStyle(.switch)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(Color(nsColor: .controlBackgroundColor))
        }
    }
}

// MARK: - Preview Card

struct PreviewCard: View {
    let isDark: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("LIVE PREVIEW")
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(.secondary)

            VStack(alignment: .leading, spacing: 12) {
                Text("Design System Preview")
                    .font(.title2.bold())
                Text("Every surface reflects your primitives in real time. Hover any element to see which tokens it's reading.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                HStack(spacing: 8) {
                    Button("Primary") {}
                        .buttonStyle(.borderedProminent)
                    Button("Secondary") {}
                        .buttonStyle(.bordered)
                }

                HStack(spacing: 8) {
                    Label("OKLCH", systemImage: "circle.hexagongrid.fill")
                        .font(.caption)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.green.opacity(0.15))
                        .foregroundStyle(.green)
                        .clipShape(RoundedRectangle(cornerRadius: 4))

                    Label("DTCG", systemImage: "doc.fill")
                        .font(.caption)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.orange.opacity(0.15))
                        .foregroundStyle(.orange)
                        .clipShape(RoundedRectangle(cornerRadius: 4))
                }

                Text("Footer · light")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(20)
            .background(Color(nsColor: isDark ? .darkGray : .white))
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(radius: 4)
        }
        .frame(maxWidth: 500)
    }
}
