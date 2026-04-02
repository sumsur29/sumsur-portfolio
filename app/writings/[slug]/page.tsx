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

        <article className="article-content">
          <header className="mb-16">
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

          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-4xl font-light mb-10 mt-16 tracking-tight" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-3xl font-light mb-8 mt-16 tracking-tight border-b border-white/10 pb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-light mb-6 mt-12 tracking-tight" {...props} />,
              p: ({node, ...props}) => <p className="text-white/70 leading-loose mb-8 font-light text-lg" {...props} />,
              strong: ({node, ...props}) => <strong className="text-white font-medium" {...props} />,
              em: ({node, ...props}) => <em className="text-white/80 italic" {...props} />,
              ul: ({node, ...props}) => <ul className="my-8 list-disc pl-6 space-y-3" {...props} />,
              ol: ({node, ...props}) => <ol className="my-8 list-decimal pl-6 space-y-3" {...props} />,
              li: ({node, ...props}) => <li className="text-white/70 font-light leading-relaxed" {...props} />,
              a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 no-underline" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-white/20 pl-6 italic text-white/60 my-8" {...props} />,
              code: ({node, ...props}) => <code className="text-white/90 bg-white/10 px-1 rounded" {...props} />,
              hr: ({node, ...props}) => <hr className="border-white/10 my-16" {...props} />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  )
}
