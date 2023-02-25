import { Card } from '@/application/entities/card'
import {
  CardsRepository,
  FindByFiltersProps,
} from '@/application/repositories/cards-repository'

import { prisma } from '../'
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper'

export class PrismaCardsRepository implements CardsRepository {
  async findByFilters({
    name,
    type,
    id,
    take,
    skip,
  }: FindByFiltersProps): Promise<Card[]> {
    const cards = await prisma.card.findMany({
      where: {
        AND: {
          faceOfId: null,
          OR: {
            name: name && {
              contains: name,
            },
            typeLine: type && {
              contains: type,
            },
            id,
          },
        },
      },
      include: {
        set: true,
        faces: true,
      },
      take,
      skip,
    })

    return cards.map(PrismaCardsMapper.toDomain)
  }
}
