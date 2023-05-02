import { type Set } from '@/application/entities/set'

export interface FindByFiltersProps {
  id?: string
  code?: string
}

export interface SetsRepository {
  findByFilters: (data: FindByFiltersProps) => Promise<Set | null>
}
