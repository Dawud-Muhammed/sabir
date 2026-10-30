import { X } from 'lucide-react'
import type { UserSettings, Environment } from '../types'

interface SettingsPanelProps {
  settings: UserSettings
  onSettingsChange: (settings: UserSettings) => void
  onClose: () => void
  onClearHistory?: () => void
  isFullPage?: boolean
}

const ENVIRONMENTS: { value: Environment; label: string }[] = [
  { value: 'rainy-courtyard', label: 'Rainy Courtyard' },
  { value: 'green-garden', label: 'Green Garden' },
  { value: 'dawn', label: 'Dawn' },
  { value: 'moonlit-sanctuary', label: 'Moonlit Sanctuary' }
]

export function SettingsPanel({ settings, onSettingsChange, onClose, onClearHistory, isFullPage = false }: SettingsPanelProps) {
  const handleEnvironmentChange = (env: Environment) => {
    onSettingsChange({ ...settings, environment: env })
  }

  const handleBrightnessChange = (brightness: number) => {
    onSettingsChange({ ...settings, brightness })
  }

  const handleMotionToggle = () => {
    onSettingsChange({ ...settings, motion: !settings.motion })
  }

  const handleAudioToggle = () => {
    onSettingsChange({ ...settings, enableAudio: !settings.enableAudio })
  }

  const handleNotificationsToggle = () => {
    onSettingsChange({ ...settings, notifications: !settings.notifications })
  }

  return (
    <div className={isFullPage ? "w-full h-full" : "fixed inset-0 z-50 flex items-center justify-center p-4"}>
      {!isFullPage && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />}

      {/* Panel */}
      <div className={isFullPage ? "w-full h-full overflow-y-auto scrollbar-hide" : "relative bg-emerald-950/95 backdrop-blur-md border border-amber-200/20 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"}>
        {!isFullPage && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-amber-100">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-100/10 rounded-lg transition-colors"
              aria-label="Close settings"
            >
              <X size={24} className="text-amber-100" />
            </button>
          </div>
        )}

        <div className={isFullPage ? "w-full h-full overflow-y-auto scrollbar-hide p-6 md:p-12" : ""}>
          <div className="space-y-6 max-w-md">
          {/* Environment */}
          <div>
            <label className="block text-sm font-semibold text-amber-200 mb-3">
              Environment
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ENVIRONMENTS.map(env => (
                <button
                  key={env.value}
                  onClick={() => handleEnvironmentChange(env.value)}
                  className={`
                    p-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${settings.environment === env.value
                      ? 'bg-amber-600 text-white'
                      : 'bg-emerald-900/50 text-amber-100 hover:bg-emerald-900/70'
                    }
                  `}
                >
                  {env.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brightness */}
          <div>
            <label className="block text-sm font-semibold text-amber-200 mb-3">
              Brightness: {settings.brightness}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Motion */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-amber-200">
              Motion Effects
            </label>
            <button
              onClick={handleMotionToggle}
              className={`
                relative w-12 h-6 rounded-full transition-colors
                ${settings.motion ? 'bg-amber-600' : 'bg-emerald-900/50'}
              `}
            >
              <div
                className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                  transition-transform ${settings.motion ? 'translate-x-6' : ''}
                `}
              />
            </button>
          </div>

          {/* Audio */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-amber-200">
              Ambient Audio
            </label>
            <button
              onClick={handleAudioToggle}
              className={`
                relative w-12 h-6 rounded-full transition-colors
                ${settings.enableAudio ? 'bg-amber-600' : 'bg-emerald-900/50'}
              `}
            >
              <div
                className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                  transition-transform ${settings.enableAudio ? 'translate-x-6' : ''}
                `}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-amber-200">
              Notifications
            </label>
            <button
              onClick={handleNotificationsToggle}
              className={`
                relative w-12 h-6 rounded-full transition-colors
                ${settings.notifications ? 'bg-amber-600' : 'bg-emerald-900/50'}
              `}
            >
              <div
                className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                  transition-transform ${settings.notifications ? 'translate-x-6' : ''}
                `}
              />
            </button>
          </div>

          {/* Clear History */}
          {onClearHistory && (
            <div className="pt-4 border-t border-amber-200/10">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
                    onClearHistory()
                  }
                }}
                className="w-full px-4 py-2 rounded-lg bg-red-950/30 hover:bg-red-950/50 text-red-200 font-medium transition-colors"
              >
                Clear History
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
