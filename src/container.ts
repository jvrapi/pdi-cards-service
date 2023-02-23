import 'reflect-metadata'

import { container } from 'tsyringe'

import { CardsRepository } from './application/repositories/cards-repository'
import { SetsRepository } from './application/repositories/sets-repository'
import { PrismaCardsRepository } from './infra/database/prisma/repositories/prisma-cards-repository'
import { PrismaSetsRepository } from './infra/database/prisma/repositories/prisma-sets-repository'

container.registerSingleton<SetsRepository>(
  'SetsRepository',
  PrismaSetsRepository,
)

container.registerSingleton<CardsRepository>(
  'CardsRepository',
  PrismaCardsRepository,
)
