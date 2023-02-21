import { inject, injectable } from 'tsyringe'

import { type Set } from '@/application/entities/set'
import { type SetsRepository } from '@/application/repositories/sets-repository'

@injectable()
export class CreateSetUseCase {
  constructor(
    @inject('SetsRepository')
    private readonly setsRepository: SetsRepository,
  ) {}

  async execute(set: Set) {
    const setAlreadyExists = await this.setsRepository.findByCode(set.code)

    if (setAlreadyExists != null) {
      throw new Error('coleção ja cadastrada')
    }
    return this.setsRepository.create(set)
  }
}
