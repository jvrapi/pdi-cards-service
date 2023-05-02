import { container } from 'tsyringe'

import { RabbitMQConnection } from './connection'
import { MessageHandler } from './handlers/message-handler'

export class RabbitMQ {
  static async init() {
    const handler = container.resolve(MessageHandler)
    const queue = process.env.RABBITMQ_CARDS_QUEUE || ''
    const exchange = process.env.RABBITMQ_CARDS_EXCHANGE || ''
    const url = process.env.RABBITMQ_URL || ''

    await RabbitMQConnection.connect({
      exchange,
      messageHandler: handler.handle,
      queue,
      url,
    })
  }
}
