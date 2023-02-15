import { verifyHasUpdates } from "@application/handlers"
import { testConnection } from "@infra/database/prisma"
import nodeCron from 'node-cron'
import { cron } from "./cron"

async function main(){
  await testConnection()
  cron()
}


main()

