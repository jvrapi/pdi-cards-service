import nodeCron from 'node-cron'

import { verifyHasUpdates } from '@/application/handlers'

export function cron() {
  nodeCron.schedule('0 0 * * *', verifyHasUpdates)
}
