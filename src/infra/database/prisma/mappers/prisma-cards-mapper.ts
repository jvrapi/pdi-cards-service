import { Card } from '@application/entities/card';
import { Card as RawCard, Prisma } from '@prisma/client';
import { PrismaColorsMapper } from './prisma-colors-mapper';
import { PrismaFormatsMapper } from './prisma-formats-mapper';
import { PrismaVersionsMapper } from './prisma-versions-mapper';

export class PrismaCardsMapper {
  static toDomain(raw: RawCard): Card {
    return new Card(
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
        setId: raw.setId,
        colors: PrismaColorsMapper.toDomain(raw.colors as Prisma.JsonArray),
        formats: PrismaFormatsMapper.toDomain(raw.formats as Prisma.JsonArray),
        versions: PrismaVersionsMapper.toDomain(
          raw.versions as Prisma.JsonArray
        )
      },
      raw.id
    );
  }

  static toPrisma(card: Card) {
    return {
      name: card.name,
      rarity: card.rarity,
      cmc: card.cmc ? new Prisma.Decimal(card.cmc) : null,
      borderColor: card.borderColor,
      collectionId: card.collectionId,
      frame: card.frame,
      isFoundInBooster: card.isFoundInBooster,
      isReprint: card.isReprint,
      language: card.language,
      isReserved: card.isReserved,
      isStorySpotlight: card.isStorySpotlight,
      isVariant: card.isVariant,
      layout: card.layout,
      loyalty: card.loyalty,
      manaCost: card.manaCost,
      securityStamp: card.securityStamp,
      effectText: card.effectText,
      flavorText: card.flavorText,
      typeLine: card.typeLine,
      setId: card.setId,
      colors: PrismaColorsMapper.toPrisma(card.colors),
      versions: PrismaVersionsMapper.toPrisma(card.versions),
      formats: PrismaFormatsMapper.toPrisma(card.formats)
    };
  }
}
