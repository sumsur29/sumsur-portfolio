import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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

          <div className="prose prose-invert prose-lg max-w-none 
                          prose-headings:font-light prose-headings:tracking-tight
                          prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
                          prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                          prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                          prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light
                          prose-strong:text-white prose-strong:font-medium
                          prose-em:text-white/80 prose-em:italic
                          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                          prose-li:text-white/70 prose-li:mb-2 prose-li:font-light
                          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                          prose-blockquote:border-l-2 prose-blockquote:border-white/20 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/60
                          prose-code:text-white/90 prose-code:bg-white/10 prose-code:px-1 prose-code:rounded
                          prose-hr:border-white/10 prose-hr:my-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  )
}
