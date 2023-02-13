import { Card } from "@application/entities/card";
import { CardsRepository } from "@application/repositories/cards-repository";

export class InMemoryCardsRepository implements CardsRepository {
  private cards: Card[] = []
  async createCards(cards: Card[]): Promise<void> {
    cards.forEach(card => {
      this.cards.push(card)
    })
  }

}