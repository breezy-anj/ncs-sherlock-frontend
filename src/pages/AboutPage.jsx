import { COLORS } from '../constants'
import { GlitchText, PixelBorder, ArcadeButton } from '../components/ui'

const TEAM = [
  { role: 'ORGANISER', name: 'NIBBLE COMPUTER SOCIETY' },
  { role: 'EVENT', name: 'SHERLOCKED 2026' },
  { role: 'CONTACT', name: 'hackncs.in' },
]

export default function AboutPage({ setPage }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>

      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <GlitchText text="ABOUT" size={20} />
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: COLORS.muted, marginTop: 12, letterSpacing: 2 }}>
          THE CASE BEHIND THE CASE
        </p>
      </div>

      <PixelBorder style={{ padding: '28px 32px', background: COLORS.panel, marginBottom: 24 }}>
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: COLORS.accent, marginBottom: 16 }}>
          WHAT IS SHERLOCKED?
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: 14, color: COLORS.text, lineHeight: 1.9 }}>
          Sherlocked is a detective-themed puzzle challenge hosted by the
          Nibble Computer Society. Players receive encrypted clues and must
          decode them to unlock the next challenge. The fastest detective
          with the most correct answers wins.
        </p>
      </PixelBorder>

      <PixelBorder style={{ padding: '28px 32px', background: COLORS.panel, marginBottom: 24 }}>
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: COLORS.accent, marginBottom: 20 }}>
          HOW TO PLAY
        </p>
        {[
          '01. REGISTER OR LOGIN TO YOUR DETECTIVE ACCOUNT',
          '02. OPEN THE CASE FILES TAB TO VIEW CLUES',
          '03. DECODE EACH CLUE AND TYPE YOUR ANSWER',
          '04. HIT LOCK IN — YOUR ANSWER IS SAVED',
          '05. SCORE IS REVEALED AFTER THE EVENT ENDS',
        ].map((step) => (
          <p key={step} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: COLORS.textDim, lineHeight: 2.4, letterSpacing: 1 }}>
            {'>'} {step}
          </p>
        ))}
      </PixelBorder>

      <PixelBorder style={{ padding: '28px 32px', background: COLORS.panel, marginBottom: 40 }}>
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: COLORS.accent, marginBottom: 20 }}>
          EVENT INFO
        </p>
        {TEAM.map((t) => (
          <div key={t.role} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${COLORS.border}`, padding: '10px 0' }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: COLORS.muted }}>{t.role}</span>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: COLORS.text }}>{t.name}</span>
          </div>
        ))}
      </PixelBorder>

      <div style={{ textAlign: 'center' }}>
        <ArcadeButton onClick={() => setPage('home')}>
          BACK TO HOME
        </ArcadeButton>
      </div>
    </div>
  )
}