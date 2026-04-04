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
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
            prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
            prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
            prose-p:text-white/85 prose-p:leading-relaxed prose-p:font-light prose-p:mb-6 prose-p:text-[17px]
            prose-a:text-blue-400 prose-a:underline prose-a:decoration-blue-400/30 hover:prose-a:decoration-blue-400 prose-a:font-normal
            prose-strong:text-white prose-strong:font-semibold
            prose-em:text-white/90 prose-em:italic
            prose-code:text-pink-400 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-white/30 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/75 prose-blockquote:font-light prose-blockquote:my-6
            prose-hr:border-white/10 prose-hr:my-8
            prose-ul:text-white/85 prose-ul:my-6 prose-ul:space-y-2
            prose-ol:text-white/85 prose-ol:my-6 prose-ol:space-y-2
            prose-li:font-light prose-li:leading-relaxed prose-li:text-[17px]
            prose-li:marker:text-white/40
            prose-img:rounded-lg prose-img:my-8
            prose-table:border-collapse prose-table:border prose-table:border-white/10
            prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-3 prose-th:text-left prose-th:font-semibold
            prose-td:border prose-td:border-white/10 prose-td:p-3
          ">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>

      </div>
    </main>
  )
}
