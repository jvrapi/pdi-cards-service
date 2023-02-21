import * as Scry from 'scryfall-sdk'

import { ApiCardsMapper } from '@/api/mappers/api-cards-mapper'
import { ApiSetsMapper } from '@/api/mappers/api-sets-mapper'
import { type Card } from '@/application/entities/card'
import { type Set } from '@/application/entities/set'
import { type ApiRepository } from '@/application/repositories/api-repository'

export class SdkApiRepository implements ApiRepository {
  async getAllSets(): Promise<Set[]> {
    const sets = await Scry.Sets.all()
    return sets.map(ApiSetsMapper.toDomain)
  }

  async getCardsBySetCode(setCode: string): Promise<Card[]> {
    const set = await Scry.Sets.byCode(setCode)
    const cards = await set.getCards()
    return cards.map(ApiCardsMapper.toDomain)
  }
}
