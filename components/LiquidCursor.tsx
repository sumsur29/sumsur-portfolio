'use client'

import { useEffect, useState } from 'react'

export default function LiquidCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let idCounter = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY }
      setMousePosition(newPos)
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { ...newPos, id: idCounter++ }]
        // Keep only last 12 trail points
        return newTrail.slice(-12)
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Decay trail over time
    const trailDecay = setInterval(() => {
      setTrail(prev => prev.slice(1))
    }, 50)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(trailDecay)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Main liquid blob cursor */}
      <svg
        className="absolute transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 30,
          top: mousePosition.y - 30,
          width: 60,
          height: 60,
        }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>
        <circle
          cx="30"
          cy="30"
          r="12"
          fill="rgba(168, 85, 247, 0.6)"
          filter="url(#goo)"
          className="animate-pulse"
        />
      </svg>

      {/* Trail blobs */}
      {trail.map((point, index) => {
        const opacity = (index / trail.length) * 0.4
        const size = 8 + (index / trail.length) * 4
        
        return (
          <svg
            key={point.id}
            className="absolute"
            style={{
              left: point.x - size,
              top: point.y - size,
              width: size * 2,
              height: size * 2,
              opacity,
            }}
          >
            <circle
              cx={size}
              cy={size}
              r={size}
              fill="rgba(59, 130, 246, 0.5)"
              filter="url(#goo)"
            />
          </svg>
        )
      })}
    </div>
  )
}
