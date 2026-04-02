import articlesData from '@/data/articles.json'

export interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  content: string
}

const articles = articlesData as Article[]

export function getAllArticles(): Article[] {
  return articles
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}
