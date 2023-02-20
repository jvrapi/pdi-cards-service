import { CardsRepository } from '@/application/repositories/cards-repository'
import { CreateCardsUseCase } from '@/application/use-cases/create-cards/create-cards-use-case'

import { makeCard } from '../factories/card-factory'
import { InMemoryCardsRepository } from '../repositories/in-memory-cards-repository'

describe('Create cards use case', () => {
  let cardsRepository: CardsRepository
  let createCardsUseCase: CreateCardsUseCase

  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository()
    createCardsUseCase = new CreateCardsUseCase(cardsRepository)
  })

  it('should be able to create a cards', async () => {
    const createSpy = jest.spyOn(cardsRepository, 'createCards')
    const card = makeCard()
    await createCardsUseCase.execute([card], card.setId)
    expect(createSpy).toHaveBeenCalled()
  })

  it('should be able to get an error when try create card', async () => {
    const createCardsSpy = jest.spyOn(cardsRepository, 'createCards')
    createCardsSpy.mockRejectedValueOnce('error')
    const card = makeCard()

    await expect(
      createCardsUseCase.execute([card], card.setId),
    ).rejects.toThrowError()
  })
})
