import { type CreateCardsUseCase } from '@application/use-cases/create-cards-use-case'
import { type CreateSetUseCase } from '@application/use-cases/create-set-use-case'
import { type VerifyHasUpdatesUseCase } from '@application/use-cases/verify-has-updates-use-case'
import { logger } from '@utils/logger'

export class VerifyHasUpdatesHandler {
  constructor(
    private readonly verifyHasUpdateUseCase: VerifyHasUpdatesUseCase,
    private readonly createSetUseCase: CreateSetUseCase,
    private readonly createCardsUseCase: CreateCardsUseCase,
  ) {}

  async handle() {
    const hasUpdates = await this.verifyHasUpdateUseCase.execute()
    if (hasUpdates.length > 0) {
      logger.message('Atualizações encontradas')
      await Promise.all(
        hasUpdates.map(async ({ set, cards }) => {
          const { id } = await this.createSetUseCase.execute(set)
          await this.createCardsUseCase.execute(cards, id)
          // todo: send message to another's services to sync data
        }),
      )
    } else {
      logger.success('Sem atualizações')
    }
  }
}
