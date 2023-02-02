import { Set } from '@application/entities/set';
import { Pagination, SetsRepository } from '@application/repositories/sets-repository';
import { prisma } from '..';
import { PrismaSetsMapper } from '../mappers/prisma-sets-mapper';

export class PrismaSetsRepository implements SetsRepository {
  async findAll({limit,page}: Pagination): Promise<Set[]> {
    const sets =  await prisma.set.findMany({
      take: limit,
      skip: (page - 1) * limit,
    })

    return sets.map(PrismaSetsMapper.toDomain)
  }

  count(): Promise<number> {
    return prisma.set.count()
  }
}
