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
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-20">
        
        <Link href="/writings/articles" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back to Articles
        </Link>

        <article>
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm tracking-widest uppercase text-white/40 font-light">
                {article.category}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-sm text-white/40 font-light">{article.date}</span>
            </div>
            
            <h1 className="text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-white">
              {article.title}
            </h1>
            
            <div className="h-px w-24 bg-gradient-to-r from-white/30 to-transparent"></div>
          </header>

          <div className="prose prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-headings:leading-tight
            prose-h1:text-5xl prose-h1:mb-8 prose-h1:mt-16 prose-h1:font-bold
            prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-14 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
            prose-h3:text-3xl prose-h3:mb-5 prose-h3:mt-12
            prose-h4:text-2xl prose-h4:mb-4 prose-h4:mt-10
            prose-p:text-white/90 prose-p:leading-[1.8] prose-p:font-light prose-p:mb-8 prose-p:text-[18px]
            prose-a:text-blue-400 prose-a:underline prose-a:decoration-blue-400/30 hover:prose-a:decoration-blue-400 prose-a:transition-colors
            prose-strong:text-white prose-strong:font-semibold
            prose-em:text-white/95 prose-em:italic
            prose-code:text-pink-400 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:my-8
            prose-blockquote:border-l-4 prose-blockquote:border-white/30 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/80 prose-blockquote:font-light prose-blockquote:my-8 prose-blockquote:py-2
            prose-hr:border-white/10 prose-hr:my-12
            prose-ul:text-white/90 prose-ul:my-8 prose-ul:space-y-3 prose-ul:text-[18px]
            prose-ol:text-white/90 prose-ol:my-8 prose-ol:space-y-3 prose-ol:text-[18px]
            prose-li:font-light prose-li:leading-[1.8]
            prose-li:marker:text-white/50
            prose-img:rounded-lg prose-img:my-10
            prose-table:border-collapse prose-table:border prose-table:border-white/10 prose-table:my-8
            prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-4 prose-th:text-left prose-th:font-semibold
            prose-td:border prose-td:border-white/10 prose-td:p-4
          ">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>

      </div>
    </main>
  )
}
