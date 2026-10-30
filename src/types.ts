export type Environment = 'rainy-courtyard' | 'green-garden' | 'dawn' | 'moonlit-sanctuary'

export interface FocusSession {
  id: string
  startedAt: number
  completedAt: number | null
  duration: number // in minutes
  intention: string
}

export interface UserSettings {
  environment: Environment
  brightness: number // 0-100
  motion: boolean
  enableAudio: boolean
  notifications: boolean
}

export interface AppState {
  sessions: FocusSession[]
  settings: UserSettings
  currentSession: FocusSession | null
  isTimerRunning: boolean
}

export interface IslamicReminder {
  text: string
  arabicText?: string
  reference: string
  type: 'quranic' | 'hadith'
}
