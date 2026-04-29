import SwiftUI

// MARK: - Component Tokens View

struct ComponentTokensView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var searchText = ""
    @State private var selectedMode: String = "Light"
    @State private var showAddSheet = false
    @State private var editingToken: ComponentToken? = nil

    var ds: DesignSystem? { projectStore.currentProject }
    var tokens: [ComponentToken] { ds?.componentTokens ?? [] }
    var modes: [String] { ds?.modes.map(\.name) ?? ["Light", "Dark"] }

    var filtered: [ComponentToken] {
        guard !searchText.isEmpty else { return tokens }
        return tokens.filter {
            $0.name.localizedCaseInsensitiveContains(searchText) ||
            $0.component.localizedCaseInsensitiveContains(searchText)
        }
    }

    // Group by component name
    var grouped: [(component: String, tokens: [ComponentToken])] {
        var dict: [String: [ComponentToken]] = [:]
        for token in filtered {
            dict[token.component, default: []].append(token)
        }
        return dict.sorted { $0.key < $1.key }.map { ($0.key, $0.value) }
    }

    var resolver: TokenResolver? {
        guard let ds else { return nil }
        return TokenResolver(ds: ds)
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "puzzlepiece.fill",
                title: "Component Tokens",
                subtitle: "Per-component token overrides. Reference semantic tokens or primitives.",
                tokenCount: tokens.count
            )
            Divider()

            if tokens.isEmpty {
                emptyState
            } else {
                controlBar
                Divider()
                tokenList
            }
        }
        .sheet(isPresented: $showAddSheet) {
            ComponentTokenEditSheet(
                existingToken: nil,
                resolver: resolver,
                modes: ds?.modes ?? []
            ) { newToken in
                projectStore.update { ds in
                    ds.componentTokens.append(newToken)
                }
            }
        }
        .sheet(item: $editingToken) { token in
            ComponentTokenEditSheet(
                existingToken: token,
                resolver: resolver,
                modes: ds?.modes ?? []
            ) { updated in
                projectStore.update { ds in
                    if let idx = ds.componentTokens.firstIndex(where: { $0.id == updated.id }) {
                        ds.componentTokens[idx] = updated
                    }
                }
            }
        }
    }

    // MARK: - Control Bar

    var controlBar: some View {
        HStack(spacing: 12) {
            HStack {
                Image(systemName: "magnifyingglass").foregroundStyle(.secondary)
                TextField("Search components or tokens…", text: $searchText).textFieldStyle(.plain)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(Color(nsColor: .controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 8))

            Picker("Mode", selection: $selectedMode) {
                ForEach(modes, id: \.self) { Text($0).tag($0) }
            }
            .pickerStyle(.segmented)
            .frame(maxWidth: 160)

            Spacer()

            Button {
                showAddSheet = true
            } label: {
                Label("Add Token", systemImage: "plus")
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.small)
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 10)
        .background(Color(nsColor: .windowBackgroundColor))
    }

    // MARK: - Token List

    var tokenList: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 0, pinnedViews: .sectionHeaders) {
                ForEach(grouped, id: \.component) { group in
                    Section {
                        ForEach(group.tokens) { token in
                            ComponentTokenRow(
                                token: token,
                                modeName: selectedMode,
                                resolver: resolver
                            ) {
                                editingToken = token
                            } onDelete: {
                                projectStore.update { ds in
                                    ds.componentTokens.removeAll { $0.id == token.id }
                                }
                            }
                            Divider().padding(.leading, 56)
                        }
                    } header: {
                        HStack(spacing: 6) {
                            Image(systemName: "puzzlepiece")
                                .font(.system(size: 10))
                                .foregroundStyle(.secondary)
                            Text(group.component.uppercased())
                                .font(.system(size: 10, weight: .semibold))
                                .foregroundStyle(.secondary)
                            Text("(\(group.tokens.count))")
                                .font(.system(size: 10))
                                .foregroundStyle(.tertiary)
                            Spacer()
                        }
                        .padding(.horizontal, 16)
                        .padding(.vertical, 6)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color(nsColor: .windowBackgroundColor))
                    }
                }
            }
            .padding(.top, 4)
        }
    }

    // MARK: - Empty State

    var emptyState: some View {
        VStack(spacing: 16) {
            Image(systemName: "puzzlepiece.slash")
                .font(.system(size: 40))
                .foregroundStyle(.secondary)
            Text("No component tokens yet")
                .font(.title3.bold())
            Text("Component tokens scope semantic values to specific UI components.\ne.g. button/bg/primary → bg/primary")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
            Button {
                showAddSheet = true
            } label: {
                Label("Add Token", systemImage: "plus")
            }
            .buttonStyle(.borderedProminent)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding()
    }
}

// MARK: - Component Token Row

struct ComponentTokenRow: View {
    let token: ComponentToken
    let modeName: String
    let resolver: TokenResolver?
    let onEdit: () -> Void
    let onDelete: () -> Void

    var resolvedColor: Color? {
        guard let resolver else { return nil }
        let modeId = resolver.ds.modes.first { $0.name == modeName }?.id.uuidString
        let value = modeId.flatMap { token.modeValues[$0] } ?? token.modeValues.values.first
        guard let hex = resolver.resolveValueToHex(value) else { return nil }
        return Color(hex: hex)
    }

    var displayValues: [String] {
        token.modeValues.values.map { TokenResolver.displayValue($0) }
    }

    var body: some View {
        HStack(spacing: 12) {
            // Color preview
            Group {
                if let color = resolvedColor {
                    RoundedRectangle(cornerRadius: 6)
                        .fill(color)
                        .frame(width: 28, height: 28)
                        .overlay(RoundedRectangle(cornerRadius: 6).strokeBorder(Color.black.opacity(0.08)))
                } else {
                    RoundedRectangle(cornerRadius: 6)
                        .fill(Color.secondary.opacity(0.1))
                        .frame(width: 28, height: 28)
                        .overlay(
                            Image(systemName: "arrow.triangle.branch")
                                .font(.system(size: 10))
                                .foregroundStyle(.secondary)
                        )
                }
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(token.name)
                    .font(.system(size: 12, design: .monospaced))
                HStack(spacing: 8) {
                    ForEach(Array(displayValues.prefix(2)), id: \.self) { val in
                        Text(val)
                            .font(.system(size: 10))
                            .foregroundStyle(.secondary)
                    }
                }
            }

            Spacer()

            Text(token.type.rawValue)
                .font(.system(size: 10, weight: .medium))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 6)
                .padding(.vertical, 2)
                .background(Color.secondary.opacity(0.1))
                .clipShape(Capsule())

            Button(action: onEdit) {
                Image(systemName: "pencil").font(.system(size: 11))
            }
            .buttonStyle(.plain)
            .foregroundStyle(.secondary)

            Button(action: onDelete) {
                Image(systemName: "trash").font(.system(size: 11))
            }
            .buttonStyle(.plain)
            .foregroundStyle(.red.opacity(0.6))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
        .contentShape(Rectangle())
        .onTapGesture { onEdit() }
    }
}

// MARK: - Component Token Edit Sheet

struct ComponentTokenEditSheet: View {
    let existingToken: ComponentToken?
    let resolver: TokenResolver?
    let modes: [DSMode]
    let onSave: (ComponentToken) -> Void

    @Environment(\.dismiss) private var dismiss

    @State private var component: String = ""
    @State private var name: String = ""
    @State private var selectedType: TokenType = .color
    @State private var modeValues: [String: String] = [:]

    var isEditing: Bool { existingToken != nil }

    var fullName: String {
        let comp = component.trimmingCharacters(in: .whitespaces).lowercased()
        let nm = name.trimmingCharacters(in: .whitespaces)
        if comp.isEmpty { return nm }
        if nm.isEmpty { return comp }
        return "\(comp)/\(nm)"
    }

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Text(isEditing ? "Edit Component Token" : "Add Component Token")
                    .font(.headline)
                Spacer()
                Button("Cancel") { dismiss() }
                    .buttonStyle(.plain)
                    .foregroundStyle(.secondary)
            }
            .padding(20)

            Divider()

            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    // Component field
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Component")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        TextField("e.g. button, input, card", text: $component)
                            .textFieldStyle(.roundedBorder)
                    }

                    // Name field
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Token Name")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        TextField("e.g. bg/primary (will be prefixed with component)", text: $name)
                            .textFieldStyle(.roundedBorder)
                        if !fullName.isEmpty {
                            Text("Full name: \(fullName)")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .font(.system(size: 10, design: .monospaced))
                        }
                    }

                    // Type picker
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Type")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        Picker("", selection: $selectedType) {
                            ForEach(TokenType.allCases, id: \.self) { type in
                                Text(type.rawValue).tag(type)
                            }
                        }
                        .pickerStyle(.menu)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }

                    // Values per mode
                    ForEach(modes) { mode in
                        TokenValueField(
                            modeLabel: mode.name,
                            value: Binding(
                                get: { modeValues[mode.id.uuidString] ?? "" },
                                set: { modeValues[mode.id.uuidString] = $0 }
                            ),
                            tokenType: selectedType,
                            resolver: resolver
                        )
                    }
                }
                .padding(20)
            }

            Divider()

            HStack {
                Spacer()
                Button("Save") { saveToken() }
                    .buttonStyle(.borderedProminent)
                    .disabled(fullName.trimmingCharacters(in: .whitespaces).isEmpty)
            }
            .padding(20)
        }
        .frame(width: 480, height: 500)
        .onAppear { loadExisting() }
    }

    private func loadExisting() {
        guard let token = existingToken else { return }
        component = token.component
        // Strip component prefix from name if present
        if token.name.hasPrefix("\(token.component)/") {
            name = String(token.name.dropFirst(token.component.count + 1))
        } else {
            name = token.name
        }
        selectedType = token.type
        for (key, value) in token.modeValues {
            modeValues[key] = TokenResolver.displayValue(value)
        }
    }

    private func saveToken() {
        let trimmedName = fullName.trimmingCharacters(in: .whitespaces)
        guard !trimmedName.isEmpty else { return }

        var parsedValues: [String: TokenValue] = [:]
        for mode in modes {
            let raw = modeValues[mode.id.uuidString] ?? ""
            if !raw.isEmpty {
                parsedValues[mode.id.uuidString] = TokenResolver.parseValue(raw, type: selectedType)
            }
        }

        let token = ComponentToken(
            id: existingToken?.id ?? UUID(),
            component: component.trimmingCharacters(in: .whitespaces).lowercased(),
            name: trimmedName,
            type: selectedType,
            modeValues: parsedValues
        )
        onSave(token)
        dismiss()
    }
}
