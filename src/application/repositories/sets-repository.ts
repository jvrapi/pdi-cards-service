import { Set } from "@application/entities/set";

export interface Pagination {
  page: number
  limit: number
}


export interface SetsRepository {
  findAll(filters: Pagination): Promise<Set[]>
  count(): Promise<number>
}