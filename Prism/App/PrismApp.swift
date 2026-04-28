import SwiftUI
import SwiftData

@main
struct PrismApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
                .frame(minWidth: 1100, minHeight: 700)
        }
        .windowStyle(.hiddenTitleBar)
        .windowResizability(.contentMinSize)
        .commands {
            PrismCommands()
        }
    }
}
