import { inject, injectable } from 'tsyringe'

import { Set } from '../entities/set'
import { type CardsRepository } from '../repositories/cards-repository'

interface Request {
  take: number
  skip?: number
  name?: string
  type?: string
  id?: string
}

interface Face {
  id: string
  name: string
  type: string
  colors: string[]
  imageUri: string
}

export interface FindCardsUseCaseResponse {
  id: string
  name: string
  rarity: string
  type: string
  colors: string[]
  formats: string[]
  versions: string[]
  faces: Face[]
  set: Set
  imageUri: string
}

@injectable()
export class FindCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: CardsRepository,
  ) {}

  async execute({
    name,
    type,
    id,
    take,
    skip,
  }: Request): Promise<FindCardsUseCaseResponse[]> {
    const { IMAGES_SERVICE_URL } = process.env
    const cards = await this.cardsRepository.findByFilters({
      name,
      type,
      id,
      take,
      skip,
    })

    return cards.map((card) => {
      const faces =
        card.faces?.map((face) => {
          const faceModel = {
            id: face.id,
            name: face.name,
            type: face.typeLine ?? '',
            colors: face.colors.map((color) => color.value),
            imageUri: `${IMAGES_SERVICE_URL}/${face.id}`,
          }
          return faceModel
        }) || []

      const cardModel = {
        id: card.id,
        name: card.name,
        rarity: card.rarity ?? '',
        type: card.typeLine ?? '',
        colors: card.colors.map((color) => color.value),
        formats: card.formats.map((format) => format.value),
        versions: card.versions.map((version) => version.value),
        faces,
        set: card.set,
        imageUri: `${IMAGES_SERVICE_URL}/${card.id}`,
      }

      return cardModel
    })
  }
}
