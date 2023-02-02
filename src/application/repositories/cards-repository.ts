import { Card } from "@application/entities/card";

export interface CardsRepository{
  findById(id: string): Promise<Card | null>
  findCardsByName(name: string): Promise<Card[]>
  findCardsByCardType(types: string[]): Promise<Card[]>
  findCardsBySetCode(setCode: string): Promise<Card[]>
}