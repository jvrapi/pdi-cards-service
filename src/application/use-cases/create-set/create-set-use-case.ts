import { type Set } from '@/application/entities/set'
import { type SetsRepository } from '@/application/repositories/sets-repository'

export class CreateSetUseCase {
  constructor(private readonly setsRepository: SetsRepository) {}

  async execute(set: Set) {
    const setAlreadyExists = await this.setsRepository.findByCode(set.code)

    if (setAlreadyExists != null) {
      throw new Error('coleção ja cadastrada')
    }
    return this.setsRepository.create(set)
  }
}
