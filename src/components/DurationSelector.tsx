interface DurationSelectorProps {
  options: number[]
  selected: number
  onSelect: (duration: number) => void
  disabled: boolean
}

export function DurationSelector({ options, selected, onSelect, disabled }: DurationSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {options.map(duration => (
        <button
          key={duration}
          onClick={() => onSelect(duration)}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-lg font-semibold transition-all duration-200
            ${selected === duration
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/40'
              : 'bg-amber-100/10 text-amber-100 hover:bg-amber-100/20 border border-amber-100/20'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {duration}m
        </button>
      ))}
    </div>
  )
}
