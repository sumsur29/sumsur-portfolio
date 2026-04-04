import Link from 'next/link'
import { articles } from '@/data/articles'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

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

          <div className="article-content">
            <ReactMarkdown 
              components={{
                h1: ({node, ...props}) => <h1 className="text-5xl font-bold mb-8 mt-16 tracking-tight leading-tight text-white" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-4xl font-semibold mb-6 mt-14 tracking-tight text-white border-b border-white/10 pb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-3xl font-semibold mb-5 mt-12 tracking-tight text-white" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-2xl font-semibold mb-4 mt-10 tracking-tight text-white" {...props} />,
                p: ({node, ...props}) => <p className="text-[19px] leading-[1.9] font-light text-white/90 mb-8" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                em: ({node, ...props}) => <em className="italic text-white/95" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400 transition-colors" {...props} />,
                ul: ({node, ...props}) => <ul className="my-8 space-y-3 text-[19px] text-white/90" {...props} />,
                ol: ({node, ...props}) => <ol className="my-8 space-y-3 text-[19px] text-white/90 list-decimal" {...props} />,
                li: ({node, ...props}) => <li className="font-light leading-[1.9] marker:text-white/50" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-white/30 pl-6 italic text-white/80 font-light my-8 py-2" {...props} />,
                hr: ({node, ...props}) => <hr className="border-white/10 my-12" {...props} />,
                code: ({node, inline, ...props}: any) => 
                  inline 
                    ? <code className="text-pink-400 bg-white/5 px-2 py-1 rounded font-mono text-sm" {...props} />
                    : <code className="block bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto my-8 text-sm" {...props} />,
              } as Components}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </article>

      </div>
    </main>
  )
}
