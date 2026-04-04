import Link from 'next/link'
import { articles } from '@/data/articles'

export default function Articles() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <Link href="/writings" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back to Writings
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            Articles
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-6"></div>
          <p className="text-white/60 font-light text-lg">
            Essays, reflections, and thoughts
          </p>
        </header>

        <div className="space-y-12">
          {[...articles].reverse().map((article) => (
            <Link
              key={article.slug}
              href={`/writings/articles/${article.slug}`}
              className="block group"
            >
              <article className="border-b border-white/5 pb-12 last:border-0">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs tracking-widest uppercase text-white/30 font-light">
                    {article.category}
                  </span>
                  <span className="text-white/10">·</span>
                  <span className="text-xs text-white/30 font-light">{article.date}</span>
                </div>
                
                <h2 className="text-3xl font-light mb-4 tracking-tight group-hover:text-white/80 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-white/50 font-light leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
