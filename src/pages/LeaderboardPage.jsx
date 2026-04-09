import { useState, useEffect } from "react";
import { API, COLORS } from "../constants";
import { PixelBorder, GlitchText } from "../components/ui";

const MEDALS = ["🥇", "🥈", "🥉"];

const DEFAULT_SCORES = [
  {
    rank: 1,
    name: "???",
    year: "?",
    admissionNumber: "?????",
    score: "?/3",
    time: "??:??",
    status: "locked",
  },
  {
    rank: 2,
    name: "???",
    year: "?",
    admissionNumber: "?????",
    score: "?/3",
    time: "??:??",
    status: "locked",
  },
  {
    rank: 3,
    name: "???",
    year: "?",
    admissionNumber: "?????",
    score: "?/3",
    time: "??:??",
    status: "locked",
  },
];

export default function LeaderboardPage() {
  const [scores, setScores] = useState(DEFAULT_SCORES);
  const [isGameOver, setIsGameOver] = useState(false);
  const [blink, setBlink] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch(`${API}/game/leaderboard`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.isGameOver) {
          setIsGameOver(true);
          setScores(d.leaderboard);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 850, margin: "0 auto", padding: 24 }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
        <GlitchText text="LEADERBOARD" size={18} />
      </div>

      <PixelBorder style={{ background: COLORS.panel, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr 60px 100px 80px 120px",
            background: "#0a0a12",
            borderBottom: `2px solid ${COLORS.accent}`,
            padding: "12px 20px",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 8,
            color: COLORS.accentDim,
            letterSpacing: 1,
          }}
        >
          <span>RANK</span>
          <span>DETECTIVE</span>
          <span>YEAR</span>
          <span>ADMN NO.</span>
          <span>SCORE</span>
          <span>LAST SOLVE</span>
        </div>

        {loading ? (
          <div
            style={{
              padding: 24,
              textAlign: "center",
              fontFamily: "monospace",
              color: COLORS.muted,
            }}
          >
            Loading Data...
          </div>
        ) : (
          scores.map((s, i) => (
            <div
              key={s.rank || i}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 60px 100px 80px 120px",
                padding: "18px 20px",
                borderBottom:
                  i < scores.length - 1 ? `1px solid ${COLORS.border}` : "none",
                background: i === 0 && isGameOver ? "#1a1200" : "transparent",
              }}
            >
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 14,
                }}
              >
                {isGameOver && MEDALS[i] ? MEDALS[i] : s.rank}
              </span>
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 9,
                  color: i === 0 && isGameOver ? COLORS.accent : COLORS.text,
                }}
              >
                {!isGameOver ? (
                  <span style={{ color: COLORS.muted }}>{"????.?????"}</span>
                ) : (
                  s.name
                )}
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 10 }}>
                {s.year || "?"}
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 10 }}>
                {s.admissionNumber || "?????"}
              </span>
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 10,
                  color: s.score.includes("3/") ? COLORS.green : COLORS.text,
                }}
              >
                {s.score}
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: COLORS.textDim,
                }}
              >
                {s.time}
              </span>
            </div>
          ))
        )}
      </PixelBorder>

      {!isGameOver && (
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 8,
              color: blink ? COLORS.cyan : "transparent",
              letterSpacing: 2,
            }}
          >
            RESULTS RELEASED AFTER EVENT ENDS
          </p>
        </div>
      )}
    </div>
  );
}
