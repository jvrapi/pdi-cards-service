import type * as Scry from 'scryfall-sdk'

import { Set } from '@/application/entities/set'

export class ApiSetsMapper {
  static toDomain(raw: Scry.Set) {
    const set = new Set(
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

    set.imageUri = raw.icon_svg_uri

    return set
  }
}
