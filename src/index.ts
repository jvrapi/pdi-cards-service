import { verifyHasUpdates } from "@application/handlers"
import nodeCron from 'node-cron'

async function main(){
  nodeCron.schedule('0 0 * * *', async () => {
    await verifyHasUpdates()
  })
}


main()

