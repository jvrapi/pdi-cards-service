import { inject, injectable } from 'tsyringe'

import { MessagingRepository } from '../repositories/messaging-repository'

interface Face {
  id: string
  imageUri: string
  name: string
  manaCost: string | null
  effectText: string | null
  flavorText: string | null
  language: string
  typeLine: string
  setId: string
  colors: string[]
  faceOfId: string
  cmc: number | null
}

interface Card {
  name: string
  language: string
  layout: string | null
  cmc: number | null
  typeLine: string | null
  collectionId: string | null
  frame: string | null
  borderColor: string | null
  manaCost: string | null
  loyalty: string | null
  securityStamp: string | null
  effectText: string | null
  flavorText: string | null
  rarity: string | null
  isReserved: boolean | null
  isReprint: boolean | null
  isVariant: boolean | null
  isFoundInBooster: boolean | null
  isStorySpotlight: boolean | null
  colors: string[]
  formats: string[]
  versions: string[]
  id: string
  setId: string
  imageUri: string | null
  faces: Face[]
}

interface Set {
  id: string
  name: string
  code: string
  isDigital: boolean
  isFoilOnly: boolean
  releasedAt: string
  type: string
  iconUri: string
  cards: Card[]
}

@injectable()
export class InsertNewDataUseCase {
  constructor(
    @inject('MessagingRepository')
    private messageRepository: MessagingRepository,
  ) {}

  async execute(set: Set) {
    await this.messageRepository.updateData(set)
  }
}
