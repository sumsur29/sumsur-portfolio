'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LiquidCursor from './LiquidCursor'

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
        className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-xl bg-white/[0.03] p-8 md:p-10 hover:bg-white/[0.06] transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          animation: 'fadeInUp 0.8s ease-out forwards',
          opacity: 0,
          animationDelay: `${index * 150}ms`
        }}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
               background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
             }}
        ></div>
        
        <div className="relative z-10">
          <div className="text-4xl md:text-5xl mb-4 font-light transform group-hover:scale-110 transition-transform duration-300">
            {emoji}
          </div>
          <h2 className="text-xl md:text-2xl font-light mb-2 tracking-wide group-hover:text-white transition-colors">
            {title}
          </h2>
          <p className="text-sm md:text-base text-white/50 font-light leading-relaxed group-hover:text-white/70 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [quote, setQuote] = useState(quotes[0])
  const [mounted, setMounted] = useState(false)
  const [nameChars, setNameChars] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
    setNameChars('Sumeet Surana'.split(''))
  }, [])

  return (
    <>
      <LiquidCursor />
      
      <main className="min-h-screen bg-black text-white relative overflow-y-auto overflow-x-hidden scroll-smooth">
        
        {/* Full-Page Fixed Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/hero-singer.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={95}
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        </div>

        {/* Noise Texture */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.015]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}
        />
        
        {/* Single Page Content */}
        <div className="relative z-20 min-h-full flex flex-col justify-center items-center px-6 py-8 md:py-12">
          
          {/* Compact Header */}
          <header className="text-center mb-8 md:mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal mb-4 tracking-normal font-signature">
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  className="inline-block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent drop-shadow-2xl"
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
            
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4"></div>
            
            <p className={`text-lg sm:text-lg md:text-xl text-white/80 font-light tracking-wide mb-2 font-devanagari drop-shadow-lg transition-all duration-1000 italic ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               style={{ animationDelay: '800ms' }}>
              {quote.hindi}
            </p>
            <p className={`text-base sm:text-base text-white/60 font-light italic drop-shadow-lg transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
               style={{ animationDelay: '1000ms' }}>
              {quote.english}
            </p>
          </header>

          {/* Cards Grid */}
          <div className="w-full max-w-5xl">
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
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

            {/* Footer Links */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/40 font-light text-sm transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                 style={{ animationDelay: '1400ms' }}>
              <Link href="/about" className="magnetic-link hover:text-white transition-colors duration-300">
                About
              </Link>
              <a href="https://www.linkedin.com/in/suranasumeet" target="_blank" rel="noopener noreferrer" 
                 className="magnetic-link hover:text-white transition-colors duration-300">
                LinkedIn
              </a>
              <a href="https://instagram.com/sum.sur" target="_blank" rel="noopener noreferrer"
                 className="magnetic-link hover:text-white transition-colors duration-300">
                Instagram
              </a>
              <a href="mailto:sumeet9surana@gmail.com" 
                 className="magnetic-link hover:text-white transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>

        </div>

      </main>
    </>
  )
}
