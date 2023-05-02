import amqplib from 'amqplib'

type MessageHandler = (
  msg: amqplib.ConsumeMessage | null,
  channel: amqplib.Channel,
) => any

interface ConnectionOptions {
  url: string
  queue: string
  exchange: string
  messageHandler: MessageHandler
}

export class RabbitMQConnection {
  static async connect({
    exchange,
    messageHandler,
    queue,
    url,
  }: ConnectionOptions) {
    const queueOptions: amqplib.Options.AssertQueue = {
      durable: false,
    }
    const conn = await amqplib.connect(url)
    const channel = await conn.createChannel()
    await channel.assertExchange(exchange, 'direct', { durable: false })
    await channel.assertQueue(queue, queueOptions)
    await channel.consume(queue, (msg) => {
      messageHandler(msg, channel)
    })
  }
}
