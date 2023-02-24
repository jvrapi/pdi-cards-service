import { Card } from '../entities/card'

export interface FindByFiltersProps {
  setId: string
  name?: string
  type?: string
  id?: string
}
export interface CardsRepository {
  findByFilters(data: FindByFiltersProps): Promise<Card[]>
}
