// TEST
import { COLORS } from "../constants";
import { ArcadeButton } from "./ui";

const NAV_ITEMS = [
  { id: "home", label: "HOME", icon: "🏠" },
  { id: "clues", label: "CASE FILES", icon: "📁" },
  { id: "leaderboard", label: "BOARD", icon: "🏆" },
  { id: "about", label: "ABOUT", icon: "ℹ️" },
];

export default function Navbar({ page, setPage, user, logout }) {
  return (
    <nav
      style={{
        background: "#08080f",
        borderBottom: `2px solid ${COLORS.accent}`,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: `0 2px 20px ${COLORS.accent}22`,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 18 }}>🔍</span>
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
            color: COLORS.accent,
            letterSpacing: 1,
          }}
        >
          SHERLOCKED
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 4 }}>
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            style={{
              background: page === n.id ? `${COLORS.accent}22` : "transparent",
              color: page === n.id ? COLORS.accent : COLORS.muted,
              border:
                page === n.id
                  ? `1px solid ${COLORS.accent}44`
                  : "1px solid transparent",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              padding: "8px 12px",
              cursor: "pointer",
              letterSpacing: 1,
              transition: "all 0.12s",
            }}
          >
            {n.icon} {n.label}
          </button>
        ))}
      </div>

      {/* User + logout */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: COLORS.textDim,
          }}
        >
          {/* {user?.email?.split("@")[0]} */}
          {user?.zealId}{" "}
        </span>

        {/* NCS Logo — just left of EXIT */}
        <img
          src="/ncs-logo.png"
          alt="NCS Logo"
          style={{
            height: 32,
            width: "auto",
            objectFit: "contain",
            // filter: 'brightness(0) invert(1)',  // makes it white to match dark theme
            opacity: 0.85,
          }}
        />

        <ArcadeButton onClick={logout} variant="secondary" small>
          EXIT
        </ArcadeButton>
      </div>
    </nav>
  );
}
