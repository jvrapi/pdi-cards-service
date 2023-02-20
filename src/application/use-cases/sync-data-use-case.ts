import { inject } from 'tsyringe'

import { Card } from '@/application/entities/card'
import { Set } from '@/application/entities/set'
import {
  MessagingRepository,
  SyncDataProps,
} from '@/application/repositories/messaging-repository'

interface SyncDataUseCaseProps {
  set: Set
  cards: Card[]
}

export class SyncDataUseCase {
  constructor(
    @inject('MessagingRepository')
    private messagingRepository: MessagingRepository,
  ) {}

  async execute({ set, cards }: SyncDataUseCaseProps) {
    const messageProps: SyncDataProps[] = []

    messageProps.push({
      id: set.id,
      imageUri: set.imageUri,
      type: 'set',
    })

    cards.forEach((card) => {
      messageProps.push({
        id: card.id,
        imageUri: card.imageUri ?? '',
        type: 'card',
      })
      if (card.faces?.length > 0) {
        card.faces.forEach((face) => {
          messageProps.push({
            id: face.id,
            imageUri: face.imageUri ?? '',
            type: 'card',
          })
        })
      }
    })

    await this.messagingRepository.syncData(messageProps)
  }
}
