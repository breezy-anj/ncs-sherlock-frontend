import { useState, useEffect } from "react";
import { API, COLORS } from "../constants";
import { PixelBorder, GlitchText, ArcadeButton, Toast } from "../components/ui";

export default function CluesPage({ token }) {
  const [clues, setClues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [toast, setToast] = useState(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch(`${API}/game/clues`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setClues(d.clues);
          if (d.clues.length) setActive(d.clues[0].id);

          const prevAnswers = {};
          const prevSubmitted = {};

          if (d.submissions && d.submissions.length > 0) {
            d.submissions.forEach((sub) => {
              prevAnswers[sub.questionId] = sub.answer;
              prevSubmitted[sub.questionId] = true;
            });
          }

          setAnswers(prevAnswers);
          setSubmitted(prevSubmitted);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (id) => {
    if (!answers[id]?.trim()) return;
    setSubmitting((s) => ({ ...s, [id]: true }));
    try {
      const res = await fetch(`${API}/game/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ questionId: id, answer: answers[id].trim() }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSubmitted((s) => ({ ...s, [id]: true }));
      setToast({ msg: `Clue ${id} locked in!`, type: "success" });

      // Auto-advance logic
      const currentIndex = clues.findIndex((c) => c.id === id);
      if (currentIndex !== -1 && currentIndex < clues.length - 1) {
        setActive(clues[currentIndex + 1].id);
      }
    } catch (e) {
      setToast({ msg: e.message, type: "error" });
    } finally {
      setSubmitting((s) => ({ ...s, [id]: false }));
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
            color: COLORS.accent,
          }}
        >
          LOADING CASE FILES...
        </p>
      </div>
    );
  }

  const activeClue = clues.find((c) => c.id === active);

  return (
    <div style={{ width: "100%", padding: "24px 48px" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 28 }}>📁</span>
        <div>
          <GlitchText text="CASE FILES" size={16} />
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: COLORS.muted,
              marginTop: 6,
              letterSpacing: 1,
            }}
          >
            {clues.length} EVIDENCE ITEMS FOUND
          </p>
        </div>
      </div>

      {/* Clue tabs */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}
      >
        {clues.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 8,
              padding: "10px 18px",
              background: active === c.id ? COLORS.accent : "transparent",
              color:
                active === c.id
                  ? "#000"
                  : submitted[c.id]
                    ? COLORS.green
                    : COLORS.textDim,
              border: `1px solid ${
                active === c.id
                  ? COLORS.accent
                  : submitted[c.id]
                    ? COLORS.green
                    : COLORS.border
              }`,
              cursor: "pointer",
              transition: "all 0.12s",
              position: "relative",
            }}
          >
            {submitted[c.id] && active !== c.id && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  fontSize: 10,
                }}
              >
                ✓
              </span>
            )}
            CLUE #{c.id}
          </button>
        ))}
      </div>

      {/* Active clue panel */}
      {activeClue && (
        <PixelBorder
          style={{ padding: 32, background: COLORS.panel }}
          color={submitted[activeClue.id] ? COLORS.green : COLORS.accent}
        >
          {/* Badges */}
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                background: COLORS.accent,
                color: "#000",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 9,
                padding: "6px 12px",
              }}
            >
              EVIDENCE #{activeClue.id}
            </div>
            {submitted[activeClue.id] && (
              <div
                style={{
                  background: "#0a2a0a",
                  color: COLORS.green,
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 8,
                  padding: "6px 12px",
                  border: `1px solid ${COLORS.green}`,
                }}
              >
                SUBMITTED
              </div>
            )}
          </div>

          {/* Clue text */}
          <div
            style={{
              background: "#0d0d16",
              border: `1px solid ${COLORS.border}`,
              padding: "20px 24px",
              marginBottom: 24,
              fontFamily: "monospace",
              fontSize: 14,
              color: COLORS.text,
              lineHeight: 1.8,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: COLORS.accent,
              }}
            />
            <span style={{ color: COLORS.accentDim, marginRight: 8 }}>
              {">"}
            </span>
            {activeClue.text}
          </div>

          {/* Answer row */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 8,
                color: COLORS.accentDim,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              YOUR DEDUCTION:
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={answers[activeClue.id] || ""}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [activeClue.id]: e.target.value }))
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSubmit(activeClue.id)
                }
                placeholder="Type your answer..."
                style={{
                  flex: 1,
                  background: "#0d0d16",
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                  fontFamily: "monospace",
                  fontSize: 14,
                  padding: "12px 16px",
                  outline: "none",
                }}
              />
              <ArcadeButton
                onClick={() => handleSubmit(activeClue.id)}
                loading={submitting[activeClue.id]}
                variant={submitted[activeClue.id] ? "success" : "primary"}
              >
                {submitted[activeClue.id] ? "UPDATE" : "LOCK IN"}
              </ArcadeButton>
            </div>
          </div>

          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: COLORS.muted,
              letterSpacing: 1,
            }}
          >
            PRESS ENTER OR CLICK LOCK IN TO SUBMIT
          </p>
        </PixelBorder>
      )}

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
