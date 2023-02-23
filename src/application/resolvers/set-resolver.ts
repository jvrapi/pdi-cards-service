import { container } from 'tsyringe'
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'

import { Set as AppSet } from '@/application/entities/set'
import { SetFilters } from '@/application/gql/inputs/set-filters-input'
import { Set } from '@/application/gql/models/set-model'

import { Card } from '../gql/models/card-model'
import { Face } from '../gql/models/face-model'
import { FindSetUseCase } from '../use-cases/find-set-use-case'

@Resolver(() => Set)
export class SetResolver {
  @Query(() => Set, { nullable: true })
  async set(
    @Arg('filters', () => SetFilters) { id }: SetFilters,
  ): Promise<Set | null> {
    const findSetUseCase = container.resolve(FindSetUseCase)
    const set = await findSetUseCase.execute({ id })
    return set
  }

  @FieldResolver(() => [Card])
  async cards(@Root() set: AppSet) {
    return set?.cards
      .filter((card) => !card.faceOfId)
      .map((card) => {
        const faces =
          card.faces?.map((face) => {
            const faceModel: Face = {
              id: face.id,
              name: face.name,
              type: face.typeLine ?? '',
              colors: face.colors.map((color) => color.value),
            }
            return faceModel
          }) || []

        const cardModel: Card = {
          id: card.id,
          name: card.name,
          rarity: card.rarity ?? '',
          type: card.typeLine ?? '',
          colors: card.colors.map((color) => color.value),
          formats: card.formats.map((format) => format.value),
          versions: card.versions.map((version) => version.value),
          faces,
        }

        return cardModel
      })
  }
}
