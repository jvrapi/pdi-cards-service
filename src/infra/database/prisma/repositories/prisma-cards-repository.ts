import { Card } from '@application/entities/card';
import { CardsRepository } from '@application/repositories/cards-repository';
import { prisma } from '..';
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper';

export class PrismaCardsRepository implements CardsRepository {
  findCardsByName(name: string): Promise<Card[]> {
    throw new Error('Method not implemented.');
  }
  findCardsByCardType(types: string[]): Promise<Card[]> {
    throw new Error('Method not implemented.');
  }
  findCardsBySetCode(setCode: string): Promise<Card[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Card> {
    throw new Error('Method not implemented.');
  }
 
}
