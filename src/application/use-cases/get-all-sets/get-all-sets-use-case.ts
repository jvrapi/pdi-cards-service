
import { GraphQLSetsMapper } from "@application/gql/mappers/graphql-sets-mapper";
import { SetsRepository } from "@application/repositories/sets-repository";
import { PaginationProvider } from "src/providers/pagination-provider";
import { inject, injectable } from "tsyringe";


interface GetAllSetsUseCaseRequest {
  limit?: number
  page?: number
}

@injectable()
export class GetAllSetsUseCase{

  constructor(
    @inject('SetsRepository')
    private setsRepository: SetsRepository
  ){}
  async execute({limit = 50, page = 1}: GetAllSetsUseCaseRequest){
    const sets = await this.setsRepository.findAll({limit,page})
    const setsCount = await this.setsRepository.count()
    const setsFormatted = sets.map(GraphQLSetsMapper.toResponse)

    return PaginationProvider.paginate({
      data: [setsFormatted, setsCount],
      page,
      limit
    })

   
  }
}