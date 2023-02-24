import { inject, injectable } from 'tsyringe'

import { Card } from '../gql/models/card-model'
import { Face } from '../gql/models/face-model'
import { CardsRepository } from '../repositories/cards-repository'

interface Request {
  setId: string
  name?: string
  type?: string
}

@injectable()
export class FindCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: CardsRepository,
  ) {}

  async execute({ setId, name, type }: Request) {
    const cards = await this.cardsRepository.findByFilters({
      setId,
      name,
      type,
    })
    return cards.map((card) => {
      const faces =
        card.faces?.map((face) => {
          const faceModel: Face = {
            id: face.id,
            name: face.name,
            type: face.typeLine ?? '',
            colors: face.colors.map((color) => color.value),
          }
          return faceModel
        }) || []

      const cardModel: Card = {
        id: card.id,
        name: card.name,
        rarity: card.rarity ?? '',
        type: card.typeLine ?? '',
        colors: card.colors.map((color) => color.value),
        formats: card.formats.map((format) => format.value),
        versions: card.versions.map((version) => version.value),
        faces,
      }

      return cardModel
    })
  }
}
