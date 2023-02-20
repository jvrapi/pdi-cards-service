import { type ApiRepository } from '@application/repositories/api-repository'
import { type SetsRepository } from '@application/repositories/sets-repository'
import { makeSet } from '@tests/factories/set-factory'
import { InMemoryApiRepository } from '@tests/repositories/in-memory-api-repository'
import { InMemorySetsRepository } from '@tests/repositories/in-memory-sets-repository'

import { VerifyHasUpdatesUseCase } from './verify-has-updates-use-case'

describe('Verify has update use case', () => {
  let apiRepository: ApiRepository
  let setsRepository: SetsRepository
  let verifyHasUpdatesUseCase: VerifyHasUpdatesUseCase

  beforeEach(() => {
    apiRepository = new InMemoryApiRepository()
    setsRepository = new InMemorySetsRepository()
    verifyHasUpdatesUseCase = new VerifyHasUpdatesUseCase(
      apiRepository,
      setsRepository,
    )
  })

  it('should be able to get updates', async () => {
    const getAllApiSetsSpy = jest.spyOn(apiRepository, 'getAllSets')
    const getAllAppSetsSpy = jest.spyOn(setsRepository, 'findAll')
    const getAllCardsBySetCodeSpy = jest.spyOn(
      apiRepository,
      'getCardsBySetCode',
    )

    const updates = await verifyHasUpdatesUseCase.execute()

    expect(getAllApiSetsSpy).toHaveBeenCalled()
    expect(getAllAppSetsSpy).toHaveBeenCalled()
    expect(getAllCardsBySetCodeSpy).toHaveBeenCalled()
    expect(updates).toHaveLength(1)
  })

  it('should be able to get no updates', async () => {
    const set = (await apiRepository.getAllSets())[0]
    await setsRepository.create(set)
    const getAllApiSetsSpy = jest.spyOn(apiRepository, 'getAllSets')
    const getAllAppSetsSpy = jest.spyOn(setsRepository, 'findAll')
    const getAllCardsBySetCodeSpy = jest.spyOn(
      apiRepository,
      'getCardsBySetCode',
    )
    const updates = await verifyHasUpdatesUseCase.execute()
    expect(updates).toHaveLength(0)
    expect(getAllApiSetsSpy).toHaveBeenCalled()
    expect(getAllAppSetsSpy).toHaveBeenCalled()
    expect(getAllCardsBySetCodeSpy).not.toHaveBeenCalled()
  })

  it('should be able to get an error with database has more set than api', async () => {
    await setsRepository.create(makeSet())
    await setsRepository.create(makeSet())
    await expect(verifyHasUpdatesUseCase.execute()).rejects.toThrowError()
  })

  it('should not be able to get a cards with an invalid set code', async () => {
    const getAllApiSetsSpy = jest.spyOn(apiRepository, 'getAllSets')
    const getAllAppSetsSpy = jest.spyOn(setsRepository, 'findAll')
    const getAllCardsBySetCodeSpy = jest.spyOn(
      apiRepository,
      'getCardsBySetCode',
    )

    const set = makeSet({
      code: 'wrong-code',
    })

    getAllApiSetsSpy.mockReturnValue(
      new Promise((resolve) => {
        resolve([set])
      }),
    )

    await expect(verifyHasUpdatesUseCase.execute()).rejects.toThrowError()
    expect(getAllApiSetsSpy).toHaveBeenCalled()
    expect(getAllAppSetsSpy).toHaveBeenCalled()
    expect(getAllCardsBySetCodeSpy).toHaveBeenCalled()
  })
})
