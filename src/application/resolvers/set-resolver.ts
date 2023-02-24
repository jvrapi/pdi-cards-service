import { container } from 'tsyringe'
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'

import { Set as AppSet } from '@/application/entities/set'
import { SetFilters } from '@/application/gql/inputs/set-filters-input'
import { Set } from '@/application/gql/models/set-model'

import { CardFilters } from '../gql/inputs/card-filters-input'
import { Card } from '../gql/models/card-model'
import { FindCardsBySetIdUseCase } from '../use-cases/find-cards-by-set-id-use-case'
import { FindSetUseCase } from '../use-cases/find-set-use-case'

@Resolver(() => Set)
export class SetResolver {
  @Query(() => Set, { nullable: true })
  async set(
    @Arg('setFilters', () => SetFilters) { id, code }: SetFilters,
  ): Promise<Set | null> {
    const findSetUseCase = container.resolve(FindSetUseCase)
    const set = await findSetUseCase.execute({ id, code })
    return set
  }

  @FieldResolver(() => [Card])
  async cards(
    @Root()
    { id: setId }: AppSet,
    @Arg('cardsFilters', () => CardFilters, { nullable: true })
    filters?: CardFilters,
  ) {
    const findCardsBySetIdUseCase = container.resolve(FindCardsBySetIdUseCase)
    return findCardsBySetIdUseCase.execute({ setId, ...filters })
  }
}
