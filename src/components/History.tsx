import { X } from 'lucide-react'
import type { FocusSession } from '../types'

interface HistoryProps {
  sessions: FocusSession[]
  onClose: () => void
  isFullPage?: boolean
}

export function History({ sessions, onClose, isFullPage = false }: HistoryProps) {
  const completedSessions = sessions.filter(s => s.completedAt !== null)

  const totalMinutes = completedSessions.reduce((sum, s) => sum + (s.completedAt! - s.startedAt) / 60000, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayMinutes = completedSessions
    .filter(s => new Date(s.completedAt!).getTime() >= today.getTime())
    .reduce((sum, s) => sum + (s.completedAt! - s.startedAt) / 60000, 0)

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

  const recentSessions = completedSessions.slice(-10).reverse()

  return (
    <div className={isFullPage ? "w-full h-full" : "fixed inset-0 z-50 flex items-center justify-center p-4"}>
      {!isFullPage && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />}

      {/* Panel */}
      <div className={isFullPage ? "w-full h-full overflow-y-auto scrollbar-hide" : "relative bg-emerald-950/95 backdrop-blur-md border border-amber-200/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"}>
        {!isFullPage && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-amber-100">Focus History</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-100/10 rounded-lg transition-colors"
              aria-label="Close history"
            >
              <X size={24} className="text-amber-100" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className={isFullPage ? "w-full h-full flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto scrollbar-hide" : ""}>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-amber-600/20 border border-amber-600/30 rounded-lg p-4">
              <p className="text-amber-200/60 text-sm mb-1">Total Sessions</p>
              <p className="text-3xl font-bold text-amber-100">{completedSessions.length}</p>
            </div>

            <div className="bg-amber-600/20 border border-amber-600/30 rounded-lg p-4">
              <p className="text-amber-200/60 text-sm mb-1">Total Time</p>
              <p className="text-3xl font-bold text-amber-100">{Math.round(totalMinutes)}m</p>
            </div>

            <div className="bg-amber-600/20 border border-amber-600/30 rounded-lg p-4">
              <p className="text-amber-200/60 text-sm mb-1">Today</p>
              <p className="text-3xl font-bold text-amber-100">{Math.round(todayMinutes)}m</p>
            </div>

            <div className="bg-amber-600/20 border border-amber-600/30 rounded-lg p-4">
              <p className="text-amber-200/60 text-sm mb-1">Streak</p>
              <p className="text-3xl font-bold text-amber-100">{streak}</p>
            </div>
          </div>

          {/* Recent Sessions */}
          {recentSessions.length > 0 ? (
            <div className="w-full max-w-2xl">
              <h3 className="text-lg font-semibold text-amber-200 mb-4">Recent Sessions</h3>
              <div className="space-y-3">
                {recentSessions.map(session => (
                  <div
                    key={session.id}
                    className="bg-emerald-900/30 border border-amber-200/10 rounded-lg p-4 flex justify-between items-start"
                  >
                    <div className="flex-1">
                      {session.intention && (
                        <p className="text-amber-100 font-medium mb-1">{session.intention}</p>
                      )}
                      <p className="text-amber-200/60 text-sm">
                        {session.duration} minutes • {new Date(session.completedAt!).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-100 font-semibold">
                        {Math.round((session.completedAt! - session.startedAt) / 60000)}m
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-amber-200/60 text-center py-8">
              No completed sessions yet. Start focusing to build your history.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
