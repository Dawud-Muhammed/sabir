import { useState, useEffect } from 'react'
import { usePersistence } from './hooks/usePersistence'
import { useTimer } from './hooks/useTimer'
import {
  BrandSignature,
  TimerDisplay,
  TimerControls,
  SettingsPanel,
  History,
  EnvironmentRenderer
} from './components'
import { Settings, History as HistoryIcon, Menu, X } from 'lucide-react'

type PageView = 'timer' | 'history' | 'settings'

export default function App() {
  const { appState, isLoaded, addSession, updateSettings, clearHistory } = usePersistence()
  const [selectedDuration, setSelectedDuration] = useState(25)
  const [customHours, setCustomHours] = useState('')
  const [customMinutes, setCustomMinutes] = useState('')
  const [currentPage, setCurrentPage] = useState<PageView>('timer')
  const [showMobileNav, setShowMobileNav] = useState(false)

  const { timeRemaining, isRunning, progress, start, pause, resume, reset, session } = useTimer({
    initialDuration: selectedDuration,
    intention: '',
    onComplete: () => {
      if (appState) {
        if (appState.settings.notifications) {
          try {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Focus Session Complete', {
                body: `Great work! You completed ${selectedDuration} minutes of focused time.`,
                icon: '🧡'
              })
            }
          } catch (e) {
            console.error('Notification failed:', e)
          }
        }
      }
    }
  })

  // Watch for session completion and save it
  useEffect(() => {
    if (session && session.completedAt !== null) {
      addSession(session)
    }
  }, [session?.completedAt, session?.id, addSession])

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  if (!isLoaded || !appState) {
    return <div className="min-h-screen bg-emerald-950" />
  }

  // Function to update custom duration based on HH:MM input
  const updateCustomDuration = (hours: string, minutes: string) => {
    const h = parseInt(hours) || 0
    const m = parseInt(minutes) || 0
    const totalMinutes = h * 60 + m
    if (totalMinutes > 0) {
      setSelectedDuration(totalMinutes)
    }
  }

  return (
    <div className="relative h-screen bg-emerald-950 text-amber-100 overflow-hidden flex flex-col">
      {/* Environment background */}
      <EnvironmentRenderer
        environment={appState.settings.environment}
        brightness={appState.settings.brightness}
        motion={appState.settings.motion}
      />

      {/* Navigation Bar */}
      <nav className="relative z-40 bg-emerald-950/80 backdrop-blur-md border-b border-amber-200/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-100 tracking-tight">
              SABIR
            </h1>
            <p className="text-amber-200/60 text-sm">صابر</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('timer')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'timer'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100/10 text-amber-100 hover:bg-amber-100/20'
              }`}
            >
              Timer
            </button>
            <button
              onClick={() => setCurrentPage('history')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                currentPage === 'history'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100/10 text-amber-100 hover:bg-amber-100/20'
              }`}
            >
              <HistoryIcon size={18} /> History
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                currentPage === 'settings'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100/10 text-amber-100 hover:bg-amber-100/20'
              }`}
            >
              <Settings size={18} /> Settings
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="md:hidden p-2 hover:bg-amber-100/10 rounded-lg transition-colors text-amber-100"
          >
            {showMobileNav ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileNav && (
          <div className="md:hidden mt-4 flex flex-col gap-2 border-t border-amber-200/10 pt-4">
            <button
              onClick={() => {
                setCurrentPage('timer')
                setShowMobileNav(false)
              }}
              className={`w-full px-4 py-2 rounded-lg font-semibold transition-all text-left ${
                currentPage === 'timer'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100/10 text-amber-100 hover:bg-amber-100/20'
              }`}
            >
              Timer
            </button>
            <button
              onClick={() => {
                setCurrentPage('history')
                setShowMobileNav(false)
              }}
              className={`w-full px-4 py-2 rounded-lg font-semibold transition-all text-left flex items-center gap-2 ${
                currentPage === 'history'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100/10 text-amber-100 hover:bg-amber-100/20'
              }`}
            >
              <HistoryIcon size={18} /> History
            </button>
            <button
              onClick={() => {
                setCurrentPage('settings')
                setShowMobileNav(false)
              }}
              className={`w-full px-4 py-2 rounded-lg font-semibold transition-all text-left flex items-center gap-2 ${
                currentPage === 'settings'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100/10 text-amber-100 hover:bg-amber-100/20'
              }`}
            >
              <Settings size={18} /> Settings
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area - Fixed Height, No Scroll */}
      <main className="relative z-10 flex-1 overflow-hidden flex items-center justify-center p-6">
        {/* Timer Page */}
        {currentPage === 'timer' && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto overflow-y-auto scrollbar-hide">
            {/* LEFT: Forever Text */}
            <div className="absolute left-4 md:left-12 top-1/2 transform -translate-y-1/2 z-20">
              <p className="text-6xl md:text-8xl font-black text-amber-100 tracking-tight">
                forever
              </p>
            </div>

            {/* RIGHT: Arabic Text */}
            <div className="absolute right-4 md:right-12 top-1/2 transform -translate-y-1/2 z-20">
              <p lang="ar" dir="rtl" className="text-6xl md:text-8xl font-black text-amber-100 tracking-tight">
                الْحَمْدُ لِلَّهِ
              </p>
            </div>

            {/* Timer Display - Bolder */}
            <TimerDisplay
              timeRemaining={timeRemaining}
              progress={progress}
              isRunning={isRunning}
            />

            {/* Duration Selector & Custom Input */}
            {!isRunning && timeRemaining === selectedDuration * 60 && (
              <div className="flex flex-col items-center gap-6 w-full max-w-lg">
                {/* Custom HH:MM Input (No Seconds) */}
                <div className="w-full bg-emerald-950/30 backdrop-blur-sm border border-amber-200/20 rounded-lg p-6">
                  <p className="text-amber-200 text-sm font-semibold mb-4 text-center">Set your focus time</p>
                  <div className="flex items-center justify-center gap-4">
                    {/* Hours */}
                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={customHours}
                        onChange={(e) => {
                          const val = e.target.value
                          if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 23)) {
                            setCustomHours(val)
                            updateCustomDuration(val, customMinutes)
                          }
                        }}
                        placeholder="00"
                        className="w-20 px-2 py-2 rounded-lg bg-emerald-900/50 border border-amber-200/20 text-amber-100 placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-600 text-center font-bold text-xl"
                      />
                      <span className="text-amber-200/60 text-xs mt-1">Hour</span>
                    </div>
                    
                    <span className="text-amber-200 font-bold text-2xl">:</span>
                    
                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={customMinutes}
                        onChange={(e) => {
                          const val = e.target.value
                          if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 59)) {
                            setCustomMinutes(val)
                            updateCustomDuration(customHours, val)
                          }
                        }}
                        placeholder="00"
                        className="w-20 px-2 py-2 rounded-lg bg-emerald-900/50 border border-amber-200/20 text-amber-100 placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-600 text-center font-bold text-xl"
                      />
                      <span className="text-amber-200/60 text-xs mt-1">Min</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timer Controls - Only Play & Reset */}
            <TimerControls
              isRunning={isRunning}
              onStart={start}
              onPause={pause}
              onResume={resume}
              onReset={reset}
              timeRemaining={timeRemaining}
            />
          </div>
        )}

        {/* History Page */}
        {currentPage === 'history' && appState && (
          <History
            sessions={appState.sessions}
            onClose={() => {}}
            isFullPage={true}
          />
        )}

        {/* Settings Page */}
        {currentPage === 'settings' && appState && (
          <SettingsPanel
            settings={appState.settings}
            onSettingsChange={updateSettings}
            onClose={() => {}}
            onClearHistory={() => clearHistory()}
            isFullPage={true}
          />
        )}
      </main>

      {/* Brand Signature */}
      <BrandSignature />
    </div>
  )
}
