import { type Card as RawCard, type Set as RawSet } from '@prisma/client'

import { Set } from '@/application/entities/set'

import { PrismaCardsMapper } from './prisma-cards-mapper'

type RawResponse = RawSet & {
  cards: (RawCard & {
    faces: RawCard[]
  })[]
}
export class PrismaSetsMapper {
  static toPrisma(set: Set) {
    return {
      code: set.code,
      name: set.name,
      type: set.type,
      releasedAt: set.releasedAt,
      isDigital: set.isDigital,
      isFoilOnly: set.isFoilOnly,
    }
  }

  static toDomain(raw: RawResponse): Set {
    return new Set(
      {
        code: raw.code,
        name: raw.name,
        type: raw.type,
        releasedAt: raw.releasedAt,
        isDigital: raw.isDigital,
        isFoilOnly: raw.isFoilOnly,
        cards: raw.cards.map(PrismaCardsMapper.toDomain),
      },
      raw.id,
    )
  }
}
