import { COLORS } from '../../constants'

export default function GlitchText({ text, size = 32, color = COLORS.accent }) {
  return (
    <span
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: size,
        color,
        textShadow: `2px 0 ${COLORS.cyan}, -2px 0 ${COLORS.red}`,
        letterSpacing: 2,
        display: 'inline-block',
      }}
    >
      {text}
    </span>
  )
}
