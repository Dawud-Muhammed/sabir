import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react'

interface TimerControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onReset: () => void
  onFullscreen?: () => void
  timeRemaining: number
}

export function TimerControls({
  isRunning,
  onStart,
  onPause,
  onResume,
  onReset,
  onFullscreen,
  timeRemaining
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {!isRunning && timeRemaining > 0 && (
        <button
          onClick={isRunning ? onPause : onStart}
          className="p-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200 hover:shadow-lg hover:shadow-amber-600/40"
          aria-label="Start"
        >
          <Play size={24} />
        </button>
      )}

      {isRunning && (
        <button
          onClick={onPause}
          className="p-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200 hover:shadow-lg hover:shadow-amber-600/40"
          aria-label="Pause"
        >
          <Pause size={24} />
        </button>
      )}

      {!isRunning && timeRemaining > 0 && timeRemaining < (25 * 60) && (
        <button
          onClick={onResume}
          className="p-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200 hover:shadow-lg hover:shadow-amber-600/40"
          aria-label="Resume"
        >
          <Play size={24} />
        </button>
      )}

      <button
        onClick={onReset}
        className="p-3 rounded-full bg-amber-100/10 hover:bg-amber-100/20 text-amber-100 border border-amber-100/20 transition-all duration-200"
        aria-label="Reset"
      >
        <RotateCcw size={24} />
      </button>

      {onFullscreen && (
        <button
          onClick={onFullscreen}
          className="p-3 rounded-full bg-amber-100/10 hover:bg-amber-100/20 text-amber-100 border border-amber-100/20 transition-all duration-200"
          aria-label="Fullscreen"
        >
          <Maximize2 size={24} />
        </button>
      )}
    </div>
  )
}
