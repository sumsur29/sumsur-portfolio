import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export default function Writings() {
  const articles = getAllArticles()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="text-white/40 hover:text-white mb-12 inline-block font-light">
          ← Back
        </Link>

        <div className="mb-20">
          <h1 className="text-6xl font-light mb-4 tracking-tight">Writings</h1>
          <div className="h-px w-16 bg-white/20 mb-6"></div>
          <p className="text-white/50 font-light text-lg">Essays, reflections, and thoughts</p>
        </div>

        <div className="space-y-16">
          {articles.map((article) => (
            <article key={article.id} className="group border-b border-white/5 pb-16 last:border-0">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs tracking-widest uppercase text-white/40 font-light">
                  {article.category}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-white/30 font-light">{article.date}</span>
              </div>
              
              <h2 className="text-3xl font-light mb-4 tracking-tight group-hover:text-white/80 transition-colors">
                <Link href={`/writings/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              
              <p className="text-white/50 leading-relaxed mb-6 font-light text-lg">
                {article.excerpt}
              </p>
              
              <Link 
                href={`/writings/${article.slug}`}
                className="text-white/40 hover:text-white inline-flex items-center gap-2 font-light tracking-wide text-sm transition-colors"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
