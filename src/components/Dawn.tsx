interface DawnProps {
  brightness: number
  motion: boolean
}

export function Dawn({ brightness }: DawnProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Warm sunrise gradient */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `linear-gradient(180deg,
            rgba(254, 215, 170, ${brightness / 100 * 0.3}),
            rgba(249, 115, 22, ${brightness / 100 * 0.2}),
            rgba(191, 64, 191, ${brightness / 100 * 0.15}),
            rgba(59, 130, 246, ${brightness / 100 * 0.25})
          )`,
          opacity: brightness / 100
        }}
      />

      {/* Sky elements */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sunGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(255, 200, 100, 0.4)" />
            <stop offset="70%" stopColor="rgba(255, 140, 60, 0.2)" />
            <stop offset="100%" stopColor="rgba(200, 80, 40, 0)" />
          </radialGradient>
          <radialGradient id="glowGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(255, 160, 80, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 80, 40, 0)" />
          </radialGradient>
        </defs>

        {/* Sun */}
        <circle cx="600" cy="200" r="100" fill="url(#sunGradient)" />
        <circle cx="600" cy="200" r="120" fill="url(#glowGradient)" opacity="0.6" />

        {/* Clouds */}
        <ellipse cx="200" cy="150" rx="100" ry="40" fill="rgba(255, 200, 150, 0.15)" />
        <ellipse cx="250" cy="160" rx="80" ry="35" fill="rgba(255, 220, 180, 0.1)" />
        <ellipse cx="1000" cy="180" rx="120" ry="45" fill="rgba(200, 150, 100, 0.12)" />

        {/* Horizon landscape silhouette */}
        <ellipse cx="600" cy="450" rx="600" ry="100" fill="rgba(100, 60, 40, 0.2)" />
      </svg>

      {/* Atmospheric glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 20%, rgba(255, 200, 100, ${(100 - brightness) / 300}), transparent 50%)`
        }}
      />
    </div>
  )
}
