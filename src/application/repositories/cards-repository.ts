import { type Card } from '@/application/entities/card'

export interface CardsRepository {
  createCards: (cards: Card[]) => Promise<void>
}
