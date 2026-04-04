'use client'

import { useEffect, useState } from 'react'

type ColorMode = 'normal' | 'bw' | 'sepia' | 'blue'

const modes = [
  { id: 'normal' as const, label: 'Color', icon: '🎨' },
  { id: 'bw' as const, label: 'B&W', icon: '⚫' },
  { id: 'sepia' as const, label: 'Sepia', icon: '☕' },
  { id: 'blue' as const, label: 'Blue', icon: '🌊' },
]

export default function ColorModeToggle() {
  const [mode, setMode] = useState<ColorMode>('normal')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem('colorMode') as ColorMode
    if (saved) setMode(saved)
  }, [])

  useEffect(() => {
    // Apply filter to body
    const filters = {
      normal: 'none',
      bw: 'grayscale(100%)',
      sepia: 'sepia(60%) saturate(50%)',
      blue: 'hue-rotate(180deg) saturate(150%)',
    }
    
    document.documentElement.style.filter = filters[mode]
    localStorage.setItem('colorMode', mode)
  }, [mode])

  return (
    <div className="fixed top-20 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
        aria-label="Color mode"
      >
        <span className="text-lg">{modes.find(m => m.id === mode)?.icon}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-14 right-0 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden min-w-[120px]">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors ${
                mode === m.id ? 'bg-white/5 text-white' : 'text-white/70'
              }`}
            >
              <span className="text-base">{m.icon}</span>
              <span className="text-sm font-light">{m.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
