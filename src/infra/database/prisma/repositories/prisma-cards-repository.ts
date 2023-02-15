import { Card } from '@application/entities/card';
import { CardsRepository } from '@application/repositories/cards-repository';
import { prisma } from '..';
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper';

export class PrismaCardsRepository implements CardsRepository {
  async createCards(cards: Card[]): Promise<void> {
   await Promise.all(cards.map(async card => {
      await prisma.card.create({
        data: PrismaCardsMapper.toPrisma(card)
      })
   })) 
  }
 
}
