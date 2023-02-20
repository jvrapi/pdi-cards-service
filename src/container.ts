import 'reflect-metadata'

import { container } from 'tsyringe'

import { CardsRepository } from './application/repositories/cards-repository'
import { MessagingRepository } from './application/repositories/messaging-repository'
import { SetsRepository } from './application/repositories/sets-repository'
import { PrismaCardsRepository } from './infra/database/prisma/repositories/prisma-cards-repository'
import { PrismaSetsRepository } from './infra/database/prisma/repositories/prisma-sets-repository'
import { KafkaMessagingRepository } from './infra/messaging/kafka/repositories/kafka-messaging-repository'

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
  KafkaMessagingRepository,
)
