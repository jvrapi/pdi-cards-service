import { testConnection } from '@/infra/database/prisma'
import { logger } from '@/utils/logger'

import { cron } from './cron'
import { initServer } from './server'

async function main() {
  await testConnection()
  cron()
  initServer()
}

main()
  .then(() => {
    logger.success('Server is running 🔥')
  })
  .catch(logger.error)
