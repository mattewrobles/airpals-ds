import SwiftUI

struct PrimitivesView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var searchText = ""

    var ds: DesignSystem? { projectStore.currentProject }

    var allPrimitives: [(name: String, value: Any, type: String)] {
        guard let ds else { return [] }
        let dict = TokenExporter.exportForFigma(ds: ds)
        let primitives = dict["primitives"] as? [String: Any] ?? [:]
        return primitives.sorted { $0.key < $1.key }.compactMap { (key, val) -> (String, Any, String)? in
            guard let entry = val as? [String: Any],
                  let type_ = entry["$type"] as? String,
                  let value = entry["$value"],
                  type_ == "color"
            else { return nil }
            return (key, value, type_)
        }
    }

    var filtered: [(name: String, value: Any, type: String)] {
        guard !searchText.isEmpty else { return allPrimitives }
        return allPrimitives.filter { $0.name.localizedCaseInsensitiveContains(searchText) }
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "circle.grid.3x3",
                title: "Primitives",
                subtitle: "Color primitive tokens — raw values used to build semantic tokens.",
                tokenCount: allPrimitives.count,
                tokenLabel: "color primitives"
            )
            Divider()

            // Search
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundStyle(.secondary)
                TextField("Search tokens…", text: $searchText)
                    .textFieldStyle(.plain)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .background(Color(nsColor: .controlBackgroundColor))

            Divider()

            ScrollView {
                VStack(spacing: 0) {
                    ForEach(filtered, id: \.name) { item in
                        PrimitiveRow(name: item.name, value: item.value, type: item.type)
                        Divider().padding(.leading, 24)
                    }
                }
                .padding(.top, 4)
            }
        }
    }
}

// MARK: - Primitive Row

struct PrimitiveRow: View {
    let name: String
    let value: Any
    let type: String
    @State private var copied = false

    var valueString: String {
        if let s = value as? String { return s }
        if let d = value as? Double { return String(format: "%.2f", d) }
        return "\(value)"
    }

    var body: some View {
        HStack(spacing: 12) {
            // Type-specific preview
            Group {
                if type == "color", let hex = value as? String {
                    RoundedRectangle(cornerRadius: 6)
                        .fill(Color(hex: hex) ?? .gray)
                        .frame(width: 28, height: 28)
                        .overlay(
                            RoundedRectangle(cornerRadius: 6)
                                .strokeBorder(Color.black.opacity(0.08), lineWidth: 1)
                        )
                } else if type == "dimension" || type == "number" {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.blue.opacity(0.12))
                        .frame(width: 28, height: 28)
                        .overlay(
                            Text("#")
                                .font(.system(size: 11, weight: .bold))
                                .foregroundStyle(.blue)
                        )
                } else {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.secondary.opacity(0.1))
                        .frame(width: 28, height: 28)
                        .overlay(
                            Text("T")
                                .font(.system(size: 11, weight: .bold))
                                .foregroundStyle(.secondary)
                        )
                }
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(name)
                    .font(.system(size: 12, design: .monospaced))
                Text(valueString)
                    .font(.system(size: 11))
                    .foregroundStyle(.secondary)
            }

            Spacer()

            Text(type)
                .font(.system(size: 10, weight: .medium))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 6)
                .padding(.vertical, 2)
                .background(Color.secondary.opacity(0.1))
                .clipShape(Capsule())

            Button {
                NSPasteboard.general.clearContents()
                NSPasteboard.general.setString(name, forType: .string)
                copied = true
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { copied = false }
            } label: {
                Image(systemName: copied ? "checkmark" : "doc.on.doc")
                    .font(.system(size: 11))
            }
            .buttonStyle(.plain)
            .foregroundStyle(copied ? .green : .secondary)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
    }
}
