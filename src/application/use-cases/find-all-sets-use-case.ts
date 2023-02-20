import { Set } from '@/application/gql/models/set-model'
import { SetsRepository } from '@/application/repositories/sets-repository'
import { inject, injectable } from 'tsyringe'

interface Request {
  id?: string
  code?: string
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
