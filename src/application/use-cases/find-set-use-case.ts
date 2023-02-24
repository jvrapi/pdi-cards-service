import { inject, injectable } from 'tsyringe'

import { ApiError } from '../errors/error'
import { SetsRepository } from '../repositories/sets-repository'

interface Filters {
  id?: string
  code?: string
}

@injectable()
export class FindSetUseCase {
  constructor(
    @inject('SetsRepository')
    private setsRepository: SetsRepository,
  ) {}

  async execute({ id, code }: Filters) {
    if (id || code) {
      return this.setsRepository.findByFilters({
        code,
        id,
      })
    }

    throw new ApiError(
      'You should inform at least one filter to get a set details',
    )
  }
}
