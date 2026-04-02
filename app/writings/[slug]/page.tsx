import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/writings" className="text-white/40 hover:text-white mb-12 inline-block font-light">
          ← Back to Writings
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-widest uppercase text-white/40 font-light">
                {article.category}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/30 font-light">{article.date}</span>
            </div>
            
            <h1 className="text-5xl font-light mb-6 tracking-tight leading-tight">
              {article.title}
            </h1>
            
            <div className="h-px w-16 bg-white/20"></div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-white/70 leading-relaxed font-light text-lg whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
