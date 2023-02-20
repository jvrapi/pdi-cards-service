import { type SetsRepository } from '@application/repositories/sets-repository'
import { makeSet } from '@tests/factories/set-factory'
import { InMemorySetsRepository } from '@tests/repositories/in-memory-sets-repository'

import { CreateSetUseCase } from './create-set-use-case'

describe('Create set use case', () => {
  let setsRepository: SetsRepository
  let createSetUseCase: CreateSetUseCase

  beforeEach(() => {
    setsRepository = new InMemorySetsRepository()
    createSetUseCase = new CreateSetUseCase(setsRepository)
  })

  it('should be able to create a set', async () => {
    const findByCodeSpy = jest.spyOn(setsRepository, 'findByCode')
    const createSpy = jest.spyOn(setsRepository, 'create')
    const set = makeSet()
    await createSetUseCase.execute(set)
    expect(findByCodeSpy).toHaveBeenCalled()
    expect(createSpy).toHaveBeenCalled()
  })

  it('should not be able to create a set with same code', async () => {
    const set = makeSet()

    await setsRepository.create(set)

    const findByCodeSpy = jest.spyOn(setsRepository, 'findByCode')

    const createSpy = jest.spyOn(setsRepository, 'create')

    await expect(createSetUseCase.execute(set)).rejects.toThrowError()
    expect(findByCodeSpy).toHaveBeenCalled()
    expect(createSpy).not.toHaveBeenCalled()
  })
})
