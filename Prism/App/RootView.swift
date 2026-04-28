import SwiftUI

struct RootView: View {
    @StateObject private var projectStore = ProjectStore()

    var body: some View {
        Group {
            if projectStore.currentProject == nil {
                OnboardingView()
            } else {
                MainAppView()
            }
        }
        .environmentObject(projectStore)
    }
}
