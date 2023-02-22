import { container } from 'tsyringe'
import { Arg, Query, Resolver } from 'type-graphql'

import { SetFilters } from '@/application/gql/inputs/set-filters-input'
import { Set } from '@/application/gql/models/set-model'

import { FindSetUseCase } from '../use-cases/find-set-use-case'

@Resolver()
export class SetResolver {
  @Query(() => Set)
  async set(
    @Arg('filters', () => SetFilters) { id }: SetFilters,
  ): Promise<Set | null> {
    const findSetUseCase = container.resolve(FindSetUseCase)
    const set = await findSetUseCase.execute({ id })
    if (!set) {
      return null
    }
    return set
  }
}
