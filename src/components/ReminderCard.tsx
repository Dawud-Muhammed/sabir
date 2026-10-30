import type { IslamicReminder } from '../types'

interface ReminderCardProps {
  reminder: IslamicReminder
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  return (
    <div className="bg-emerald-950/30 backdrop-blur-sm border border-amber-200/10 rounded-lg p-6 text-center max-w-lg">
      {reminder.arabicText && (
        <p lang="ar" dir="rtl" className="text-lg font-semibold text-amber-100 mb-3">
          {reminder.arabicText}
        </p>
      )}
      <p className="text-amber-50/90 text-sm leading-relaxed mb-4">
        {reminder.text}
      </p>
      <p className="text-amber-200/50 text-xs">
        {reminder.reference}
      </p>
    </div>
  )
}
