import { FindCardsBySetIdUseCase } from '@/application/use-cases/find-cards-by-set-id-use-case'

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
    const findCardsBySetIdUseCase = new FindCardsBySetIdUseCase(cardsRepository)
    const cards = await findCardsBySetIdUseCase.execute({
      setId: set.id,
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
    const findCardsBySetIdUseCase = new FindCardsBySetIdUseCase(cardsRepository)
    const cards = await findCardsBySetIdUseCase.execute({
      setId: set.id,
      name: 'creature',
    })

    expect(cards).toHaveLength(1)
  })
})
