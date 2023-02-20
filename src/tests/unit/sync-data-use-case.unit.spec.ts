import { MessagingRepository } from '@/application/repositories/messaging-repository'
import { SyncDataUseCase } from '@/application/use-cases/sync-data-use-case'

import { makeCard } from '../factories/card-factory'
import { InMemoryMessagingRepository } from '../repositories/in-memory-messaging-repository'

describe('Sync data use case', () => {
  let syncDataUseCase: SyncDataUseCase
  let messagingRepository: MessagingRepository
  beforeEach(() => {
    messagingRepository = new InMemoryMessagingRepository()
    syncDataUseCase = new SyncDataUseCase(messagingRepository)
  })
  it('should be able to sync data', async () => {
    const card = makeCard()
    const cardWithFace = makeCard()
    const face = makeCard()
    cardWithFace.set = card.set
    face.set = card.set
    cardWithFace.faces = [face]

    await expect(
      syncDataUseCase.execute({
        set: card.set,
        cards: [card, cardWithFace],
      }),
    ).resolves.not.toThrowError()
  })
})
