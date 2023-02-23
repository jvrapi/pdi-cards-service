import { type Card } from '@/application/entities/card'
import {
  CardsRepository,
  FindBySetIdProps,
} from '@/application/repositories/cards-repository'

export class InMemoryCardsRepository implements CardsRepository {
  private readonly cards: Card[] = []

  constructor(cards: Card[]) {
    this.cards.push(...cards)
  }

  async findBySetId(data: FindBySetIdProps): Promise<Card[]> {
    const { setId, name } = data
    let cards = this.cards.filter((card) => card.set.id === setId)

    if (name) {
      cards = cards.filter((card) =>
        card.name.toLowerCase().includes(name.toLowerCase()),
      )
    }
    return cards
  }
}
