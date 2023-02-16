import { testConnection } from '@infra/database/prisma'
import { logger } from '@utils/logger'
import { cron } from './cron'

async function main() {
  await testConnection()
  cron()
}

main()
  .then(() => {
    logger.success('Server')
  })
  .catch(logger.error)
