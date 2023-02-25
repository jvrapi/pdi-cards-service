import { Card } from '../entities/card'

export interface FindByFiltersProps {
  take: number
  skip?: number
  name?: string
  type?: string
  id?: string
}
export interface CardsRepository {
  findByFilters(data: FindByFiltersProps): Promise<Card[]>
}
