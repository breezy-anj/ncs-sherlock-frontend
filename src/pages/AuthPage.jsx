import { useState } from "react";
import { API, COLORS } from "../constants";
import {
  Scanline,
  PixelBorder,
  GlitchText,
  ArcadeInput,
  ArcadeButton,
  Toast,
} from "../components/ui";

export default function AuthPage({ setToken, setPage }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [zealId, setZealId] = useState("");
  const [year, setYear] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url =
        mode === "login" ? `${API}/auth/login` : `${API}/auth/register`;
      const body =
        mode === "login"
          ? { zealId, password }
          : { name, zealId, year: Number(year), admissionNumber, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || data.error);

      setToken(data.token, data.user);
      if (data.isGameOver) {
        setPage("leaderboard");
      } else {
        setPage("home");
      }
    } catch (e) {
      setToast({ msg: e.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
      }}
    >
      <Scanline />
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔍</div>
          <GlitchText text="SHERLOCKED" size={22} />
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: COLORS.muted,
              marginTop: 12,
              letterSpacing: 2,
            }}
          >
            DETECTIVE CHALLENGE v1.0
          </p>
        </div>

        <PixelBorder style={{ padding: "48px 56px", background: COLORS.panel }}>
          <div
            style={{
              display: "flex",
              marginBottom: 28,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  background: mode === m ? COLORS.accent : "transparent",
                  color: mode === m ? "#000" : COLORS.muted,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 8,
                  letterSpacing: 1,
                  transition: "all 0.12s",
                }}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>

          {mode === "register" && (
            <>
              <ArcadeInput
                label="DETECTIVE NAME"
                value={name}
                onChange={setName}
                placeholder="Enter your alias"
              />
              <ArcadeInput
                label="YEAR"
                type="number"
                value={year}
                onChange={setYear}
                placeholder="e.g. 1"
              />
              <ArcadeInput
                label="ADMISSION NO."
                value={admissionNumber}
                onChange={setAdmissionNumber}
                placeholder="e.g. 25XXXX"
              />
            </>
          )}
          <ArcadeInput
            label="ZEAL ID"
            value={zealId}
            onChange={setZealId}
            placeholder="e.g. ZL-1234"
          />
          <ArcadeInput
            label="PASSWORD"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />

          <div style={{ marginTop: 8 }}>
            <ArcadeButton fullWidth loading={loading} onClick={handleSubmit}>
              {mode === "login" ? "ENTER CASE ROOM" : "JOIN THE CASE"}
            </ArcadeButton>
          </div>
        </PixelBorder>
      </div>
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}
