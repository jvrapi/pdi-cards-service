import { SetsRepository } from '@/application/repositories/sets-repository'
import { FindSetUseCase } from '@/application/use-cases/find-set-use-case'

import { makeSet } from '../factories/set-factory'
import { InMemorySetsRepository } from '../repositories/in-memory-sets-repository'

describe('Find set use case', () => {
  let findSetUseCase: FindSetUseCase
  let setsRepository: SetsRepository

  beforeEach(() => {
    setsRepository = new InMemorySetsRepository()
    findSetUseCase = new FindSetUseCase(setsRepository)
  })

  it('should be able to get set by id', async () => {
    const setProps = makeSet()
    const { id } = await setsRepository.create(setProps)
    const set = await findSetUseCase.execute({ id })
    expect(set).toBeTruthy()
    expect(set).toMatchObject(setProps)
  })
})
