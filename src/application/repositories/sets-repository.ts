import { type Set } from '@/application/entities/set'

export interface SetsRepository {
  create: (set: Set) => Promise<{ id: string }>
  findById: (id: string) => Promise<Set | null>
}
