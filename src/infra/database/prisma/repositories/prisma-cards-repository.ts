import { Card } from '@/application/entities/card'
import {
  CardsRepository,
  FindBySetIdProps,
} from '@/application/repositories/cards-repository'

import { prisma } from '../'
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper'

export class PrismaCardsRepository implements CardsRepository {
  async findBySetId({ setId, name }: FindBySetIdProps): Promise<Card[]> {
    const cards = await prisma.card.findMany({
      where: {
        setId,
        faceOfId: null,
        name: name && {
          contains: name,
        },
      },
      include: {
        faces: true,
      },
    })

    return cards.map(PrismaCardsMapper.toDomain)
  }
}
