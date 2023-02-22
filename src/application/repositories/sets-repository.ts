import { type Set } from '@/application/entities/set'

export interface FindAllFilters {
  offset?: number
  limit: number
}

export interface SetsRepository {
  findAll: (filters?: FindAllFilters) => Promise<Set[]>
  findByCode: (code: string) => Promise<Set | null>
  create: (set: Set) => Promise<{ id: string }>
  findById: (id: string) => Promise<Set | null>
}
