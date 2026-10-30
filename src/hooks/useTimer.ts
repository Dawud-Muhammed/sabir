import { useState, useEffect, useRef, useCallback } from 'react'
import type { FocusSession } from '../types'

interface UseTimerProps {
  initialDuration: number // in minutes
  intention: string
  onComplete?: () => void
}

interface UseTimerReturn {
  session: FocusSession | null
  timeRemaining: number // in seconds
  isRunning: boolean
  progress: number // 0-100
  start: () => void
  pause: () => void
  resume: () => void
  reset: () => void
}

export function useTimer({ initialDuration, intention, onComplete }: UseTimerProps): UseTimerReturn {
  const [session, setSession] = useState<FocusSession | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(initialDuration * 60)
  const [pausedAt, setPausedAt] = useState<number | null>(null)
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completedRef = useRef(false)

  // Initialize session on mount
  useEffect(() => {
    const newSession: FocusSession = {
      id: `session-${Date.now()}`,
      startedAt: Date.now(),
      completedAt: null,
      duration: initialDuration,
      intention
    }
    setSession(newSession)
    setTimeRemaining(initialDuration * 60)
    completedRef.current = false
  }, [initialDuration, intention])

  // Timer loop
  useEffect(() => {
    if (!isRunning || !session) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Use timestamp-based calculation for accuracy
    const sessionStartTime = session.startedAt
    
    intervalRef.current = setInterval(() => {
      const elapsedMs = Date.now() - sessionStartTime - (pausedAt ? Date.now() - pausedAt : 0)
      const elapsedSeconds = Math.floor(elapsedMs / 1000)
      const totalSeconds = initialDuration * 60
      const remaining = Math.max(0, totalSeconds - elapsedSeconds)

      setTimeRemaining(remaining)

      if (remaining === 0 && !completedRef.current) {
        completedRef.current = true
        setIsRunning(false)
        
        // Update session with completion
        setSession(prev => prev ? { ...prev, completedAt: Date.now() } : null)
        onComplete?.()
      }
    }, 100) // Check 10x per second for smooth updates

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, session, initialDuration, pausedAt, onComplete])

  const start = useCallback(() => {
    setIsRunning(true)
    setPausedAt(null)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
    setPausedAt(Date.now())
  }, [])

  const resume = useCallback(() => {
    setIsRunning(true)
    setPausedAt(null)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeRemaining(initialDuration * 60)
    setPausedAt(null)
    completedRef.current = false
    const newSession: FocusSession = {
      id: `session-${Date.now()}`,
      startedAt: Date.now(),
      completedAt: null,
      duration: initialDuration,
      intention
    }
    setSession(newSession)
  }, [initialDuration, intention])

  const totalSeconds = initialDuration * 60
  const progress = Math.max(0, ((totalSeconds - timeRemaining) / totalSeconds) * 100)

  return {
    session: session && session.completedAt ? session : null,
    timeRemaining,
    isRunning,
    progress,
    start,
    pause,
    resume,
    reset
  }
}
