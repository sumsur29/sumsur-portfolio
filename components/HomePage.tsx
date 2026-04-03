'use client'

import { useEffect, useState } from 'react'
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

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [quote, setQuote] = useState(quotes[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Pick random quote on mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        
        <header className={`mb-24 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-7xl font-light mb-6 tracking-tight bg-gradient-to-r from-white via-white/90 to-white bg-clip-text">
            Sumeet Surana
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6 animate-pulse-slow"></div>
          <p className="text-xl text-white/60 font-light tracking-wide mb-2 font-devanagari">
            {quote.hindi}
          </p>
          <p className="text-white/40 font-light italic">
            {quote.english}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          
          {/* Photos Card */}
          <Link href="/photos" className="group">
            <div 
              className={`relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-12 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                transitionDelay: '100ms'
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl mb-6 font-light">📸</div>
                <h2 className="text-2xl font-light mb-3 tracking-wide">
                  Photos
                </h2>
                <p className="text-white/50 font-light leading-relaxed">
                  Visual stories
                </p>
              </div>
            </div>
          </Link>

          {/* Poems Card */}
          <Link href="/poems" className="group">
            <div 
              className={`relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-12 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                transitionDelay: '200ms'
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl mb-6 font-light">✍️</div>
                <h2 className="text-2xl font-light mb-3 tracking-wide">
                  Poems
                </h2>
                <p className="text-white/50 font-light leading-relaxed">
                  Words from the heart
                </p>
              </div>
            </div>
          </Link>

          {/* Experiments Card */}
          <Link href="/experiments" className="group">
            <div 
              className={`relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-12 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)`,
                transitionDelay: '300ms'
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl mb-6 font-light">🧪</div>
                <h2 className="text-2xl font-light mb-3 tracking-wide">
                  Experiments
                </h2>
                <p className="text-white/50 font-light leading-relaxed">
                  Side projects and prototypes
                </p>
              </div>
            </div>
          </Link>

        </div>

        <div className={`text-center mb-16 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/about" className="inline-block text-white/60 hover:text-white transition-colors duration-300 font-light">
            About me →
          </Link>
        </div>

        <footer className={`pt-16 border-t border-white/10 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-center gap-12 text-white/40 font-light">
            <a href="https://www.linkedin.com/in/suranasumeet" target="_blank" rel="noopener noreferrer" 
               className="hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
            <a href="https://instagram.com/sum.sur" target="_blank" rel="noopener noreferrer"
               className="hover:text-white transition-colors duration-300">
              Instagram
            </a>
            <a href="mailto:sumeet9surana@gmail.com" 
               className="hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>
        </footer>

      </div>
    </main>
  )
}
