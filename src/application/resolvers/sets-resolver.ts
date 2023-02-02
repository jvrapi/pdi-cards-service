import { Arg, Query, Resolver } from "type-graphql";
import { container } from "tsyringe";
import { GetAllSetsUseCase } from "../use-cases/get-all-sets/get-all-sets-use-case";
import { GetSetsInput } from "@application/gql/inputs/get-sets-input";
import { SetsModel } from "@application/gql/models/sets-model";

@Resolver()
export class SetsResolver {
  @Query(()=> SetsModel)
  async sets(
    @Arg('data', (type) => GetSetsInput) {limit,page}: GetSetsInput  
  ){
    const getAllSetsUseCase = container.resolve(GetAllSetsUseCase)
    const sets = await  getAllSetsUseCase.execute({limit, page})
    return sets
  }
}