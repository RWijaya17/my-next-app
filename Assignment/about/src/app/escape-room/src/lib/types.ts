export type Scenario = {
    id: number
    mode: 'court' | 'escape'
    text: string
    difficulty: 'easy' | 'medium' | 'hard'
    createdAt: string // ISO date
  }
  