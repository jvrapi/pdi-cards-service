import { Card, type CardProps } from '@application/entities/card'
import { Color } from '@application/entities/color'
import { Format } from '@application/entities/format'
import { Version } from '@application/entities/version'

import { makeSet } from './set-factory'

type Override = Partial<CardProps>
export function makeCard(override: Override = {}) {
  const set = makeSet()
  const card = new Card({
    name: 'name example',
    borderColor: 'border color example',
    cmc: 1,
    collectionId: '1',
    colors: [new Color('B')],
    formats: [new Format({ format: 'standard' })],
    versions: [new Version('nonFoil')],
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
    setId: set.id,
    typeLine: 'type line example',
    ...override,
  })

  card.set = set

  return card
}
