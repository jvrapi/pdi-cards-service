import { SetsRepository } from '@/application/repositories/sets-repository'
import { FindAllSetsUseCase } from '@/application/use-cases/find-all-sets-use-case'

import { makeSet } from '../factories/set-factory'
import { InMemorySetsRepository } from '../repositories/in-memory-sets-repository'

describe('Find all sets use case', () => {
  let findAllSetsUseCase: FindAllSetsUseCase
  let setsRepository: SetsRepository

  beforeEach(() => {
    setsRepository = new InMemorySetsRepository()
    findAllSetsUseCase = new FindAllSetsUseCase(setsRepository)
  })

  it('should be able to get all sets with limit 1', async () => {
    await setsRepository.create(makeSet())
    await setsRepository.create(makeSet())
    const sets = await findAllSetsUseCase.execute({ limit: 1 })
    expect(sets).toHaveLength(1)
  })

  it('should be able to get all sets with pagination', async () => {
    const set = makeSet()
    await setsRepository.create(makeSet())
    await setsRepository.create(set)
    await setsRepository.create(makeSet())
    await setsRepository.create(makeSet())
    const sets = await findAllSetsUseCase.execute({ limit: 2, offset: 1 })
    expect(sets).toHaveLength(2)
    expect(sets[0]).toBe(set)
  })
})
