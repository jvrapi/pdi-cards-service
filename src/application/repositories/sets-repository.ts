import { type Set } from '@/application/entities/set'

export interface FindByFiltersProps {
  id?: string
  code?: string
}

export interface SetsRepository {
  create: (set: Set) => Promise<{ id: string }>
  findByFilters: (data: FindByFiltersProps) => Promise<Set | null>
}
