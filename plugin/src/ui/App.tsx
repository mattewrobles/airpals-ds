import React, { useState, useEffect } from "react";

type Tab = "push" | "pull";
type SyncStatus = "idle" | "syncing" | "done" | "error";

export default function App() {
  const [tab, setTab] = useState<Tab>("push");
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [message, setMessage] = useState("");
  const [diff, setDiff] = useState<null | { added: number; changed: number; removed: number }>(null);

  useEffect(() => {
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (!msg) return;
      if (msg.type === "PUSH_DONE") {
        setStatus("done");
        setMessage(`Pushed ${msg.count} tokens to Figma`);
      }
      if (msg.type === "PULL_DONE") {
        setStatus("done");
        setMessage(`Pulled ${Object.keys(msg.tokens).length} tokens from Figma`);
        // Send to Prism app via localhost
        sendToPrismApp(msg.tokens);
      }
    };
  }, []);

  const handlePush = () => {
    setStatus("syncing");
    // Prism app writes tokens to clipboard or local server
    parent.postMessage({ pluginMessage: { type: "PUSH", payload: window.__PRISM_TOKENS__ } }, "*");
  };

  const handlePull = () => {
    setStatus("syncing");
    parent.postMessage({ pluginMessage: { type: "PULL" } }, "*");
  };

  const sendToPrismApp = async (tokens: object) => {
    try {
      await fetch("http://localhost:7891/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tokens),
      });
    } catch {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(JSON.stringify(tokens, null, 2));
      setMessage("Tokens copied to clipboard — paste into Prism");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.logo}>▲ Prism</span>
        <span style={styles.version}>v0.1.0</span>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={tab === "push" ? styles.tabActive : styles.tab} onClick={() => setTab("push")}>
          ↑ Push to Figma
        </button>
        <button style={tab === "pull" ? styles.tabActive : styles.tab} onClick={() => setTab("pull")}>
          ↓ Pull from Figma
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {tab === "push" && (
          <div>
            <p style={styles.desc}>
              Push your Prism tokens as Figma Variables. Creates primitives + semantic collections with Light/Dark modes.
            </p>
            {diff && (
              <div style={styles.diff}>
                <span style={{ color: "#22c55e" }}>+{diff.added} added</span>
                <span style={{ color: "#f59e0b" }}>~{diff.changed} changed</span>
                <span style={{ color: "#ef4444" }}>−{diff.removed} removed</span>
              </div>
            )}
            <button
              style={status === "syncing" ? styles.btnDisabled : styles.btn}
              onClick={handlePush}
              disabled={status === "syncing"}
            >
              {status === "syncing" ? "Pushing..." : "Push Tokens"}
            </button>
          </div>
        )}

        {tab === "pull" && (
          <div>
            <p style={styles.desc}>
              Pull all Variables from the current Figma file into Prism. Imports as DTCG format.
            </p>
            <button
              style={status === "syncing" ? styles.btnDisabled : styles.btnSecondary}
              onClick={handlePull}
              disabled={status === "syncing"}
            >
              {status === "syncing" ? "Pulling..." : "Pull from Figma"}
            </button>
          </div>
        )}

        {message && (
          <div style={status === "done" ? styles.successMsg : styles.errorMsg}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    __PRISM_TOKENS__: any;
  }
}

// ─── Styles ───────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  container: { fontFamily: "Inter, system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", background: "#fff" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f0f0f0" },
  logo: { fontWeight: 700, fontSize: 16 },
  version: { fontSize: 12, color: "#999" },
  tabs: { display: "flex", borderBottom: "1px solid #f0f0f0" },
  tab: { flex: 1, padding: "12px", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "#666" },
  tabActive: { flex: 1, padding: "12px", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "#3b82f6", borderBottom: "2px solid #3b82f6", fontWeight: 600 },
  content: { padding: 20, flex: 1 },
  desc: { fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 16 },
  btn: { width: "100%", padding: "12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  btnSecondary: { width: "100%", padding: "12px", background: "#f0f0f0", color: "#111", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  btnDisabled: { width: "100%", padding: "12px", background: "#ccc", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, cursor: "not-allowed" },
  diff: { display: "flex", gap: 12, fontSize: 12, marginBottom: 12 },
  successMsg: { marginTop: 16, padding: "10px 14px", background: "#f0fdf4", color: "#16a34a", borderRadius: 8, fontSize: 13 },
  errorMsg: { marginTop: 16, padding: "10px 14px", background: "#fef2f2", color: "#dc2626", borderRadius: 8, fontSize: 13 },
};
