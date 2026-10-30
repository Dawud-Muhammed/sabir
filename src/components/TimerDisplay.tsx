import { useMemo } from 'react'

interface TimerDisplayProps {
  timeRemaining: number // in seconds
  progress: number // 0-100
  isRunning: boolean
}

export function TimerDisplay({ timeRemaining, progress, isRunning }: TimerDisplayProps) {
  const { hours, minutes, seconds } = useMemo(() => {
    const totalMinutes = Math.floor(timeRemaining / 60)
    const hrs = Math.floor(totalMinutes / 60)
    const mins = totalMinutes % 60
    const secs = timeRemaining % 60
    return { hours: hrs, minutes: mins, seconds: secs }
  }, [timeRemaining])

  const displayHours = String(hours).padStart(2, '0')
  const displayMinutes = String(minutes).padStart(2, '0')
  const displaySeconds = String(seconds).padStart(2, '0')

  return (
    <div className="relative flex flex-col items-center">
      {/* Circular progress background */}
      <div className="relative w-72 h-72 mb-8">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl transition-all duration-300"
          style={{
            background: `conic-gradient(from 0deg, rgba(217, 119, 6, 0.1), rgba(217, 119, 6, 0.2), transparent 25%)`,
            opacity: isRunning ? 0.8 : 0.4
          }}
        />

        {/* SVG circular progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgba(217, 119, 6, 0.1)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgb(217, 119, 6)"
            strokeWidth="4"
            strokeDasharray={`${(progress / 100) * 283} 283`}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* Timer text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-display text-8xl md:text-9xl font-black text-amber-100 tracking-tighter leading-none">
              {displayHours}:<span className="text-amber-100">{displayMinutes}</span>:<span className="text-amber-200">{displaySeconds}</span>
            </div>
            {isRunning && (
              <div className="mt-2 text-sm text-amber-300/70 animate-pulse">
                Focus mode active
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
