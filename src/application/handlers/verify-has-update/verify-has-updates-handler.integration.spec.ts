import * as Scry from 'scryfall-sdk'
import { SdkApiRepository } from "@api/repositories/sdk-api-repository"
import { ApiRepository } from "@application/repositories/api-repository"
import { CardsRepository } from "@application/repositories/cards-repository"
import { SetsRepository } from "@application/repositories/sets-repository"
import { CreateCardsUseCase } from "@application/use-cases/create-cards/create-cards-use-case"
import { CreateSetUseCase } from "@application/use-cases/create-set/create-set-use-case"
import { VerifyHasUpdatesUseCase } from "@application/use-cases/verify-has-updates/verify-has-updates-use-case"
import { PrismaCardsRepository } from "@infra/database/prisma/repositories/prisma-cards-repository"
import { PrismaSetsRepository } from "@infra/database/prisma/repositories/prisma-sets-repository"
import { VerifyHasUpdatesHandler } from "./verify-has-updates-handler"
import { clear } from 'console'
import { ApiSetsMapper } from '@api/mappers/api-sets-mapper'
import { prisma } from '@infra/database/prisma'
import { Set } from '@application/entities/set'

describe('Verify has update handler', () => {
  let apiRepository: ApiRepository
  let setsRepository: SetsRepository
  let cardsRepository: CardsRepository
  let verifyHasUpdatesHandler: VerifyHasUpdatesHandler
  let verifyHasUpdatesUseCase: VerifyHasUpdatesUseCase
  let createSetUseCase: CreateSetUseCase
  let createCardsUseCase: CreateCardsUseCase
  let set: Set

  beforeEach(async () => {
    await prisma.card.deleteMany()
    await prisma.set.deleteMany()
    apiRepository = new SdkApiRepository()
    setsRepository = new PrismaSetsRepository()
    cardsRepository = new PrismaCardsRepository() 
    verifyHasUpdatesUseCase = new VerifyHasUpdatesUseCase(
      apiRepository,
      setsRepository
    )
    createSetUseCase = new CreateSetUseCase(setsRepository)
    createCardsUseCase = new CreateCardsUseCase(cardsRepository)

    verifyHasUpdatesHandler = new VerifyHasUpdatesHandler(
      verifyHasUpdatesUseCase,
      createSetUseCase,
      createCardsUseCase
    )
    const allSetsSpy = jest.spyOn(Scry.Sets, 'all')
    const apiSet = await Scry.Sets.byId("3963badb-c147-489a-95a7-6520a2960bf6")
    allSetsSpy.mockReturnValue(new Promise(resolve => resolve([apiSet])))
    set = ApiSetsMapper.toDomain(apiSet)

  })

  it('should be able to get updates', async () => {
    const getAllApiSetsSpy = jest.spyOn(apiRepository, 'getAllSets')
    const getAllAppSetsSpy = jest.spyOn(setsRepository, 'findAll')
    const getAllCardsBySetCodeSpy = jest.spyOn(apiRepository, 'getCardsBySetCode')
    const createSetUseCaseSpy = jest.spyOn(createSetUseCase, 'execute')
    const createCardsUseCaseSpy = jest.spyOn(createCardsUseCase, 'execute')
    const VerifyHasUpdatesUseCaseSpy = jest.spyOn(verifyHasUpdatesUseCase, 'execute')

    await verifyHasUpdatesHandler.handle()
    
    expect(getAllApiSetsSpy).toHaveBeenCalled()
    expect(getAllAppSetsSpy).toHaveBeenCalled()
    expect(getAllCardsBySetCodeSpy).toHaveBeenCalled()

    expect(createSetUseCaseSpy).toHaveBeenCalled()
    expect(createCardsUseCaseSpy).toHaveBeenCalled()
    expect(VerifyHasUpdatesUseCaseSpy).toHaveBeenCalled()
  })

  it('should not be able to get updates', async () => {
    const getAllApiSetsSpy = jest.spyOn(apiRepository, 'getAllSets')
    const getAllAppSetsSpy = jest.spyOn(setsRepository, 'findAll')
    const getAllCardsBySetCodeSpy = jest.spyOn(apiRepository, 'getCardsBySetCode')
    const createSetUseCaseSpy = jest.spyOn(createSetUseCase, 'execute')
    const createCardsUseCaseSpy = jest.spyOn(createCardsUseCase, 'execute')
    const VerifyHasUpdatesUseCaseSpy = jest.spyOn(verifyHasUpdatesUseCase, 'execute')

    await setsRepository.create(set)
    await verifyHasUpdatesHandler.handle()
    
    expect(getAllApiSetsSpy).toHaveBeenCalled()
    expect(getAllAppSetsSpy).toHaveBeenCalled()
    expect(getAllCardsBySetCodeSpy).not.toHaveBeenCalled()

    expect(VerifyHasUpdatesUseCaseSpy).toHaveBeenCalled()
    expect(createSetUseCaseSpy).not.toHaveBeenCalled()
    expect(createCardsUseCaseSpy).not.toHaveBeenCalled()
  })

  it('should be able to get an error with database has more set than api', async () => {
    const apiSet = await Scry.Sets.byId("16c10b7c-f1f5-432f-a54d-ca76cf262c6d")
    const appSet = ApiSetsMapper.toDomain(apiSet)
    await setsRepository.create(set)
    await setsRepository.create(appSet)

    await expect(verifyHasUpdatesHandler.handle()).rejects.toThrowError()
  })

})