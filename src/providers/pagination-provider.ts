export interface PaginationControls {
  totalItems: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

interface Paginated<T> {
  items: T[];
  pagination: PaginationControls;
}

interface Paginate<T> {
  data: [T[], number];
  page: number;
  limit: number;
}

export class PaginationProvider {
  static paginate<T>({data, page, limit}: Paginate<T>): Paginated<T>{
    const [items, totalItems] = data
    const lastPage = Math.ceil(totalItems/ limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      items,
      pagination: {
        totalItems,
        currentPage: page,
        nextPage,
        prevPage,
        lastPage,
      }
    }
  }
}