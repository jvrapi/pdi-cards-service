import { container } from 'tsyringe'
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'

import { Set } from '@/application/gql/models/set-model'

import { CardFilters } from '../gql/inputs/card-filters-input'
import { Card } from '../gql/models/card-model'
import {
  FindCardsUseCase,
  type FindCardsUseCaseResponse,
} from '../use-cases/find-cards-use-case'

const { IMAGES_SERVICE_URL } = process.env

@Resolver(() => Card)
export class CardResolver {
  @Query(() => [Card])
  async cards(
    @Arg('cardsFilters', () => CardFilters)
    filters: CardFilters,
  ) {
    const findCardsUseCase = container.resolve(FindCardsUseCase)
    const cards = await findCardsUseCase.execute({ ...filters })
    return cards
  }

  @FieldResolver(() => Set)
  set(@Root() card: FindCardsUseCaseResponse): Set {
    return {
      id: card.set.id,
      code: card.set.code,
      name: card.set.name,
      releasedAt: card.set.releasedAt,
      iconUri: `${IMAGES_SERVICE_URL}/${card.set.id}`,
    }
  }
}
