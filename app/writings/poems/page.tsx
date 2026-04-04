import Link from 'next/link'
import { poems } from '@/data/poems'

export default function PoemsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <Link href="/writings" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back to Writings
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            Poems
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-6"></div>
          <p className="text-white/60 font-light text-lg">
            Words from the heart
          </p>
        </header>

        <div className="space-y-6">
          {[...poems].reverse().map((poem) => (
            <Link 
              key={poem.id} 
              href={`/writings/poems/${poem.id}`}
              className="group block"
            >
              <div className="border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                <h2 className="text-2xl font-light mb-2 group-hover:text-white/90 transition-colors">
                  {poem.title}
                </h2>
                <p className="text-white/40 text-sm font-light">
                  {poem.language === 'hindi' ? 'हिंदी' : 'English'}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
