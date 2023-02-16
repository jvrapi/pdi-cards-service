import { type Set } from '@application/entities/set'

export interface SetsRepository {
  findAll: () => Promise<Set[]>
  findByCode: (code: string) => Promise<Set | null>
  create: (set: Set) => Promise<{ id: string }>
}
