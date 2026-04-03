'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const quotes = [
  {
    hindi: 'सफ़र ख़ूबसूरत है मंज़िल से भी',
    english: 'The journey is more beautiful than the destination'
  },
  {
    hindi: 'ख़ुद से मिलने की ख़्वाहिश में, मैं दुनिया भर में घूमता हूँ',
    english: 'Wishing to meet myself, I wander the entire world'
  },
  {
    hindi: 'ख़्वाब वो नहीं जो नींद में आए, ख़्वाब वो है जो सोने न दे',
    english: "Dreams aren't what come in sleep, dreams are what don't let you sleep"
  },
  {
    hindi: 'अनुभव सारे संभव तरीकों से जीवन को',
    english: 'Experience life in all possible ways'
  }
]

interface CardProps {
  href: string
  title: string
  emoji: string
  description: string
  index: number
  gradient: string
}

function GlassmorphicCard({ href, title, emoji, description, index, gradient }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <Link href={href} className="group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-xl bg-white/[0.03] p-12 hover:bg-white/[0.06] transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(${index * 4}px)`,
          transitionDelay: `${index * 100}ms`,
          animation: 'fadeInUp 0.8s ease-out forwards',
          opacity: 0,
          animationDelay: `${index * 150}ms`
        }}
      >
        {/* Glassmorphic gradient blob */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 ${gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
               background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
             }}
        ></div>
        
        <div className="relative z-10">
          <div className="text-5xl mb-6 font-light transform group-hover:scale-110 transition-transform duration-300">
            {emoji}
          </div>
          <h2 className="text-2xl font-light mb-3 tracking-wide group-hover:text-white transition-colors">
            {title}
          </h2>
          <p className="text-white/50 font-light leading-relaxed group-hover:text-white/70 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [quote, setQuote] = useState(quotes[0])
  const [mounted, setMounted] = useState(false)
  const [nameChars, setNameChars] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
    setNameChars('Sumeet Surana'.split(''))

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Cursor spotlight effect */}
      <div 
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)',
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        
        <header className="mb-24 text-center">
          {/* Staggered character reveal for name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6 tracking-tight">
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="inline-block bg-gradient-to-r from-white via-white/90 to-white bg-clip-text"
                style={{
                  animation: 'fadeInChar 0.5s ease-out forwards',
                  opacity: 0,
                  animationDelay: `${i * 50}ms`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6 animate-pulse-slow"></div>
          
          {/* Quote with word-by-word reveal */}
          <p className={`text-lg sm:text-xl text-white/60 font-light tracking-wide mb-2 font-devanagari transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
             style={{ animationDelay: '800ms' }}>
            {quote.hindi}
          </p>
          <p className={`text-white/40 font-light italic transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
             style={{ animationDelay: '1000ms' }}>
            {quote.english}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <GlassmorphicCard
            href="/photos"
            title="Photos"
            emoji="📸"
            description="Visual stories"
            index={0}
            gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
          />
          
          <GlassmorphicCard
            href="/poems"
            title="Poems"
            emoji="✍️"
            description="Words from the heart"
            index={1}
            gradient="bg-gradient-to-br from-purple-500 to-pink-500"
          />
          
          <GlassmorphicCard
            href="/experiments"
            title="Experiments"
            emoji="🧪"
            description="Side projects and prototypes"
            index={2}
            gradient="bg-gradient-to-br from-green-500 to-emerald-500"
          />
        </div>

        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
             style={{ animationDelay: '1200ms' }}>
          <Link href="/about" className="magnetic-link inline-block text-white/60 hover:text-white transition-colors duration-300 font-light relative group">
            <span className="relative z-10">About me →</span>
            <span className="absolute inset-0 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>

        <footer className={`pt-16 border-t border-white/10 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: '1400ms' }}>
          <div className="flex justify-center gap-12 text-white/40 font-light">
            <a href="https://www.linkedin.com/in/suranasumeet" target="_blank" rel="noopener noreferrer" 
               className="magnetic-link relative group hover:text-white transition-colors duration-300">
              <span className="relative z-10">LinkedIn</span>
              <span className="absolute inset-0 -inset-x-2 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a href="https://instagram.com/sum.sur" target="_blank" rel="noopener noreferrer"
               className="magnetic-link relative group hover:text-white transition-colors duration-300">
              <span className="relative z-10">Instagram</span>
              <span className="absolute inset-0 -inset-x-2 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a href="mailto:sumeet9surana@gmail.com" 
               className="magnetic-link relative group hover:text-white transition-colors duration-300">
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 -inset-x-2 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
        </footer>

      </div>
    </main>
  )
}
