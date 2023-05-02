import 'reflect-metadata'

import { container } from 'tsyringe'

import { CardsRepository } from './application/repositories/cards-repository'
import { MessagingRepository } from './application/repositories/messaging-repository'
import { SetsRepository } from './application/repositories/sets-repository'
import { PrismaCardsRepository } from './infra/database/prisma/repositories/prisma-cards-repository'
import { PrismaMessagingRepository } from './infra/database/prisma/repositories/prisma-messaging-repository'
import { PrismaSetsRepository } from './infra/database/prisma/repositories/prisma-sets-repository'

container.registerSingleton<SetsRepository>(
  'SetsRepository',
  PrismaSetsRepository,
)

container.registerSingleton<CardsRepository>(
  'CardsRepository',
  PrismaCardsRepository,
)

container.registerSingleton<MessagingRepository>(
  'MessagingRepository',
  PrismaMessagingRepository,
)
