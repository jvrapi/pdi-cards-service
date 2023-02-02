import { PrismaCardsRepository } from "@infra/database/prisma/repositories/prisma-cards-repository";
import { PrismaSetsRepository } from "@infra/database/prisma/repositories/prisma-sets-repository";
import Container from "typedi";


Container.set('CardsRepository', new PrismaCardsRepository())
Container.set('SetsRepository', new PrismaSetsRepository())