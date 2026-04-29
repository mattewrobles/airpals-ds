import SwiftUI

struct MotionView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var selectedTab: Int = 0
    @State private var animating: [UUID: Bool] = [:]

    var ds: DesignSystem? { projectStore.currentProject }
    var durations: [MotionDuration] { ds?.motion.durations ?? [] }
    var easings: [MotionEasing] { ds?.motion.easings ?? [] }
    var tokenCount: Int { durations.count + easings.count }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "waveform.path",
                title: "Motion",
                subtitle: "Duration steps and easing curves for animations.",
                tokenCount: tokenCount
            )
            Divider()

            TabView(selection: $selectedTab) {
                editTab.tabItem { Text("Edit") }.tag(0)
                tokensTab.tabItem { Text("Tokens") }.tag(1)
                codeTab.tabItem { Text("Code") }.tag(2)
            }
            .padding(.top, 1)
        }
    }

    // MARK: - Edit

    var editTab: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 28) {

                // Durations
                VStack(alignment: .leading, spacing: 0) {
                    Text("DURATIONS")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(.secondary)
                        .padding(.horizontal, 24)
                        .padding(.bottom, 10)

                    Divider()

                    ForEach(durations) { dur in
                        HStack(spacing: 16) {
                            Text("motion/duration/\(dur.name)")
                                .font(.system(size: 12, design: .monospaced))
                                .frame(width: 200, alignment: .leading)

                            Text("\(Int(dur.ms))ms")
                                .font(.system(size: 12))
                                .foregroundStyle(.secondary)
                                .frame(width: 60, alignment: .leading)

                            // Animated preview dot
                            let isAnim = animating[dur.id] ?? false
                            Circle()
                                .fill(Color.blue)
                                .frame(width: 10, height: 10)
                                .offset(x: isAnim ? 80 : 0)
                                .animation(
                                    .easeInOut(duration: max(dur.ms / 1000, 0.05))
                                    .repeatForever(autoreverses: true),
                                    value: isAnim
                                )
                                .onAppear {
                                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                                        animating[dur.id] = true
                                    }
                                }
                        }
                        .padding(.horizontal, 24)
                        .padding(.vertical, 10)
                        Divider().padding(.leading, 24)
                    }
                }

                // Easings
                VStack(alignment: .leading, spacing: 0) {
                    Text("EASINGS")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(.secondary)
                        .padding(.horizontal, 24)
                        .padding(.bottom, 10)

                    Divider()

                    ForEach(easings) { easing in
                        HStack(spacing: 16) {
                            Text("motion/easing/\(easing.name)")
                                .font(.system(size: 12, design: .monospaced))
                                .frame(width: 200, alignment: .leading)

                            Text(easing.cssValue)
                                .font(.system(size: 11, design: .monospaced))
                                .foregroundStyle(.secondary)
                                .lineLimit(1)
                        }
                        .padding(.horizontal, 24)
                        .padding(.vertical, 10)
                        Divider().padding(.leading, 24)
                    }
                }
            }
            .padding(.top, 20)
        }
    }

    // MARK: - Tokens

    var tokensTab: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                ForEach(durations) { dur in
                    tokenRow(name: "motion/duration/\(dur.name)", value: "\(Int(dur.ms))ms")
                }
                ForEach(easings) { e in
                    tokenRow(name: "motion/easing/\(e.name)", value: e.cssValue)
                }
            }
            .padding(.top, 8)
        }
    }

    func tokenRow(name: String, value: String) -> some View {
        VStack(spacing: 0) {
            HStack {
                Text(name)
                    .font(.system(size: 12, design: .monospaced))
                Spacer()
                Text(value)
                    .font(.system(size: 12))
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
                Button {
                    NSPasteboard.general.clearContents()
                    NSPasteboard.general.setString(name, forType: .string)
                } label: {
                    Image(systemName: "doc.on.doc")
                        .font(.system(size: 11))
                }
                .buttonStyle(.plain)
                .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 8)
            Divider().padding(.leading, 24)
        }
    }

    // MARK: - Code

    var codeTab: some View {
        ScrollView {
            CodeBlock(code: cssOutput)
                .padding(24)
        }
    }

    var cssOutput: String {
        var lines: [String] = []
        for d in durations { lines.append("  --motion-duration-\(d.name): \(Int(d.ms))ms;") }
        for e in easings   { lines.append("  --motion-easing-\(e.name): \(e.cssValue);") }
        return ":root {\n" + lines.joined(separator: "\n") + "\n}"
    }
}
