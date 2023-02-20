import { SetsRepository } from '@application/repositories/sets-repository'
import { PrismaSetsRepository } from '@infra/database/prisma/repositories/prisma-sets-repository'
import { container } from 'tsyringe'

container.registerSingleton<SetsRepository>(
  'SetsRepository',
  PrismaSetsRepository,
)
