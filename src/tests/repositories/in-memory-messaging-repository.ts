import {
  MessagingRepository,
  SyncDataProps,
} from '@/application/repositories/messaging-repository'
import { logger } from '@/utils/logger'

export class InMemoryMessagingRepository implements MessagingRepository {
  async syncData(message: SyncDataProps[]): Promise<void> {
    logger.success('data synced')
  }
}
