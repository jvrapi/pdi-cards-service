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
  }: FindByFiltersProps): Promise<Card[]> {
    const cards = await prisma.card.findMany({
      where: {
        setId,
        faceOfId: null,
        name: name && {
          contains: name,
        },
        typeLine: type && {
          contains: type,
        },
      },
      include: {
        faces: true,
      },
    })

    return cards.map(PrismaCardsMapper.toDomain)
  }
}
