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

  it('should be able to get a set by id', async () => {
    const setProps = makeSet()
    const { id } = await setsRepository.create(setProps)
    const set = await findSetUseCase.execute({ id })
    expect(set).toBeTruthy()
    expect(set).toMatchObject(setProps)
  })

  it('should be able to get a set by code', async () => {
    const setProps = makeSet()
    await setsRepository.create(setProps)
    const set = await findSetUseCase.execute({ code: setProps.code })
    expect(set).toBeTruthy()
    expect(set).toMatchObject(setProps)
  })

  it('should be able to receive a null with invalid id', async () => {
    const set = await findSetUseCase.execute({ id: 'wrong-id' })
    expect(set).toBeNull()
  })

  it('should not be able to get a set with no filter', async () => {
    await expect(findSetUseCase.execute({})).rejects.toThrowError()
  })
})
