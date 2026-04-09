import { useState } from 'react'
import { COLORS } from '../../constants'

const VARIANTS = {
  primary:   { bg: COLORS.accent, text: '#000',  hover: COLORS.accentDim },
  secondary: { bg: 'transparent', text: COLORS.accent, hover: '#ffffff11' },
  danger:    { bg: COLORS.red,    text: '#fff',  hover: '#cc2222' },
  success:   { bg: COLORS.green,  text: '#000',  hover: '#2acc10' },
}

export default function ArcadeButton({
  children,
  onClick,
  loading = false,
  variant = 'primary',
  fullWidth = false,
  small = false,
}) {
  const [hovered, setHovered] = useState(false)
  const c = VARIANTS[variant]

  return (
    <button
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: fullWidth ? '100%' : undefined,
        background: loading ? COLORS.muted : hovered ? c.hover : c.bg,
        color: c.text,
        border: variant === 'secondary' ? `1px solid ${COLORS.accent}` : 'none',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: small ? 8 : 10,
        padding: small ? '8px 14px' : '14px 24px',
        cursor: loading ? 'not-allowed' : 'pointer',
        letterSpacing: 1,
        transition: 'all 0.12s',
        transform: hovered && !loading ? 'translateY(-1px)' : 'none',
      }}
    >
      {loading ? '...' : children}
    </button>
  )
}
