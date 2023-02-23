import { type Card as RawCard, Prisma } from '@prisma/client'

import { Card } from '@/application/entities/card'

import { PrismaColorsMapper } from './prisma-colors-mapper'
import { PrismaFormatsMapper } from './prisma-formats-mapper'
import { PrismaVersionsMapper } from './prisma-versions-mapper'

type RawResponse = RawCard & {
  faces?: RawCard[]
}

export class PrismaCardsMapper {
  static toDomain(raw: RawResponse): Card {
    const card = new Card(
      {
        name: raw.name,
        rarity: raw.rarity,
        cmc: Number(raw.cmc),
        borderColor: raw.borderColor,
        collectionId: raw.collectionId,
        frame: raw.frame,
        isFoundInBooster: raw.isFoundInBooster,
        language: raw.language,
        isReserved: raw.isReserved,
        isStorySpotlight: raw.isStorySpotlight,
        isVariant: raw.isVariant,
        layout: raw.layout,
        loyalty: raw.loyalty,
        manaCost: raw.manaCost,
        securityStamp: raw.securityStamp,
        effectText: raw.effectText,
        flavorText: raw.flavorText,
        typeLine: raw.typeLine,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        isReprint: raw.isReprint,
        colors: PrismaColorsMapper.toDomain(raw.colors as Prisma.JsonArray),
        formats: PrismaFormatsMapper.toDomain(raw.formats as Prisma.JsonArray),
        versions: PrismaVersionsMapper.toDomain(
          raw.versions as Prisma.JsonArray,
        ),
      },
      raw.id,
    )

    if (raw.faces) {
      card.faces = raw.faces.map((face) => {
        return new Card({
          name: face.name,
          rarity: face.rarity,
          cmc: Number(face.cmc),
          borderColor: face.borderColor,
          collectionId: face.collectionId,
          frame: face.frame,
          isFoundInBooster: face.isFoundInBooster,
          language: face.language,
          isReserved: face.isReserved,
          isStorySpotlight: face.isStorySpotlight,
          isVariant: face.isVariant,
          layout: face.layout,
          loyalty: face.loyalty,
          manaCost: face.manaCost,
          securityStamp: face.securityStamp,
          effectText: face.effectText,
          flavorText: face.flavorText,
          typeLine: face.typeLine,
          createdAt: face.createdAt,
          updatedAt: face.updatedAt,
          isReprint: face.isReprint,
          colors: PrismaColorsMapper.toDomain(face.colors as Prisma.JsonArray),
          formats: PrismaFormatsMapper.toDomain(
            face.formats as Prisma.JsonArray,
          ),
          versions: PrismaVersionsMapper.toDomain(
            face.versions as Prisma.JsonArray,
          ),
        })
      })
    }

    if (raw.faceOfId) {
      card.faceOfId = raw.faceOfId
    }

    return card
  }

  static toPrisma(card: Card, setId: string) {
    return {
      colors: PrismaColorsMapper.toPrisma(card.colors),
      formats: PrismaFormatsMapper.toPrisma(card.formats),
      versions: PrismaVersionsMapper.toPrisma(card.versions),
      language: card.language,
      name: card.name,
      borderColor: card.borderColor,
      cmc: card.cmc !== null ? new Prisma.Decimal(card.cmc) : null,
      collectionId: card.collectionId,
      effectText: card.effectText,
      flavorText: card.flavorText,
      isFoundInBooster: card.isFoundInBooster,
      isReprint: card.isReprint,
      isReserved: card.isReprint,
      isVariant: card.isVariant,
      layout: card.layout,
      isStorySpotlight: card.isStorySpotlight,
      loyalty: card.loyalty,
      manaCost: card.manaCost,
      rarity: card.rarity,
      securityStamp: card.securityStamp,
      typeLine: card.typeLine,
      setId,
      faces: card.faces && {
        createMany: {
          data: card.faces.map((face) => ({
            colors: PrismaColorsMapper.toPrisma(face.colors),
            formats: [],
            versions: [],
            language: face.language,
            name: face.name,
            borderColor: face.borderColor,
            cmc: face.cmc,
            collectionId: face.collectionId,
            effectText: face.effectText,
            flavorText: face.flavorText,
            isFoundInBooster: face.isFoundInBooster,
            isReprint: face.isReprint,
            isReserved: face.isReprint,
            isVariant: face.isVariant,
            layout: face.layout,
            isStorySpotlight: face.isStorySpotlight,
            loyalty: face.loyalty,
            manaCost: face.manaCost,
            rarity: face.rarity,
            securityStamp: face.securityStamp,
            typeLine: face.typeLine,
            setId,
          })),
        },
      },
    }
  }
}
