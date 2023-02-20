import { CreateCardsUseCase } from '@/application/use-cases/create-cards/create-cards-use-case'
import { CreateSetUseCase } from '@/application/use-cases/create-set/create-set-use-case'
import { SyncDataUseCase } from '@/application/use-cases/sync-data/sync-data-use-case'
import { VerifyHasUpdatesUseCase } from '@/application/use-cases/verify-has-updates/verify-has-updates-use-case'
import { logger } from '@/utils/logger'

export class VerifyHasUpdatesHandler {
  constructor(
    private readonly verifyHasUpdateUseCase: VerifyHasUpdatesUseCase,
    private readonly createSetUseCase: CreateSetUseCase,
    private readonly createCardsUseCase: CreateCardsUseCase,
    private readonly syncDataUseCase: SyncDataUseCase,
  ) {}

  async handle() {
    const hasUpdates = await this.verifyHasUpdateUseCase.execute()
    if (hasUpdates.length > 0) {
      logger.message('Atualizações encontradas')
      await Promise.all(
        hasUpdates.map(async ({ set, cards }) => {
          const { id } = await this.createSetUseCase.execute(set)
          await this.createCardsUseCase.execute(cards, id)
          await this.syncDataUseCase.execute({
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
