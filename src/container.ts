import 'reflect-metadata'

import { container } from 'tsyringe'

import { SetsRepository } from '@/application/repositories/sets-repository'
import { PrismaSetsRepository } from '@/infra/database/prisma/repositories/prisma-sets-repository'

container.registerSingleton<SetsRepository>(
  'SetsRepository',
  PrismaSetsRepository,
)
