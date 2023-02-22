import { inject, injectable } from 'tsyringe'

import { SetsRepository } from '../repositories/sets-repository'

interface Filters {
  id: string
}

@injectable()
export class FindSetUseCase {
  constructor(
    @inject('SetsRepository')
    private setsRepository: SetsRepository,
  ) {}

  async execute({ id }: Filters) {
    if (id) {
      return this.setsRepository.findById(id)
    }

    return null
  }
}
