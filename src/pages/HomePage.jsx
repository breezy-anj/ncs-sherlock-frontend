import { useState, useEffect } from "react";
import { API, COLORS } from "../constants";
import { GlitchText, ArcadeButton } from "../components/ui";

export default function HomePage({ setPage }) {
  const [isGameOver, setIsGameOver] = useState(false);

  // Ping the backend on load to see if the game has been locked
  useEffect(() => {
    fetch(`${API}/game/leaderboard`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsGameOver(data.isGameOver);
        }
      })
      .catch((err) => console.error("Failed to fetch game state:", err));
  }, []);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>

      <GlitchText text="SHERLOCKED" size={28} />

      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 9,
          color: COLORS.muted,
          marginTop: 16,
          marginBottom: 40,
          letterSpacing: 2,
          lineHeight: 2,
        }}
      >
        THE DETECTIVE CHALLENGE BY NCS
        <br />
        FIND THE SOLUTION. UNLOCK THE NEXT CLUE.
      </p>

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ArcadeButton
          onClick={() => setPage(isGameOver ? "leaderboard" : "clues")}
        >
          {isGameOver ? "CHECK LEADERBOARD!" : "START INVESTIGATION"}
        </ArcadeButton>

        <ArcadeButton onClick={() => setPage("about")} variant="secondary">
          ABOUT THE EVENT
        </ArcadeButton>
      </div>

      {/* Event details card */}
      <div
        style={{
          marginTop: 60,
          border: `1px solid ${COLORS.border}`,
          padding: "24px 40px",
          background: COLORS.panel,
          display: "flex",
          gap: 48,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { label: "DATE", value: "TO BE REVEALED" },
          { label: "TIME", value: "TO BE REVEALED" },
          { label: "VENUE", value: "TO BE REVEALED" },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7,
                color: COLORS.muted,
                marginBottom: 8,
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 10,
                color: COLORS.accent,
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

