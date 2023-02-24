import { Card } from '@/application/entities/card'
import {
  CardsRepository,
  FindByFiltersProps,
} from '@/application/repositories/cards-repository'

import { prisma } from '../'
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper'

export class PrismaCardsRepository implements CardsRepository {
  async findByFilters({
    setId,
    name,
    type,
    id,
  }: FindByFiltersProps): Promise<Card[]> {
    const cards = await prisma.card.findMany({
      where: {
        AND: {
          setId,
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
        faces: true,
      },
    })

    return cards.map(PrismaCardsMapper.toDomain)
  }
}
