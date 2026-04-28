import SwiftUI

struct NewProjectSheet: View {
    @EnvironmentObject var projectStore: ProjectStore
    @Environment(\.dismiss) var dismiss

    @State private var name: String = ""
    @State private var selectedPreset: DSPreset = .blank

    var body: some View {
        VStack(spacing: 24) {
            Text("New Design System")
                .font(.title2.bold())

            // Name field
            VStack(alignment: .leading, spacing: 6) {
                Text("Name").font(.caption).foregroundStyle(.secondary)
                TextField("My Design System", text: $name)
                    .textFieldStyle(.roundedBorder)
            }

            // Preset picker
            VStack(alignment: .leading, spacing: 10) {
                Text("Start from").font(.caption).foregroundStyle(.secondary)
                VStack(spacing: 6) {
                    ForEach(DSPreset.allCases, id: \.rawValue) { preset in
                        PresetRow(preset: preset, isSelected: selectedPreset == preset) {
                            selectedPreset = preset
                        }
                    }
                }
            }

            // Actions
            HStack {
                Button("Cancel") { dismiss() }
                    .keyboardShortcut(.cancelAction)
                Spacer()
                Button("Create") {
                    projectStore.createNew(name: name.isEmpty ? "Untitled" : name, preset: selectedPreset)
                    dismiss()
                }
                .keyboardShortcut(.defaultAction)
                .disabled(false)
            }
        }
        .padding(28)
        .frame(width: 420)
    }
}

struct PresetRow: View {
    let preset: DSPreset
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack {
                Image(systemName: isSelected ? "checkmark.circle.fill" : "circle")
                    .foregroundStyle(isSelected ? .blue : .secondary)
                Text(preset.rawValue)
                    .font(.body)
                Spacer()
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(
                RoundedRectangle(cornerRadius: 8)
                    .fill(isSelected ? Color.blue.opacity(0.08) : Color.clear)
            )
        }
        .buttonStyle(.plain)
    }
}
