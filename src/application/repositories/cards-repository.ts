import { Card } from '../entities/card'

export interface FindBySetIdProps {
  setId: string
  name?: string
}
export interface CardsRepository {
  findBySetId(data: FindBySetIdProps): Promise<Card[]>
}
