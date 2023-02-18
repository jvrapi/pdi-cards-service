export interface SyncDataProps {
  id: string
  imageUri: string
  type: 'card' | 'set'
}

export interface MessagingRepository {
  syncData(message: SyncDataProps[]): Promise<void>
}
