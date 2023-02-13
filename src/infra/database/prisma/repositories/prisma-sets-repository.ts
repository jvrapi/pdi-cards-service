import { Set } from '@application/entities/set';
import { SetsRepository } from '@application/repositories/sets-repository';
import { prisma } from '..';
import { PrismaSetsMapper } from '../mappers/prisma-sets-mapper';

export class PrismaSetsRepository implements SetsRepository {
 
  async findAll(): Promise<Set[]> {
    const sets =  await prisma.set.findMany()

    return sets.map(PrismaSetsMapper.toDomain)
  }

  async findByCode(code: string): Promise<Set | null> {
    const set = await prisma.set.findFirst({
      where: {
        code
      }
    })

    if(set){
      return PrismaSetsMapper.toDomain(set)
    }

    return null
  }

  async create(data: Set): Promise<{id: string}> {
    const set = await prisma.set.create({
      data: PrismaSetsMapper.toPrisma(data),
      select: {
        id: true,
      }
    })

    return set
  }
}
