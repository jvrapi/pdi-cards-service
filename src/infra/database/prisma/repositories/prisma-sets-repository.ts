import { Set } from '@/application/entities/set'
import {
  FindAllFilters,
  SetsRepository,
} from '@/application/repositories/sets-repository'

import { prisma } from '..'
import { PrismaSetsMapper } from '../mappers/prisma-sets-mapper'

export class PrismaSetsRepository implements SetsRepository {
  async findAll(filters?: FindAllFilters): Promise<Set[]> {
    const sets = await prisma.set.findMany({
      take: filters?.limit,
      skip: filters?.offset,
    })

    return sets.map(PrismaSetsMapper.toDomain)
  }

  async findByCode(code: string): Promise<Set | null> {
    const set = await prisma.set.findFirst({
      where: {
        code,
      },
    })

    if (set) {
      return PrismaSetsMapper.toDomain(set)
    }

    return null
  }

  async findById(id: string): Promise<Set | null> {
    const set = await prisma.set.findUnique({
      where: {
        id,
      },
    })

    if (set) {
      return PrismaSetsMapper.toDomain(set)
    }

    return null
  }

  async create(data: Set): Promise<{ id: string }> {
    const set = await prisma.set.create({
      data: PrismaSetsMapper.toPrisma(data),
      select: {
        id: true,
      },
    })

    return set
  }
}
