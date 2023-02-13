import { Set } from "@application/entities/set";
import { SetsRepository } from "@application/repositories/sets-repository";

export class CreateSetUseCase {
  constructor(
    private setsRepository: SetsRepository
  ){}
  async execute(set: Set){
    const setAlreadyExists = await this.setsRepository.findByCode(set.code)
    
    if(setAlreadyExists){
      throw new Error('coleção ja cadastrada')
    }
    return await this.setsRepository.create(set)
  }
}