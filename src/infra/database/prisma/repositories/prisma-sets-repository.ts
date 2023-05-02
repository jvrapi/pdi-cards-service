import { Set } from '@/application/entities/set'
import {
  FindByFiltersProps,
  SetsRepository,
} from '@/application/repositories/sets-repository'

import { prisma } from '..'
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
}
