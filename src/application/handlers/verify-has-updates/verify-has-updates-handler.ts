import { container } from 'tsyringe'

import { CreateCardsUseCase } from '@/application/use-cases/create-cards-use-case'
import { CreateSetUseCase } from '@/application/use-cases/create-set-use-case'
import { SyncDataUseCase } from '@/application/use-cases/sync-data-use-case'
import { VerifyHasUpdatesUseCase } from '@/application/use-cases/verify-has-updates-use-case'
import { logger } from '@/utils/logger'

export class VerifyHasUpdatesHandler {
  async handle() {
    const verifyHasUpdateUseCase = container.resolve(VerifyHasUpdatesUseCase)
    const createSetUseCase = container.resolve(CreateSetUseCase)
    const createCardsUseCase = container.resolve(CreateCardsUseCase)
    const syncDataUseCase = container.resolve(SyncDataUseCase)
    const hasUpdates = await verifyHasUpdateUseCase.execute()
    if (hasUpdates.length > 0) {
      logger.message('Atualizações encontradas')
      await Promise.all(
        hasUpdates.map(async ({ set, cards }) => {
          const { id } = await createSetUseCase.execute(set)
          await createCardsUseCase.execute(cards, id)
          await syncDataUseCase.execute({
            set,
            cards,
          })
        }),
      )
    } else {
      logger.success('Sem atualizações')
    }
  }
}
