import { useState } from 'react'
import { COLORS } from '../../constants'

export default function ArcadeInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: 'block',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 9,
          color: COLORS.accentDim,
          marginBottom: 8,
          letterSpacing: 1,
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? COLORS.accent : COLORS.muted,
            fontFamily: 'monospace',
            fontSize: 14,
            pointerEvents: 'none',
          }}
        >
          {'>'}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: focused ? '#16161f' : COLORS.panel,
            border: `1px solid ${focused ? COLORS.accent : COLORS.border}`,
            color: COLORS.text,
            fontFamily: 'monospace',
            fontSize: 14,
            padding: '12px 12px 12px 30px',
            outline: 'none',
            transition: 'all 0.15s',
            boxShadow: focused ? `0 0 12px ${COLORS.accent}33` : 'none',
          }}
        />
      </div>
    </div>
  )
}
