import { type Card as RawCard, type Set as RawSet } from '@prisma/client'

import { Set } from '@/application/entities/set'

type RawResponse = RawSet & {
  cards?: (RawCard & {
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
    const set = new Set(
      {
        code: raw.code,
        name: raw.name,
        type: raw.type,
        releasedAt: raw.releasedAt,
        isDigital: raw.isDigital,
        isFoilOnly: raw.isFoilOnly,
      },
      raw.id,
    )

    return set
  }
}
