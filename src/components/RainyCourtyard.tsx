import { useEffect, useRef } from 'react'

interface RainyCourtyardProps {
  brightness: number // 0-100
  motion: boolean
}

export function RainyCourtyard({ brightness, motion }: RainyCourtyardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !motion) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to window size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Rain particles
    interface RainDrop {
      x: number
      y: number
      vy: number
      vx: number
      length: number
      opacity: number
    }

    const raindrops: RainDrop[] = []
    const rainCount = Math.floor((canvas.width * canvas.height) / 5000)

    for (let i = 0; i < rainCount; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: 5 + Math.random() * 5,
        vx: -0.5 + Math.random() * 0.3,
        length: 10 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.3
      })
    }

    let animationId: number

    const drawRain = () => {
      // Clear with semi-transparent overlay for motion blur
      ctx.fillStyle = `rgba(0, 0, 0, ${0.02 * (100 - brightness) / 100})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw raindrops
      raindrops.forEach(drop => {
        ctx.strokeStyle = `rgba(200, 220, 255, ${drop.opacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x + drop.vx, drop.y + drop.length)
        ctx.stroke()

        drop.y += drop.vy
        drop.x += drop.vx

        // Reset to top if below screen
        if (drop.y > canvas.height) {
          drop.y = -10
          drop.x = Math.random() * canvas.width
        }

        // Wrap horizontally
        if (drop.x > canvas.width) drop.x = 0
        if (drop.x < 0) drop.x = canvas.width
      })

      animationId = requestAnimationFrame(drawRain)
    }

    drawRain()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [motion, brightness])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Background gradient - mosque courtyard */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, 
            rgba(15, 23, 42, ${brightness / 100 * 0.9}),
            rgba(20, 32, 58, ${brightness / 100 * 0.85}),
            rgba(25, 40, 65, ${brightness / 100 * 0.8})
          )`,
          opacity: brightness / 100
        }}
      />

      {/* Architectural elements - arches */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {/* Mosque dome in background */}
        <defs>
          <radialGradient id="domeGradient" cx="50%" cy="40%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="70%" stopColor="rgba(20, 32, 58, 0.3)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0.5)" />
          </radialGradient>
          <linearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 248, 240, 0.08)" />
            <stop offset="100%" stopColor="rgba(30, 58, 80, 0.15)" />
          </linearGradient>
        </defs>

        {/* Dome */}
        <circle cx="600" cy="250" r="180" fill="url(#domeGradient)" opacity="0.7" />
        <ellipse cx="600" cy="240" rx="60" ry="40" fill="rgba(255, 215, 0, 0.1)" />

        {/* Minarets */}
        <rect x="300" y="200" width="40" height="280" fill="rgba(50, 100, 140, 0.2)" rx="4" />
        <rect x="860" y="200" width="40" height="280" fill="rgba(50, 100, 140, 0.2)" rx="4" />

        {/* Arches - left */}
        <path
          d="M 100 450 Q 150 350 200 450"
          stroke="url(#archGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 250 450 Q 300 350 350 450"
          stroke="url(#archGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Arches - right */}
        <path
          d="M 850 450 Q 900 350 950 450"
          stroke="url(#archGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 1000 450 Q 1050 350 1100 450"
          stroke="url(#archGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Geometric patterns */}
        <g opacity="0.06">
          <rect x="400" y="350" width="20" height="20" fill="none" stroke="rgba(217, 119, 6, 0.5)" />
          <rect x="430" y="350" width="20" height="20" fill="none" stroke="rgba(217, 119, 6, 0.5)" />
          <rect x="460" y="350" width="20" height="20" fill="none" stroke="rgba(217, 119, 6, 0.5)" />
          
          <rect x="750" y="350" width="20" height="20" fill="none" stroke="rgba(217, 119, 6, 0.5)" />
          <rect x="780" y="350" width="20" height="20" fill="none" stroke="rgba(217, 119, 6, 0.5)" />
          <rect x="810" y="350" width="20" height="20" fill="none" stroke="rgba(217, 119, 6, 0.5)" />
        </g>
      </svg>

      {/* Rain animation canvas */}
      {motion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-60"
          style={{ opacity: (brightness / 100) * 0.6 }}
        />
      )}

      {/* Atmospheric mist overlay */}
      <div
        className="absolute inset-0 backdrop-blur-[1px]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,${(100 - brightness) / 200}))`
        }}
      />
    </div>
  )
}
