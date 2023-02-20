import { inject, injectable } from 'tsyringe'

import { Set } from '@/application/gql/models/set-model'
import { SetsRepository } from '@/application/repositories/sets-repository'

interface Request {
  offset?: number
  limit: number
}

@injectable()
export class FindAllSetsUseCase {
  constructor(
    @inject('SetsRepository')
    private setsRepository: SetsRepository,
  ) {}

  async execute(filters: Request): Promise<Set[]> {
    const sets = await this.setsRepository.findAll(filters)
    return sets
  }
}
