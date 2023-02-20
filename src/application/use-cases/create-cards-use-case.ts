import { inject } from 'tsyringe'

import { Card } from '@/application/entities/card'
import { CardsRepository } from '@/application/repositories/cards-repository'

export class CreateCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private readonly cardsRepository: CardsRepository,
  ) {}

  async execute(cards: Card[], setId: string) {
    try {
      await this.cardsRepository.createCards(
        cards.map((card) => {
          card.setId = setId
          card.faces = card.faces?.map((face) => {
            face.setId = setId
            return face
          })
          return card
        }),
      )
    } catch (error) {
      throw new Error('Erro ao tentar cadastrar as cartas')
    }
  }
}
