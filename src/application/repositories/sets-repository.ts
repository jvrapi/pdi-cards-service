import { Set } from "@application/entities/set";

export interface SetsRepository {
  findAll(): Promise<Set[]>
}