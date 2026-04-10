export interface Poem {
  id: string
  title: string
  language: 'hindi' | 'english'
  text: string
  image?: string
  date?: string
  context?: string
}

import poemsData from './poems.json'

export const poems: Poem[] = poemsData as Poem[]
