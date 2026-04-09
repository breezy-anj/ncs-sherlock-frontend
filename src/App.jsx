import { useState, useEffect } from "react";
import { API, COLORS } from "./constants"; // Added API here
import useToken from "./hooks/useToken";
import { Scanline } from "./components/ui";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import CluesPage from "./pages/CluesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const { token, user, setToken, logout } = useToken();
  const [page, setPage] = useState("home");

  useEffect(() => {
    if (token) {
      fetch(`${API}/game/leaderboard`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.isGameOver) {
            setPage("leaderboard");
          }
        })
        .catch((err) => console.error("Failed to check game state:", err));
    }
  }, [token]);

  if (!token) {
    return <AuthPage setToken={setToken} setPage={setPage} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        position: "relative",
      }}
    >
      <Scanline />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar page={page} setPage={setPage} user={user} logout={logout} />
        <main style={{ padding: "30px 40px" }}>
          {page === "home" && <HomePage setPage={setPage} />}
          {page === "clues" && <CluesPage token={token} />}
          {page === "leaderboard" && <LeaderboardPage />}
          {page === "about" && <AboutPage setPage={setPage} />}
        </main>
      </div>
    </div>
  );
}
