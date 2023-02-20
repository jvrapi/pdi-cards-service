import { Kafka } from 'kafkajs'

import {
  MessagingRepository,
  SyncDataProps,
} from '@/application/repositories/messaging-repository'

const { KAFKA_URL, KAFKA_CLIENT_ID } = process.env

export class KafkaMessagingRepository implements MessagingRepository {
  private kafka: Kafka
  constructor() {
    this.kafka = new Kafka({
      clientId: `${KAFKA_CLIENT_ID}`,
      brokers: [`${KAFKA_URL}`],
    })
  }

  async syncData(message: SyncDataProps[]): Promise<void> {
    const producer = this.kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'cards-sync-data',
      messages: [{ value: JSON.stringify(message) }],
    })
  }
}
