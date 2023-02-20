import { type Set } from '@/application/entities/set'
import {
  FindAllFilters,
  type SetsRepository,
} from '@/application/repositories/sets-repository'

export class InMemorySetsRepository implements SetsRepository {
  private readonly sets: Set[] = []

  async findAll(filters?: FindAllFilters): Promise<Set[]> {
    let sets = this.sets

    if (filters) {
      sets = sets.slice(0, filters.limit)

      if (filters.offset) {
        sets = this.sets.slice(filters.offset, filters.limit + filters.offset)
      }
    }
    return sets
  }

  async findByCode(code: string): Promise<Set | null> {
    const set = this.sets.find((set) => set.code === code)

    if (set == null) {
      return null
    }

    return set
  }

  async create(set: Set): Promise<{ id: string }> {
    this.sets.push(set)
    return {
      id: set.id,
    }
  }
}
