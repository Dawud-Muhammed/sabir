interface MoonlitSanctuaryProps {
  brightness: number
  motion: boolean
}

export function MoonlitSanctuary({ brightness }: MoonlitSanctuaryProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Night sky gradient */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `linear-gradient(180deg,
            rgba(15, 10, 35, ${brightness / 100 * 0.95}),
            rgba(25, 20, 50, ${brightness / 100 * 0.9}),
            rgba(35, 25, 60, ${brightness / 100 * 0.85})
          )`,
          opacity: brightness / 100
        }}
      />

      {/* Stars and celestial elements */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="moonGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="rgba(240, 240, 255, 0.5)" />
            <stop offset="60%" stopColor="rgba(200, 200, 220, 0.2)" />
            <stop offset="100%" stopColor="rgba(100, 100, 150, 0)" />
          </radialGradient>
          <filter id="moonGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Moon */}
        <circle cx="200" cy="150" r="80" fill="url(#moonGradient)" filter="url(#moonGlow)" />
        <circle cx="210" cy="140" r="3" fill="rgba(200, 200, 220, 0.3)" />
        <circle cx="195" cy="160" r="2" fill="rgba(200, 200, 220, 0.2)" />

        {/* Moon glow */}
        <circle cx="200" cy="150" r="110" fill="none" stroke="rgba(200, 200, 220, 0.05)" strokeWidth="20" />

        {/* Stars scattered across sky */}
        <g opacity="0.4">
          <circle cx="350" cy="100" r="1.5" fill="rgba(255, 255, 255, 0.8)" />
          <circle cx="500" cy="80" r="1" fill="rgba(255, 255, 255, 0.6)" />
          <circle cx="750" cy="120" r="1.5" fill="rgba(255, 255, 255, 0.7)" />
          <circle cx="950" cy="90" r="1" fill="rgba(255, 255, 255, 0.5)" />
          <circle cx="1050" cy="140" r="1.5" fill="rgba(255, 255, 255, 0.6)" />
          
          <circle cx="400" cy="200" r="1" fill="rgba(255, 255, 255, 0.5)" />
          <circle cx="800" cy="180" r="1.5" fill="rgba(255, 255, 255, 0.7)" />
          <circle cx="600" cy="220" r="1" fill="rgba(255, 255, 255, 0.4)" />
        </g>

        {/* Mosque silhouette */}
        <g opacity="0.15">
          {/* Dome outline */}
          <circle cx="600" cy="300" r="120" fill="none" stroke="rgba(200, 200, 220, 0.2)" strokeWidth="2" />
          
          {/* Minarets */}
          <rect x="350" y="200" width="30" height="200" fill="rgba(50, 50, 80, 0.2)" />
          <rect x="850" y="200" width="30" height="200" fill="rgba(50, 50, 80, 0.2)" />

          {/* Arches */}
          <path
            d="M 450 400 Q 500 300 550 400"
            stroke="rgba(200, 200, 220, 0.15)"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 650 400 Q 700 300 750 400"
            stroke="rgba(200, 200, 220, 0.15)"
            strokeWidth="4"
            fill="none"
          />
        </g>
      </svg>

      {/* Soft moonlight overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 20%, rgba(200, 200, 220, ${(100 - brightness) / 400}), transparent 40%)`
        }}
      />
    </div>
  )
}
