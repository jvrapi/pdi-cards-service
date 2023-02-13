import { CreateCardsUseCase } from "@application/use-cases/create-cards/create-cards-use-case";
import { CreateSetUseCase } from "@application/use-cases/create-set/create-set-use-case";
import { VerifyHasUpdatesUseCase } from "@application/use-cases/verify-has-updates/verify-has-updates-use-case";

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
        await Promise.all(hasUpdates.map(async ({set, cards}) => {
          const {id} = await this.createSetUseCase.execute(set)
          await this.createCardsUseCase.execute(cards, id)
          // todo: send message to another's services to sync data
        }))
      }
    } catch(error){
      throw error
    }
    
  }
}