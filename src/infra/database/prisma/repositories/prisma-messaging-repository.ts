import { Prisma, Set as PrismaSet } from '@prisma/client'

import {
  Face,
  MessagingRepository,
  Set,
} from '@/application/repositories/messaging-repository'

import { prisma } from '..'

type FaceReduce = Face & {
  versions: string[]
  formats: string[]
}

export class PrismaMessagingRepository implements MessagingRepository {
  async updateData(set: Set): Promise<void> {
    await prisma.set.create({
      data: {
        id: set.id,
        type: set.type,
        name: set.name,
        code: set.code,
        releasedAt: set.releasedAt,
        iconUri: set.iconUri,
        isDigital: set.isDigital,
        isFoilOnly: set.isFoilOnly,
        cards: {
          createMany: {
            data: set.cards.map((card) => ({
              id: card.id,
              name: card.name,
              rarity: card.rarity,
              cmc: card.cmc ? new Prisma.Decimal(card.cmc) : null,
              imageUri: card.imageUri,
              borderColor: card.borderColor,
              collectionId: card.collectionId,
              frame: card.frame,
              isFoundInBooster: card.isFoundInBooster,
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
              isReprint: card.isReprint,
              colors: card.colors.toString(),
              formats: card.formats.toString(),
              versions: card.versions.toString(),
            })),
          },
        },
      },
    })

    const faces = set.cards.reduce<FaceReduce[]>(
      (acc, curr) =>
        acc.concat(
          curr.faces.map((face) => ({
            ...face,
            formats: curr.formats,
            versions: curr.versions,
          })),
        ),
      [],
    )

    await prisma.card.createMany({
      data: faces.map((face) => ({
        ...face,
        formats: face.formats.toString(),
        versions: face.versions.toString(),
        colors: face.colors.toString(),
        cmc: face.cmc ? new Prisma.Decimal(face.cmc) : null,
      })),
    })
  }

  async getAllSetsCode(): Promise<string[]> {
    const sets = await prisma.set.findMany()

    return sets.map((set) => set.code)
  }

  async findSetById(setId: string): Promise<PrismaSet | null> {
    return prisma.set.findUnique({
      where: {
        id: setId,
      },
    })
  }
}
