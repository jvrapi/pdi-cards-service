import * as Scry from 'scryfall-sdk'

import { ApiSetsMapper } from '@/api/mappers/api-sets-mapper'
import { type Set } from '@/application/entities/set'
import { VerifyHasUpdatesHandler } from '@/application/handlers/verify-has-updates/verify-has-updates-handler'
import { SetsRepository } from '@/application/repositories/sets-repository'
import { prisma } from '@/infra/database/prisma'
import { PrismaSetsRepository } from '@/infra/database/prisma/repositories/prisma-sets-repository'

describe('Verify has update handler', () => {
  let verifyHasUpdatesHandler: VerifyHasUpdatesHandler
  let setsRepository: SetsRepository
  let set: Set

  beforeEach(async () => {
    await prisma.card.deleteMany()
    await prisma.set.deleteMany()
    setsRepository = new PrismaSetsRepository()

    verifyHasUpdatesHandler = new VerifyHasUpdatesHandler()
    const allSetsSpy = jest.spyOn(Scry.Sets, 'all')
    const apiSet = await Scry.Sets.byId('3963badb-c147-489a-95a7-6520a2960bf6')
    allSetsSpy.mockReturnValue(
      new Promise((resolve) => {
        resolve([apiSet])
      }),
    )
    set = ApiSetsMapper.toDomain(apiSet)
  })

  it('should be able to get updates', async () => {
    await expect(verifyHasUpdatesHandler.handle()).resolves.not.toThrowError()
    const sets = await setsRepository.findAll()
    expect(sets).toHaveLength(1)
  })

  it('should not be able to get updates', async () => {
    await setsRepository.create(set)
    await expect(verifyHasUpdatesHandler.handle()).resolves.not.toThrowError()
    const sets = await setsRepository.findAll()
    expect(sets).toHaveLength(1)
  })

  it('should be able to get an error with database has more set than api', async () => {
    const apiSet = await Scry.Sets.byId('16c10b7c-f1f5-432f-a54d-ca76cf262c6d')
    const appSet = ApiSetsMapper.toDomain(apiSet)
    await setsRepository.create(set)
    await setsRepository.create(appSet)

    await expect(verifyHasUpdatesHandler.handle()).rejects.toThrowError()
  })
})
