import { FindCardsUseCase } from '@/application/use-cases/find-cards-use-case'

import { makeCard } from '../factories/card-factory'
import { makeSet } from '../factories/set-factory'
import { InMemoryCardsRepository } from '../repositories/in-memory-cards-repository'

describe('Find cards by set id', () => {
  it('should be able to get cards', async () => {
    const set = makeSet()
    const card = makeCard({ name: 'Creature' })
    card.faces = [makeCard()]
    card.set = set

    const cardsRepository = new InMemoryCardsRepository([card])
    const findCardsUseCase = new FindCardsUseCase(cardsRepository)
    const cards = await findCardsUseCase.execute({
      take: 10,
    })

    expect(cards).toHaveLength(1)
  })

  it('should be able to get cards with name filter', async () => {
    const set = makeSet()
    const firstCard = makeCard({ name: 'Creature' })
    const secondCard = makeCard()
    firstCard.faces = [makeCard()]
    firstCard.set = set
    secondCard.set = set

    const cardsRepository = new InMemoryCardsRepository([firstCard, secondCard])
    const findCardsUseCase = new FindCardsUseCase(cardsRepository)
    const cards = await findCardsUseCase.execute({
      take: 10,
      name: 'creature',
    })

    expect(cards).toHaveLength(1)
  })

  it('should be able to get cards with type filter', async () => {
    const set = makeSet()
    const firstCard = makeCard({ typeLine: 'Creature' })
    const secondCard = makeCard()
    firstCard.faces = [makeCard()]
    firstCard.set = set
    secondCard.set = set

    const cardsRepository = new InMemoryCardsRepository([firstCard, secondCard])
    const findCardsUseCase = new FindCardsUseCase(cardsRepository)
    const cards = await findCardsUseCase.execute({
      take: 10,
      type: 'creature',
    })

    expect(cards).toHaveLength(1)
  })

  it('should be able to get a card by id', async () => {
    const set = makeSet()
    const firstCard = makeCard()
    const secondCard = makeCard()
    firstCard.faces = [makeCard()]
    firstCard.set = set
    secondCard.set = set

    const cardsRepository = new InMemoryCardsRepository([firstCard, secondCard])
    const findCardsUseCase = new FindCardsUseCase(cardsRepository)
    const cards = await findCardsUseCase.execute({
      take: 10,
      id: firstCard.id,
    })

    expect(cards).toHaveLength(1)
  })
})
