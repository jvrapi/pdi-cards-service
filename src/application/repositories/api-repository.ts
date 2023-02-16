import { type Card } from '@application/entities/card'
import { type Set } from '@application/entities/set'

export interface ApiRepository {
  getAllSets: () => Promise<Set[]>
  getCardsBySetCode: (setCode: string) => Promise<Card[]>
}
