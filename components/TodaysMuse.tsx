'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { poems } from '@/data/poems'
import { articles } from '@/data/articles'

type FeaturedItem = {
  type: 'poem' | 'article' | 'photo'
  title: string
  excerpt?: string
  href: string
  image?: string
  date?: string
}

export default function TodaysMuse() {
  const [featured, setFeatured] = useState<FeaturedItem | null>(null)

  useEffect(() => {
    // Pick item based on day of year for consistent daily rotation
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    
    const allItems: FeaturedItem[] = [
      ...poems.map(p => ({
        type: 'poem' as const,
        title: p.title,
        excerpt: p.text.slice(0, 150) + '...',
        href: `/writings/poems/${p.id}`,
        image: p.image,
        date: p.date,
      })),
      ...articles.slice(0, 5).map(a => ({
        type: 'article' as const,
        title: a.title,
        excerpt: a.excerpt.slice(0, 150) + '...',
        href: `/writings/articles/${a.slug}`,
        date: a.date,
      })),
    ]

    const todaysItem = allItems[dayOfYear % allItems.length]
    setFeatured(todaysItem)
  }, [])

  if (!featured) return null

  return (
    <div className="w-full max-w-5xl mb-12 md:mb-16">
      <Link href={featured.href} className="group block">
        <div className="relative overflow-hidden rounded-lg border border-white/20 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/30 transition-all duration-500">
          
          {/* Background Image if available */}
          {featured.image && (
            <div className="absolute inset-0 z-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
            </div>
          )}

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-light text-white/40 tracking-widest uppercase">
                Today's Muse
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-light text-white/40">
                {featured.type === 'poem' ? '✍️ Poem' : '📝 Article'}
              </span>
              {featured.date && (
                <>
                  <span className="text-white/20">·</span>
                  <span className="text-xs font-light text-white/40">{featured.date}</span>
                </>
              )}
            </div>

            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight group-hover:text-white/90 transition-colors">
              {featured.title}
            </h2>

            {featured.excerpt && (
              <p className="text-white/60 font-light leading-relaxed max-w-3xl line-clamp-2 mb-6">
                {featured.excerpt}
              </p>
            )}

            <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors">
              <span className="text-sm font-light">Read more</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

        </div>
      </Link>
    </div>
  )
}
