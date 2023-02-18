/* eslint-disable camelcase */
import { Card } from '@application/entities/card'
import { Color, ColorName } from '@application/entities/color'
import { Format, type FormatName } from '@application/entities/format'
import { Version, type VersionName } from '@application/entities/version'
import type * as Scry from 'scryfall-sdk'

interface ApiVersion {
  oversized: boolean
  promo: boolean
  textLess: boolean
}

export class ApiCardsMapper {
  static toDomain(raw: Scry.Card): Card {
    const mapper = new ApiCardsMapper()
    const card = new Card({
      name: mapper.getName(raw.name),
      typeLine: mapper.getTypeLine(raw),
      manaCost: raw.mana_cost ?? null,
      borderColor: raw.border_color,
      cmc: raw.cmc ?? null,
      collectionId: raw.collector_number,
      effectText: raw.oracle_text ?? null,
      flavorText: raw.flavor_text ?? null,
      frame: raw.frame,
      isFoundInBooster: raw.booster,
      isReprint: raw.reprint,
      isReserved: raw.reserved,
      isStorySpotlight: raw.story_spotlight,
      isVariant: raw.variation,
      language: raw.lang,
      layout: raw.layout,
      loyalty: raw.layout,
      rarity: raw.rarity,
      securityStamp: raw.security_stamp?.toString() ?? null,
      setId: raw.set_id,
      colors: mapper.parseColors(raw.colors),
      formats: mapper.parseFormats(raw.legalities),
      versions: mapper.parseVersions(raw.finishes, {
        oversized: raw.oversized,
        promo: raw.promo,
        textLess: raw.textless,
      }),
    })

    /* 
      if card has faces, she will use image of first face. 
    */
    if (!mapper.hasCardFaces(raw.name)) {
      card.imageUri = raw.getImageURI('png') ?? null
    }

    card.faces = mapper.getFaces(raw)

    return card
  }

  private getName(name: string) {
    const hasFaces = this.hasCardFaces(name)

    if (!hasFaces) {
      return name.split('//').map((name) => name.trim())[0]
    }

    return name
  }

  private getTypeLine(raw: Scry.Card) {
    let { type_line: typeLine } = raw

    if (typeLine) {
      const cardTypeLineAsArray = raw.type_line
        ?.split('//')
        ?.map((type_line) => type_line.trim())
      if (
        cardTypeLineAsArray.length === 2 &&
        cardTypeLineAsArray[0] === cardTypeLineAsArray[1]
      ) {
        const [cardName1] = cardTypeLineAsArray
        typeLine = cardName1
      }

      return typeLine
    }
    return null
  }

  private parseColors(colors?: Scry.Color[] | null) {
    if (colors == null) {
      return []
    }

    return colors.map((color) => new Color(color as ColorName))
  }

  private parseFormats(legalities: Scry.Legalities) {
    const cardFormats = Object.keys(legalities)
    const formats: Format[] = []

    cardFormats.forEach((format) => {
      const isLegal = legalities[format as keyof typeof Scry.Format] === 'legal'
      formats.push(new Format({ format: format as FormatName, isLegal }))
    })
    return formats.filter((format) => format.isLegal)
  }

  private parseVersions(
    finishes: Array<keyof typeof Scry.CardFinish>,
    apiVersion: ApiVersion,
  ) {
    const versions: Version[] = []
    const finishedValues = Object.values(finishes)
    const apiVersionKeys = Object.keys(apiVersion)

    finishedValues.forEach((value) => {
      if (value === 'foil') {
        versions.push(new Version('foil'))
      }

      if (value === 'nonfoil') {
        versions.push(new Version('nonFoil'))
      }
    })

    apiVersionKeys.forEach((key) => {
      if (apiVersion[key as keyof ApiVersion]) {
        versions.push(new Version(key as VersionName))
      }
    })

    return versions
  }

  private getFaces(card: Scry.Card) {
    if (card.card_faces?.length > 0) {
      const faces = card.card_faces
        .filter(
          (cardFace) => card.name.toLowerCase() !== cardFace.name.toLowerCase(), // get card face with different name of their "parent"
        )
        .filter((cardFace) => {
          const nameAsArray = card.name.split('//').map((name) => name.trim()) // multifaceted cards has '//' in their name to separate both sides

          if (nameAsArray.length === 2) {
            return (
              nameAsArray[0].toLowerCase() !== nameAsArray[1].toLowerCase() // Only return if both card side has different names.
            )
          }
          return cardFace // will return any card if it is not multifaceted
        })
        .map((cardFace) => {
          const face = new Card({
            name: cardFace.name,
            manaCost: cardFace.getCost() ?? null,
            borderColor: null,
            cmc: cardFace.cmc ?? null,
            collectionId: null,
            effectText: cardFace.getText() ?? null,
            flavorText: cardFace.flavor_text ?? null,
            frame: null,
            isFoundInBooster: null,
            isReprint: null,
            isReserved: null,
            isStorySpotlight: null,
            isVariant: null,
            language: card.lang,
            layout: null,
            loyalty: null,
            rarity: null,
            securityStamp: null,
            typeLine: cardFace.type_line,
            setId: card.set_id,
            colors: this.parseColors(cardFace.colors),
            formats: [],
            versions: [],
          })

          face.imageUri = cardFace.getImageURI('png') ?? null

          return face
        })
      return faces
    }

    return []
  }

  private hasCardFaces(cardName: string) {
    const cardNameAsArray = cardName.split('//').map((name) => name.trim())

    return (
      cardNameAsArray.length === 2 && cardNameAsArray[0] !== cardNameAsArray[1]
    )
  }
}
