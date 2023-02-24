import { Set } from '@/application/entities/set'
import {
  FindByFiltersProps,
  SetsRepository,
} from '@/application/repositories/sets-repository'

import { prisma } from '..'
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper'
import { PrismaSetsMapper } from '../mappers/prisma-sets-mapper'

export class PrismaSetsRepository implements SetsRepository {
  async findByFilters({ id, code }: FindByFiltersProps): Promise<Set | null> {
    const set = await prisma.set.findFirst({
      where: {
        OR: {
          id,
          code,
        },
      },
    })

    if (set) {
      return PrismaSetsMapper.toDomain(set)
    }

    return null
  }

  async create(data: Set): Promise<{ id: string }> {
    const setCreated = await prisma.set.create({
      data: PrismaSetsMapper.toPrisma(data),
      select: {
        id: true,
      },
    })

    await Promise.all(
      data.cards.map(async (card) => {
        await prisma.card.create({
          data: PrismaCardsMapper.toPrisma(card, setCreated.id),
        })
      }),
    )

    return setCreated
  }
}
