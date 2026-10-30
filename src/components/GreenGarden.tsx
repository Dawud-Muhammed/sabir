interface GreenGardenProps {
  brightness: number
  motion: boolean
}

export function GreenGarden({ brightness }: GreenGardenProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `linear-gradient(180deg,
            rgba(34, 74, 51, ${brightness / 100 * 0.8}),
            rgba(24, 64, 41, ${brightness / 100 * 0.75}),
            rgba(15, 54, 32, ${brightness / 100 * 0.7})
          )`,
          opacity: brightness / 100
        }}
      />

      {/* Foliage elements */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="leafGradient1" cx="40%" cy="40%">
            <stop offset="0%" stopColor="rgba(134, 239, 172, 0.2)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
          </radialGradient>
          <radialGradient id="leafGradient2" cx="40%" cy="40%">
            <stop offset="0%" stopColor="rgba(110, 231, 183, 0.15)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
          </radialGradient>
        </defs>

        {/* Distant trees */}
        <circle cx="150" cy="300" r="120" fill="url(#leafGradient1)" opacity="0.3" />
        <circle cx="1050" cy="320" r="140" fill="url(#leafGradient2)" opacity="0.25" />

        {/* Mid-ground foliage */}
        <ellipse cx="300" cy="450" rx="150" ry="100" fill="rgba(34, 197, 94, 0.15)" />
        <ellipse cx="900" cy="480" rx="180" ry="120" fill="rgba(52, 211, 153, 0.1)" />

        {/* Decorative arch elements with vines */}
        <path
          d="M 400 350 Q 450 250 500 350"
          stroke="rgba(134, 239, 172, 0.2)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 700 350 Q 750 250 800 350"
          stroke="rgba(110, 231, 183, 0.2)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Stone pathway elements */}
        <g opacity="0.1">
          <circle cx="550" cy="600" r="25" stroke="rgba(200, 200, 200, 0.4)" strokeWidth="2" fill="none" />
          <circle cx="600" cy="620" r="25" stroke="rgba(200, 200, 200, 0.4)" strokeWidth="2" fill="none" />
          <circle cx="650" cy="600" r="25" stroke="rgba(200, 200, 200, 0.4)" strokeWidth="2" fill="none" />
        </g>
      </svg>

      {/* Soft light overlay */}
      <div
        className="absolute inset-0 backdrop-blur-[0.5px]"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(134, 239, 172, 0.05), transparent 60%)`
        }}
      />
    </div>
  )
}
