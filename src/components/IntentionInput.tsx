import type { ChangeEvent } from 'react'

interface IntentionInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function IntentionInput({ value, onChange, placeholder = 'What will you focus on?', disabled = false }: IntentionInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full max-w-md px-4 py-3 rounded-lg
        bg-emerald-950/30 backdrop-blur-sm
        border border-amber-200/20
        text-amber-50 placeholder-amber-200/40
        focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      lang="en"
    />
  )
}
