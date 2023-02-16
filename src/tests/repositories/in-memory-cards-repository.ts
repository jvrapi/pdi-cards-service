import { type Card } from '@application/entities/card'
import { type CardsRepository } from '@application/repositories/cards-repository'

export class InMemoryCardsRepository implements CardsRepository {
  private readonly cards: Card[] = []

  async createCards(cards: Card[]): Promise<void> {
    cards.forEach((card) => {
      this.cards.push(card)
    })
  }
}
