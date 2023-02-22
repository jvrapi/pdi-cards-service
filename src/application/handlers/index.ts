import { logger } from '@/utils/logger'

import { VerifyHasUpdatesHandler } from './verify-has-updates/verify-has-updates-handler'

export async function verifyHasUpdates() {
  try {
    const verifyHasUpdatesHandler = new VerifyHasUpdatesHandler()

    await verifyHasUpdatesHandler.handle()
  } catch (error) {
    logger.error('Erro na verificação de atualização')
    logger.error(error)
  }
}
