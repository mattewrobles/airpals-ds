import SwiftUI

// MARK: - Semantic Tokens View

struct SemanticTokensView: View {
    @EnvironmentObject var projectStore: ProjectStore
    @State private var searchText = ""
    @State private var selectedMode: String = "Light"
    @State private var showAddSheet = false
    @State private var showWizard = false
    @State private var editingToken: SemanticToken? = nil

    var ds: DesignSystem? { projectStore.currentProject }
    var tokens: [SemanticToken] { ds?.semanticTokens ?? [] }
    var modes: [String] { ds?.modes.map(\.name) ?? ["Light", "Dark"] }

    var filtered: [SemanticToken] {
        guard !searchText.isEmpty else { return tokens }
        return tokens.filter { $0.name.localizedCaseInsensitiveContains(searchText) }
    }

    // Group tokens by category prefix (text/, bg/, border/, icon/, status/, other)
    var grouped: [(category: String, tokens: [SemanticToken])] {
        let categories = ["text", "bg", "border", "icon", "status"]
        var result: [(String, [SemanticToken])] = []
        var remaining = filtered

        for cat in categories {
            let group = remaining.filter { $0.name.hasPrefix("\(cat)/") }
            if !group.isEmpty {
                result.append((cat, group))
                remaining.removeAll { $0.name.hasPrefix("\(cat)/") }
            }
        }
        if !remaining.isEmpty {
            result.append(("other", remaining))
        }
        return result
    }

    var resolver: TokenResolver? {
        guard let ds else { return nil }
        return TokenResolver(ds: ds)
    }

    var body: some View {
        VStack(spacing: 0) {
            SectionHeader(
                icon: "tag.fill",
                title: "Semantic Tokens",
                subtitle: "Purposeful aliases of primitives. These are what components reference.",
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
            SemanticTokenEditSheet(
                existingToken: nil,
                resolver: resolver,
                modes: ds?.modes ?? []
            ) { newToken in
                projectStore.update { ds in
                    ds.semanticTokens.append(newToken)
                }
            }
        }
        .sheet(item: $editingToken) { token in
            SemanticTokenEditSheet(
                existingToken: token,
                resolver: resolver,
                modes: ds?.modes ?? []
            ) { updated in
                projectStore.update { ds in
                    if let idx = ds.semanticTokens.firstIndex(where: { $0.id == updated.id }) {
                        ds.semanticTokens[idx] = updated
                    }
                }
            }
        }
        .sheet(isPresented: $showWizard) {
            SemanticWizardSheet { generated in
                projectStore.update { ds in
                    // Replace or append: remove existing then add fresh
                    ds.semanticTokens.removeAll { t in
                        generated.contains { $0.name == t.name }
                    }
                    ds.semanticTokens.append(contentsOf: generated)
                }
            }
        }
    }

    // MARK: - Control Bar

    var controlBar: some View {
        HStack(spacing: 12) {
            HStack {
                Image(systemName: "magnifyingglass").foregroundStyle(.secondary)
                TextField("Search…", text: $searchText).textFieldStyle(.plain)
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
                showWizard = true
            } label: {
                Label("Generate System", systemImage: "wand.and.stars")
            }
            .buttonStyle(.bordered)
            .controlSize(.small)

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
                ForEach(grouped, id: \.category) { group in
                    Section {
                        ForEach(group.tokens) { token in
                            SemanticTokenRow(
                                token: token,
                                modeName: selectedMode,
                                resolver: resolver
                            ) {
                                editingToken = token
                            } onDelete: {
                                projectStore.update { ds in
                                    ds.semanticTokens.removeAll { $0.id == token.id }
                                }
                            }
                            Divider().padding(.leading, 56)
                        }
                    } header: {
                        Text(group.category.uppercased())
                            .font(.system(size: 10, weight: .semibold))
                            .foregroundStyle(.secondary)
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
        VStack(spacing: 24) {
            // Wizard CTA — prominente
            VStack(spacing: 14) {
                Image(systemName: "wand.and.stars")
                    .font(.system(size: 44))
                    .foregroundStyle(.purple)
                Text("Generate your semantic system")
                    .font(.title2.bold())
                Text("Answer 2 simple questions — Prism generates 40+ semantic\ncolor tokens for text, backgrounds, borders, icons, states, and buttons.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                Button {
                    showWizard = true
                } label: {
                    Label("Generate Color System", systemImage: "wand.and.stars")
                        .font(.body.bold())
                }
                .buttonStyle(.borderedProminent)
                .tint(.purple)
                .controlSize(.large)
            }
            .padding(32)
            .frame(maxWidth: 480)
            .background(Color.purple.opacity(0.05))
            .overlay(RoundedRectangle(cornerRadius: 16).strokeBorder(Color.purple.opacity(0.15)))
            .clipShape(RoundedRectangle(cornerRadius: 16))

            // Or manual
            HStack(spacing: 8) {
                Rectangle().fill(Color.secondary.opacity(0.2)).frame(height: 1)
                Text("or add manually").font(.caption).foregroundStyle(.secondary)
                Rectangle().fill(Color.secondary.opacity(0.2)).frame(height: 1)
            }
            .frame(maxWidth: 300)

            Button {
                showAddSheet = true
            } label: {
                Label("Add Token", systemImage: "plus")
            }
            .buttonStyle(.bordered)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding()
    }
}

// MARK: - Semantic Token Row

struct SemanticTokenRow: View {
    let token: SemanticToken
    let modeName: String
    let resolver: TokenResolver?
    let onEdit: () -> Void
    let onDelete: () -> Void

    var resolvedHex: String? {
        resolver?.resolveHex(tokenName: token.name, modeName: modeName)
    }

    var resolvedColor: Color? {
        guard let hex = resolvedHex else { return nil }
        return Color(hex: hex)
    }

    var lightValue: TokenValue? {
        resolver.flatMap { r in
            let modeId = r.ds.modes.first { $0.name == "Light" }?.id.uuidString
            return modeId.flatMap { token.modeValues[$0] } ?? token.modeValues.values.first
        }
    }

    var darkValue: TokenValue? {
        resolver.flatMap { r in
            let modeId = r.ds.modes.first { $0.name == "Dark" }?.id.uuidString
            return modeId.flatMap { token.modeValues[$0] }
        }
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
                    if let lv = lightValue {
                        Label(TokenResolver.displayValue(lv), systemImage: "sun.max")
                            .font(.system(size: 10))
                            .foregroundStyle(.secondary)
                    }
                    if let dv = darkValue {
                        Label(TokenResolver.displayValue(dv), systemImage: "moon")
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
                Image(systemName: "pencil")
                    .font(.system(size: 11))
            }
            .buttonStyle(.plain)
            .foregroundStyle(.secondary)

            Button(action: onDelete) {
                Image(systemName: "trash")
                    .font(.system(size: 11))
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

// MARK: - Add / Edit Sheet

struct SemanticTokenEditSheet: View {
    let existingToken: SemanticToken?
    let resolver: TokenResolver?
    let modes: [DSMode]
    let onSave: (SemanticToken) -> Void

    @Environment(\.dismiss) private var dismiss

    @State private var name: String = ""
    @State private var selectedType: TokenType = .color
    @State private var modeValues: [String: String] = [:]

    var isEditing: Bool { existingToken != nil }

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Text(isEditing ? "Edit Token" : "Add Semantic Token")
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
                    // Name field
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Token Name")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
                        TextField("e.g. text/primary", text: $name)
                            .textFieldStyle(.roundedBorder)
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

            // Save button
            HStack {
                Spacer()
                Button("Save") {
                    saveToken()
                }
                .buttonStyle(.borderedProminent)
                .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
            }
            .padding(20)
        }
        .frame(width: 480, height: 440)
        .onAppear { loadExisting() }
    }

    private func loadExisting() {
        guard let token = existingToken else { return }
        name = token.name
        selectedType = token.type
        for (key, value) in token.modeValues {
            modeValues[key] = TokenResolver.displayValue(value)
        }
    }

    private func saveToken() {
        let trimmed = name.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }

        var parsedValues: [String: TokenValue] = [:]
        for mode in modes {
            let raw = modeValues[mode.id.uuidString] ?? ""
            if !raw.isEmpty {
                parsedValues[mode.id.uuidString] = TokenResolver.parseValue(raw, type: selectedType)
            }
        }

        let token = SemanticToken(
            id: existingToken?.id ?? UUID(),
            name: trimmed,
            type: selectedType,
            modeValues: parsedValues
        )
        onSave(token)
        dismiss()
    }
}

// MARK: - Token Value Field with autocomplete

struct TokenValueField: View {
    let modeLabel: String
    @Binding var value: String
    let tokenType: TokenType
    let resolver: TokenResolver?

    @State private var showPopover = false
    @State private var primitiveSearch = ""

    var filteredPrimitives: [String] {
        guard let resolver else { return [] }
        let all = resolver.allPrimitiveNames
        if primitiveSearch.isEmpty { return all }
        return all.filter { $0.localizedCaseInsensitiveContains(primitiveSearch) }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(modeLabel)
                .font(.caption.bold())
                .foregroundStyle(.secondary)

            HStack(spacing: 6) {
                // Color preview if alias resolves to a hex
                if tokenType == .color, let resolver, !value.isEmpty {
                    let parsedVal = TokenResolver.parseValue(value, type: tokenType)
                    let hex = resolver.resolveValueToHex(parsedVal)
                    RoundedRectangle(cornerRadius: 4)
                        .fill(hex.flatMap { Color(hex: $0) } ?? Color.clear)
                        .frame(width: 22, height: 22)
                        .overlay(RoundedRectangle(cornerRadius: 4).strokeBorder(Color.black.opacity(0.1)))
                }

                TextField("e.g. {color/neutral/900} or #3B82F6", text: $value)
                    .textFieldStyle(.roundedBorder)

                if tokenType == .color {
                    Button {
                        primitiveSearch = ""
                        showPopover = true
                    } label: {
                        Image(systemName: "list.bullet")
                            .font(.system(size: 12))
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                    .popover(isPresented: $showPopover, arrowEdge: .trailing) {
                        primitivePopover
                    }
                }
            }
        }
    }

    var primitivePopover: some View {
        VStack(spacing: 0) {
            HStack {
                Image(systemName: "magnifyingglass").foregroundStyle(.secondary).font(.caption)
                TextField("Search primitives…", text: $primitiveSearch)
                    .textFieldStyle(.plain)
                    .font(.caption)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(Color(nsColor: .controlBackgroundColor))

            Divider()

            ScrollView {
                LazyVStack(alignment: .leading, spacing: 0) {
                    ForEach(filteredPrimitives, id: \.self) { prim in
                        Button {
                            value = "{\(prim)}"
                            showPopover = false
                        } label: {
                            HStack(spacing: 8) {
                                if let hex = resolver?.primitiveColors[prim] {
                                    RoundedRectangle(cornerRadius: 3)
                                        .fill(Color(hex: hex) ?? .gray)
                                        .frame(width: 16, height: 16)
                                }
                                Text("{\(prim)}")
                                    .font(.system(size: 11, design: .monospaced))
                                    .foregroundStyle(.primary)
                                Spacer()
                            }
                            .padding(.horizontal, 10)
                            .padding(.vertical, 6)
                            .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                        Divider().padding(.leading, 34)
                    }
                }
            }
            .frame(height: 220)
        }
        .frame(width: 280)
    }
}
