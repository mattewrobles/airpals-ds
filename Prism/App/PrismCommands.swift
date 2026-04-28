import SwiftUI

struct PrismCommands: Commands {
    var body: some Commands {
        CommandGroup(replacing: .newItem) {
            Button("New Design System") {
                NotificationCenter.default.post(name: .newDesignSystem, object: nil)
            }
            .keyboardShortcut("n", modifiers: .command)
        }
        CommandMenu("Design System") {
            Button("Export Tokens...") {
                NotificationCenter.default.post(name: .exportTokens, object: nil)
            }
            .keyboardShortcut("e", modifiers: [.command, .shift])

            Button("Figma Sync...") {
                NotificationCenter.default.post(name: .openFigmaSync, object: nil)
            }
            .keyboardShortcut("f", modifiers: [.command, .shift])
        }
    }
}

extension Notification.Name {
    static let newDesignSystem = Notification.Name("newDesignSystem")
    static let exportTokens = Notification.Name("exportTokens")
    static let openFigmaSync = Notification.Name("openFigmaSync")
}
