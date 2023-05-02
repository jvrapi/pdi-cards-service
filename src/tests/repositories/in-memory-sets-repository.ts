import { Set } from '@/application/entities/set'
import {
  FindByFiltersProps,
  SetsRepository,
} from '@/application/repositories/sets-repository'

export class InMemorySetsRepository implements SetsRepository {
  private readonly sets: Set[] = []

  async getAll(): Promise<Set[]> {
    return this.sets
  }

  async findByFilters({ code, id }: FindByFiltersProps): Promise<Set | null> {
    const set = this.sets.find((set) => set.id === id || set.code === code)

    if (set == null) {
      return null
    }

    return set
  }
}
