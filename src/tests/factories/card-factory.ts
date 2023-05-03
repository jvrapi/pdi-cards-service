import { Card, type CardProps } from '@/application/entities/card'
import { Color, ColorName } from '@/application/entities/color'
import { Format, FormatName } from '@/application/entities/format'
import { Version, VersionName } from '@/application/entities/version'

export type Override = Partial<CardProps>
export function makeCard(override: Override = {}) {
  const card = new Card({
    name: 'name example',
    borderColor: 'border color example',
    cmc: 1,
    collectionId: '1',
    colors: [new Color(ColorName.B)],
    formats: [new Format({ format: FormatName.standard })],
    versions: [new Version(VersionName.nonFoil)],
    manaCost: 'mana cost example',
    effectText: 'effect text example',
    flavorText: 'flavor text example',
    frame: 'frame example',
    language: 'en',
    layout: 'layout example',
    rarity: 'rare',
    isFoundInBooster: true,
    isReprint: true,
    isReserved: false,
    isStorySpotlight: false,
    isVariant: false,
    loyalty: null,
    securityStamp: null,
    typeLine: 'type line example',
    ...override,
  })

  return card
}
