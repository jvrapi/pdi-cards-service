import { type ApiRepository } from '@application/repositories/api-repository'
import { type SetsRepository } from '@application/repositories/sets-repository'

export class VerifyHasUpdatesUseCase {
  constructor(
    private readonly apiRepository: ApiRepository,
    private readonly setsRepository: SetsRepository,
  ) {}

  async execute() {
    const apiSets = await this.apiRepository.getAllSets()
    const appSets = await this.setsRepository.findAll()

    if (appSets.length === apiSets.length) {
      return []
    }

    if (appSets.length > apiSets.length) {
      throw new Error(
        'Numero de coleções cadastradas é maior que o disponível na api!',
      )
    }

    const newSets = apiSets.filter(
      (apiSet) => !appSets.some((set) => apiSet.code === set.code),
    )

    const updates = await Promise.all(
      newSets.map(async (set) => {
        const setCards = await this.apiRepository.getCardsBySetCode(set.code)
        return {
          set,
          cards: setCards,
        }
      }),
    )
    return updates
  }
}
