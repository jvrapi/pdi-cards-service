import {
  MessagingRepository,
  SyncDataProps,
} from '@/application/repositories/messaging-repository'
import { Kafka } from 'kafkajs'

export class KafkaMessagingRepository implements MessagingRepository {
  private kafka: Kafka
  constructor() {
    this.kafka = new Kafka({
      clientId: 'cards-service',
      brokers: ['localhost:9092'],
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
