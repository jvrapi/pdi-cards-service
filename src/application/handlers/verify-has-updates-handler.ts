import { CreateCardsUseCase } from "@application/use-cases/create-cards-use-case"
import { CreateSetUseCase } from "@application/use-cases/create-set-use-case"
import { VerifyHasUpdatesUseCase } from "@application/use-cases/verify-has-updates-use-case"
import { logger } from "@utils/logger"


export class VerifyHasUpdatesHandler {
  constructor(
    private verifyHasUpdateUseCase: VerifyHasUpdatesUseCase,
    private createSetUseCase: CreateSetUseCase,
    private createCardsUseCase: CreateCardsUseCase 
  ){}
  async handle(){
    try {
      const hasUpdates = await this.verifyHasUpdateUseCase.execute()
      if(hasUpdates.length){
        logger.message('Atualizações encontradas')
        await Promise.all(hasUpdates.map(async ({set, cards}) => {
          const {id} = await this.createSetUseCase.execute(set)
          await this.createCardsUseCase.execute(cards, id)
          // todo: send message to another's services to sync data
        }))
      }else {
        logger.success('Sem atualizações')
      }
    } catch(error){
      throw error
    }
    
  }
}