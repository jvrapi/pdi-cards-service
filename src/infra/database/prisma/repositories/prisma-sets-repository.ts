import { Set } from '@application/entities/set';
import { SetsRepository } from '@application/repositories/sets-repository';

export class PrismaSetsRepository implements SetsRepository {
  findAll(): Promise<Set[]> {
    throw new Error('Method not implemented.');
  }
}
