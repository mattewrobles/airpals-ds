import Foundation
import Network

// MARK: - Local HTTP server on port 7891
// Serves GET /tokens → DTCG JSON for Figma plugin

@MainActor
final class LocalServer: ObservableObject {
    static let port: UInt16 = 7891

    @Published var isRunning = false
    @Published var errorMessage: String? = nil

    var tokenProvider: (() -> Data)?

    private var listener: NWListener?

    // MARK: - Start / Stop

    func start() {
        guard !isRunning, listener == nil else { return }
        errorMessage = nil

        let params = NWParameters.tcp
        params.allowLocalEndpointReuse = true

        guard let port = NWEndpoint.Port(rawValue: Self.port) else { return }

        do {
            let listener = try NWListener(using: params, on: port)
            self.listener = listener

            listener.stateUpdateHandler = { [weak self] state in
                Task { @MainActor [weak self] in
                    switch state {
                    case .ready:
                        self?.isRunning = true
                        self?.errorMessage = nil
                    case .failed(let error):
                        self?.isRunning = false
                        self?.errorMessage = error.localizedDescription
                        self?.listener = nil
                    case .cancelled:
                        self?.isRunning = false
                        self?.listener = nil
                    default:
                        break
                    }
                }
            }

            listener.newConnectionHandler = { [weak self] connection in
                Task { @MainActor [weak self] in
                    self?.handle(connection)
                }
            }

            listener.start(queue: .global(qos: .utility))

        } catch {
            errorMessage = "Cannot start server: \(error.localizedDescription)"
        }
    }

    func stop() {
        listener?.cancel()
        listener = nil
        isRunning = false
    }

    // MARK: - Connection

    private func handle(_ connection: NWConnection) {
        connection.start(queue: .global(qos: .utility))
        connection.receive(minimumIncompleteLength: 1, maximumLength: 8192) { [weak self] data, _, _, error in
            guard error == nil, let data, !data.isEmpty else {
                connection.cancel()
                return
            }
            let requestLine = String(data: data, encoding: .utf8) ?? ""
            Task { @MainActor [weak self] in
                self?.respond(to: connection, requestLine: requestLine)
            }
        }
    }

    private func respond(to connection: NWConnection, requestLine: String) {
        let isOptions  = requestLine.hasPrefix("OPTIONS")
        let isTokens   = requestLine.contains("GET /tokens")

        let statusLine: String
        let body: Data

        if isOptions {
            statusLine = "HTTP/1.1 204 No Content"
            body = Data()
        } else if isTokens {
            statusLine = "HTTP/1.1 200 OK"
            body = tokenProvider?() ?? Data("{}".utf8)
        } else {
            statusLine = "HTTP/1.1 404 Not Found"
            body = Data("{\"error\":\"not found\"}".utf8)
        }

        let header = [
            statusLine,
            "Content-Type: application/json",
            "Access-Control-Allow-Origin: *",
            "Access-Control-Allow-Methods: GET, OPTIONS",
            "Access-Control-Allow-Headers: Content-Type",
            "Content-Length: \(body.count)",
            "Connection: close",
            "",
            ""
        ].joined(separator: "\r\n")

        var response = Data(header.utf8)
        response.append(body)

        connection.send(content: response, completion: .contentProcessed { _ in
            connection.cancel()
        })
    }
}
