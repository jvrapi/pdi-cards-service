import amqplib from 'amqplib'
import { container, injectable } from 'tsyringe'

import { GetAllSetsUseCase } from '@/application/use-cases/get-all-sets-use-case'
import { InsertNewDataUseCase } from '@/application/use-cases/insert-new-data-use-case'

interface Message {
  pattern: string
  data: any
}

@injectable()
export class MessageHandler {
  async handle(
    message: amqplib.ConsumeMessage | null,
    channel: amqplib.Channel,
  ) {
    try {
      if (message) {
        const messageToString = message?.content.toString()

        const { pattern, data } = JSON.parse(messageToString) as Message

        if (pattern === 'get-all-sets') {
          const getAllSetsUseCase = container.resolve(GetAllSetsUseCase)
          const allSetsCodes = await getAllSetsUseCase.execute()
          const message: Message = {
            pattern: 'all-sets-codes',
            data: allSetsCodes,
          }
          const updaterQueue = process.env.RABBITMQ_UPDATER_QUEUE || ''
          const messageBuffer = Buffer.from(JSON.stringify(message))
          channel.assertQueue(updaterQueue, { durable: false })
          channel.sendToQueue(updaterQueue, messageBuffer)
        }

        if (pattern === 'new-sets') {
          const insertData = container.resolve(InsertNewDataUseCase)
          await insertData.execute(data)
        }

        channel.ack(message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
