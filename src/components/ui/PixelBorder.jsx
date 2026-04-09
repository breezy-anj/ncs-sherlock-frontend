import { COLORS } from '../../constants'


export default function PixelBorder({ children, style = {}, color = COLORS.accent }) {
  const corners = [
    { top: -4, left: -4 },
    { bottom: -4, left: -4 },
    { top: -4, right: -4 },
    { bottom: -4, right: -4 },
  ]

  return (
    <div
      style={{
        position: 'relative',
        border: `2px solid ${color}`,
        boxShadow: `0 0 0 1px ${color}33, inset 0 0 0 1px ${color}22, 0 0 20px ${color}22`,
        ...style,
      }}
    >
      {corners.map((pos, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            background: color,
            display: 'block',
            ...pos,
          }}
        />
      ))}
      {children}
    </div>
  )
}
