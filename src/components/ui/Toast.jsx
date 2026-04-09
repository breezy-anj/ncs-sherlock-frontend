import { useEffect } from 'react'
import { COLORS } from '../../constants'

export default function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [message, onDone])

  if (!message) return null

  const isError = type === 'error'

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: isError ? '#2a0a0a' : '#0a1a0a',
        border: `1px solid ${isError ? COLORS.red : COLORS.green}`,
        color: isError ? COLORS.red : COLORS.green,
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 9,
        padding: '12px 24px',
        zIndex: 10000,
        letterSpacing: 1,
        boxShadow: `0 0 20px ${isError ? COLORS.red : COLORS.green}44`,
        whiteSpace: 'nowrap',
      }}
    >
      {isError ? '✕ ' : '✓ '}
      {message}
    </div>
  )
}
