import Link from 'next/link'
import { articles } from '@/data/articles'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        
        <Link href="/writings/articles" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back to Articles
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-widest uppercase text-white/30 font-light">
                {article.category}
              </span>
              <span className="text-white/10">·</span>
              <span className="text-xs text-white/30 font-light">{article.date}</span>
            </div>
            
            <h1 className="text-5xl font-light mb-6 tracking-tight leading-tight">
              {article.title}
            </h1>
            
            <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent"></div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-light prose-headings:tracking-tight
            prose-p:text-white/80 prose-p:leading-relaxed prose-p:font-light
            prose-a:text-white prose-a:underline prose-a:decoration-white/30 hover:prose-a:decoration-white
            prose-strong:text-white prose-strong:font-normal
            prose-em:text-white/90
            prose-code:text-white/90 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-l-white/20 prose-blockquote:text-white/70 prose-blockquote:font-light
            prose-hr:border-white/10
            prose-ul:text-white/80 prose-ol:text-white/80
            prose-li:font-light
          ">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>

      </div>
    </main>
  )
}
