export interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  content: string
}

import articlesData from './articles.json'

export const articles = articlesData as Article[]
