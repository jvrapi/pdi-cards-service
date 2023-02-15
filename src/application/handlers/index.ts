import { SdkApiRepository } from "@api/repositories/sdk-api-repository";
import { CreateCardsUseCase } from "@application/use-cases/create-cards-use-case";
import { CreateSetUseCase } from "@application/use-cases/create-set-use-case";
import { VerifyHasUpdatesUseCase } from "@application/use-cases/verify-has-updates-use-case";
import { PrismaCardsRepository } from "@infra/database/prisma/repositories/prisma-cards-repository";
import { PrismaSetsRepository } from "@infra/database/prisma/repositories/prisma-sets-repository";
import { logger } from "@utils/logger";
import { VerifyHasUpdatesHandler } from "./verify-has-updates-handler";

export async function verifyHasUpdates(){
  try{
    const apiRepository = new SdkApiRepository()
    const setsRepository = new PrismaSetsRepository()
    const cardsRepository = new PrismaCardsRepository()
    const verifyHasUpdateUsesCase = new VerifyHasUpdatesUseCase(apiRepository, setsRepository)
    const createSetUseCase = new CreateSetUseCase(setsRepository)
    const createCardsUseCase = new CreateCardsUseCase(cardsRepository)
    const verifyHasUpdatesHandler = new VerifyHasUpdatesHandler(
      verifyHasUpdateUsesCase,
      createSetUseCase,
      createCardsUseCase
    )

    await verifyHasUpdatesHandler.handle()
  }catch(error){
    logger.error('Erro na verificação de atualização')
    logger.error(error)
  }
  
}