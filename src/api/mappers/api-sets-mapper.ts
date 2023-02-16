import { Set } from '@application/entities/set'
import type * as Scry from 'scryfall-sdk'

export class ApiSetsMapper {
  static toDomain(raw: Scry.Set) {
    return new Set(
      {
        name: raw.name,
        code: raw.code,
        isDigital: raw.digital,
        isFoilOnly: raw.foil_only,
        releasedAt: raw.released_at!,
        type: raw.set_type,
      },
      raw.id,
    )
  }
}
