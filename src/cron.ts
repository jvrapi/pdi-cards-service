import { verifyHasUpdates } from "@application/handlers"
import nodeCron from 'node-cron'

export function cron(){
  nodeCron.schedule('0 0 * * *', async () => {
    await verifyHasUpdates()
  })
}
