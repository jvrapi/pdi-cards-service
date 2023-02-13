import { Card } from "@application/entities/card";
import { CardsRepository } from "@application/repositories/cards-repository";

export class CreateCardsUseCase {
  constructor(
    private cardsRepository: CardsRepository
  ){}
  async execute(cards: Card[], setId: string){
    try{
      
      await this.cardsRepository.createCards(cards.map(card => {
        card.setId = setId
        return card
      }))
    }catch(error){
      throw new Error(`Erro ao tentar cadastrar as cartas`)
    }
  }
}