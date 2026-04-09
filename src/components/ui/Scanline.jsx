import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 150

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function createParticle(width, height) {
  return {
    x:        Math.random() * width,
    y:        Math.random() * height,
    size:     randomBetween(1, 3.5),
    speedX:   randomBetween(-0.4, 0.4),
    speedY:   randomBetween(-0.6, -0.15),
    opacity:  randomBetween(0.3, 1),
    fade:     randomBetween(0.003, 0.008),
    twinkle:  Math.random() > 0.5,
    twinkleSpeed: randomBetween(0.02, 0.06),
    twinklePhase: Math.random() * Math.PI * 2,
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width  = window.innerWidth
    let height = window.innerHeight
    canvas.width  = width
    canvas.height = height

    // ── particles ──────────────────────────────────────────
    let particles = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(width, height)
    )

    // ── infinity path helper ────────────────────────────────
    // Lemniscate of Bernoulli: parametric form
    // x = a·cos(t) / (1 + sin²(t))
    // y = a·sin(t)·cos(t) / (1 + sin²(t))
    function infinityPoint(t, cx, cy, a) {
      const denom = 1 + Math.sin(t) * Math.sin(t)
      return {
        x: cx + (a * Math.cos(t)) / denom,
        y: cy + (a * Math.sin(t) * Math.cos(t)) / denom,
      }
    }

    let infT    = 0          // travelling dot position
    let glowPulse = 0        // glow breathe
    let raf

    const resize = () => {
      width  = window.innerWidth
      height = window.innerHeight
      canvas.width  = width
      canvas.height = height
    }
    window.addEventListener('resize', resize)

    // ── render loop ─────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, width, height)

      const cx = width  / 2
      const cy = height / 2
      const a  = Math.min(width, height) * 0.80   // size of symbol

      glowPulse += 0.018
      const pulseAlpha = 0.18 + 0.07 * Math.sin(glowPulse)

      // ── draw infinity symbol ─────────────────────────────
      // outer soft glow
      ctx.save()
      ctx.shadowBlur = 0
      const STEPS = 300
      for (let pass = 0; pass < 3; pass++) {
        const blurSizes  = [32, 14, 4]
        const alphas     = [pulseAlpha * 0.5, pulseAlpha * 0.8, pulseAlpha * 1.4]
        const lineWidths = [18, 8, 2.5]

        ctx.beginPath()
        for (let i = 0; i <= STEPS; i++) {
          const t = (i / STEPS) * Math.PI * 2
          const p = infinityPoint(t, cx, cy, a)
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(245, 197, 24, ${alphas[pass]})`
        ctx.lineWidth   = lineWidths[pass]
        ctx.shadowColor = '#f5c518'
        ctx.shadowBlur  = blurSizes[pass]
        ctx.stroke()
      }
      ctx.restore()

      // ── travelling dot along the symbol ─────────────────
      infT += 0.012
      const dot = infinityPoint(infT, cx, cy, a)

      // dot trail
      for (let i = 8; i >= 0; i--) {
        const trailT = infT - i * 0.022
        const tp     = infinityPoint(trailT, cx, cy, a)
        const trailAlpha = (1 - i / 9) * 0.6
        ctx.beginPath()
        ctx.arc(tp.x, tp.y, 3 + i * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 197, 24, ${trailAlpha})`
        ctx.fill()
      }

      // dot itself
      ctx.save()
      ctx.shadowColor = '#f5c518'
      ctx.shadowBlur  = 20
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.restore()

      // ── sparkle particles ────────────────────────────────
      particles.forEach((p, idx) => {
        // twinkle
        const twinkleVal = p.twinkle
          ? 0.5 + 0.5 * Math.sin(glowPulse * (p.twinkleSpeed / 0.018) + p.twinklePhase)
          : 1

        const alpha = p.opacity * twinkleVal

        // draw sparkle as 4-point star
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.globalAlpha = Math.max(0, alpha)

        const r1 = p.size
        const r2 = p.size * 0.35

        // colour: mix between gold, cyan, white
        const palette = ['#f5c518', '#00e5ff', '#ffffff', '#f5c518', '#ffffff']
        ctx.fillStyle = palette[idx % palette.length]
        ctx.shadowColor = ctx.fillStyle
        ctx.shadowBlur  = 6

        ctx.beginPath()
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4
          const r     = i % 2 === 0 ? r1 : r2
          const sx    = Math.cos(angle) * r
          const sy    = Math.sin(angle) * r
          i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()

        // move
        p.x += p.speedX
        p.y += p.speedY
        p.opacity -= p.fade

        // reset when faded out or off screen
        if (p.opacity <= 0 || p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[idx] = createParticle(width, height)
        }
      })

      // ── scanline overlay ─────────────────────────────────
      ctx.fillStyle = 'rgba(0,0,0,0)'
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1)
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,
      }}
    />
  )
}
