import { type Card } from '@application/entities/card'
import { type Set } from '@application/entities/set'
import { type ApiRepository } from '@application/repositories/api-repository'
import { makeCard } from '@tests/factories/card-factory'

export class InMemoryApiRepository implements ApiRepository {
  private readonly sets: Set[] = []

  private readonly cards: Card[] = []

  constructor() {
    const card = makeCard()
    this.sets.push(card.set)
    this.cards.push(card)
  }

  async getAllSets(): Promise<Set[]> {
    return this.sets
  }

  async getCardsBySetCode(setCode: string): Promise<Card[]> {
    const setDetails = this.sets.find((set) => set.code === setCode)

    if (setDetails == null) {
      throw new Error('set not exists')
    }

    return this.cards.filter((card) => card.setId === setDetails.id)
  }
}
