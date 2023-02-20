import { SetFilters } from '@application/gql/inputs/set-filters-input'
import { Set } from '@application/gql/models/set-model'
import { FindAllSetsUseCase } from '@application/use-cases/find-all-sets-use-case'
import { container } from 'tsyringe'
import { Arg, Query, Resolver } from 'type-graphql'

@Resolver()
export class SetResolver {
  @Query(() => [Set])
  async sets(@Arg('filters', () => SetFilters) filters: SetFilters) {
    const findAllSetsUseCase = container.resolve(FindAllSetsUseCase)
    const sets = await findAllSetsUseCase.execute(filters)
    return sets
  }
}
