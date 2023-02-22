import { type Set } from '@/application/entities/set'
import { type SetsRepository } from '@/application/repositories/sets-repository'

export class InMemorySetsRepository implements SetsRepository {
  private readonly sets: Set[] = []

  async findById(id: string): Promise<Set | null> {
    const set = this.sets.find((set) => set.id === id)

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
