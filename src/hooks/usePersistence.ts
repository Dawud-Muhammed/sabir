import { useState, useEffect, useCallback } from 'react'
import type { AppState, UserSettings, FocusSession } from '../types'
const SESSIONS_KEY = 'sabir-sessions'
const SETTINGS_KEY = 'sabir-settings'

const defaultSettings: UserSettings = {
  environment: 'rainy-courtyard',
  brightness: 100,
  motion: true,
  enableAudio: false,
  notifications: true
}

export function usePersistence() {
  const [appState, setAppState] = useState<AppState | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const sessionsJson = localStorage.getItem(SESSIONS_KEY)
      const settingsJson = localStorage.getItem(SETTINGS_KEY)

      const sessions: FocusSession[] = sessionsJson ? JSON.parse(sessionsJson) : []
      const settings: UserSettings = settingsJson ? { ...defaultSettings, ...JSON.parse(settingsJson) } : defaultSettings

      setAppState({
        sessions,
        settings,
        currentSession: null,
        isTimerRunning: false
      })
    } catch (error) {
      console.error('Failed to load app state:', error)
      setAppState({
        sessions: [],
        settings: defaultSettings,
        currentSession: null,
        isTimerRunning: false
      })
    }
    setIsLoaded(true)
  }, [])

  const saveSessions = useCallback((sessions: FocusSession[]) => {
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
    } catch (error) {
      console.error('Failed to save sessions:', error)
    }
  }, [])

  const saveSettings = useCallback((settings: UserSettings) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }, [])

  const addSession = useCallback((session: FocusSession) => {
    setAppState(prev => {
      if (!prev) return prev
      const newSessions = [...prev.sessions, session]
      saveSessions(newSessions)
      return { ...prev, sessions: newSessions }
    })
  }, [saveSessions])

  const updateSettings = useCallback((newSettings: UserSettings) => {
    setAppState(prev => {
      if (!prev) return prev
      saveSettings(newSettings)
      return { ...prev, settings: newSettings }
    })
  }, [saveSettings])

  const clearHistory = useCallback(() => {
    setAppState(prev => {
      if (!prev) return prev
      saveSessions([])
      return { ...prev, sessions: [] }
    })
  }, [saveSessions])

  const getStats = useCallback(() => {
    if (!appState) return null

    const completedSessions = appState.sessions.filter(s => s.completedAt !== null)
    const totalMinutes = completedSessions.reduce((sum, s) => sum + (s.completedAt! - s.startedAt) / 60000, 0)
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayMinutes = completedSessions
      .filter(s => new Date(s.completedAt!).getTime() >= today.getTime())
      .reduce((sum, s) => sum + (s.completedAt! - s.startedAt) / 60000, 0)

    // Calculate streak
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (let i = 0; i < 365; i++) {
      const dateMs = currentDate.getTime()
      const nextDateMs = dateMs + 86400000
      
      const hasSessionToday = completedSessions.some(
        s => s.completedAt! >= dateMs && s.completedAt! < nextDateMs
      )
      
      if (hasSessionToday) {
        streak++
        currentDate.setTime(currentDate.getTime() - 86400000)
      } else {
        break
      }
    }

    return {
      totalSessions: completedSessions.length,
      totalMinutes: Math.round(totalMinutes),
      todayMinutes: Math.round(todayMinutes),
      streak,
      recentSessions: completedSessions.slice(-5).reverse()
    }
  }, [appState])

  return {
    appState,
    isLoaded,
    addSession,
    updateSettings,
    clearHistory,
    getStats
  }
}
