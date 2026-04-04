import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { poems } from '@/data/poems'

export async function generateStaticParams() {
  return poems.map((poem) => ({
    id: poem.id,
  }))
}

export default function PoemPage({ params }: { params: { id: string } }) {
  const poem = poems.find(p => p.id === params.id)
  
  if (!poem) {
    notFound()
  }

  const currentIndex = poems.findIndex(p => p.id === params.id)
  const prevPoem = currentIndex > 0 ? poems[currentIndex - 1] : null
  const nextPoem = currentIndex < poems.length - 1 ? poems[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* Header Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/writings/poems" className="text-white/40 hover:text-white transition-colors">
            ← All Poems
          </Link>
          <div className="flex gap-6">
            {prevPoem && (
              <Link href={`/writings/poems/${prevPoem.id}`} className="text-white/40 hover:text-white transition-colors">
                ← Previous
              </Link>
            )}
            {nextPoem && (
              <Link href={`/writings/poems/${nextPoem.id}`} className="text-white/40 hover:text-white transition-colors">
                Next →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Dual Layout: Image Left, Text Right */}
      <div className="pt-20 min-h-screen flex flex-col lg:flex-row">
        
        {/* Left: Image */}
        {poem.image && (
          <div className="lg:w-1/2 lg:fixed lg:left-0 lg:top-20 lg:bottom-0 relative h-[50vh] lg:h-auto">
            <Image
              src={poem.image}
              alt={poem.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20"></div>
          </div>
        )}

        {/* Right: Text Content */}
        <div className={`lg:w-1/2 ${poem.image ? 'lg:ml-[50%]' : 'mx-auto max-w-3xl'} px-6 lg:px-12 py-16 lg:py-24`}>
          
          <header className="mb-12">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight">
                {poem.title}
              </h1>
              {poem.date && (
                <span className="text-white/30 text-sm font-light mt-2">{poem.date}</span>
              )}
            </div>
            <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-4"></div>
            <p className="text-white/40 text-sm font-light">
              {poem.language === 'hindi' ? 'हिंदी' : 'English'}
            </p>
          </header>

          {poem.context && (
            <div className="mb-12 pb-8 border-b border-white/10">
              <p className="text-white/60 font-light leading-relaxed whitespace-pre-wrap">
                {poem.context}
              </p>
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <pre className={`font-light text-lg lg:text-xl leading-loose whitespace-pre-wrap text-white/90 ${poem.language === 'hindi' ? 'font-devanagari' : ''}`}>
{poem.text}
            </pre>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between">
            {prevPoem ? (
              <Link href={`/writings/poems/${prevPoem.id}`} className="text-white/40 hover:text-white transition-colors">
                <div className="text-xs mb-1">Previous</div>
                <div className="font-light">{prevPoem.title}</div>
              </Link>
            ) : <div></div>}
            
            {nextPoem ? (
              <Link href={`/writings/poems/${nextPoem.id}`} className="text-white/40 hover:text-white transition-colors text-right">
                <div className="text-xs mb-1">Next</div>
                <div className="font-light">{nextPoem.title}</div>
              </Link>
            ) : <div></div>}
          </div>

        </div>

      </div>

    </main>
  )
}
