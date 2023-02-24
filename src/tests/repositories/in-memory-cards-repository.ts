import { type Card } from '@/application/entities/card'
import {
  CardsRepository,
  FindByFiltersProps,
} from '@/application/repositories/cards-repository'

export class InMemoryCardsRepository implements CardsRepository {
  private readonly cards: Card[] = []

  constructor(cards: Card[]) {
    this.cards.push(...cards)
  }

  async findByFilters(data: FindByFiltersProps): Promise<Card[]> {
    const { setId, name, type, id } = data
    let cards = this.cards.filter((card) => card.set.id === setId)

    if (name) {
      cards = cards.filter((card) =>
        card.name.toLowerCase().includes(name.toLowerCase()),
      )
    }

    if (type) {
      cards = cards.filter((card) =>
        card.typeLine?.toLowerCase().includes(type.toLowerCase()),
      )
    }

    if (id) {
      cards = cards.filter((card) => card.id === id)
    }
    return cards
  }
}
