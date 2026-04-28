import SwiftUI

struct SectionHeader: View {
    let icon: String
    let title: String
    let subtitle: String
    let tokenCount: Int

    var body: some View {
        HStack(alignment: .top) {
            HStack(alignment: .top, spacing: 12) {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundStyle(.secondary)
                    .frame(width: 28)
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.title2.bold())
                    Text(subtitle)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }
            Spacer()
            VStack(alignment: .trailing, spacing: 2) {
                Text("TOKENS")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundStyle(.secondary)
                Text("\(tokenCount)")
                    .font(.title2.bold())
            }
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 20)
    }
}
