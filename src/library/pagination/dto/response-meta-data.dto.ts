import { Expose } from 'class-transformer';

export class MetaData {
  @Expose()
  totalCount: number;

  @Expose()
  listCount: number;

  @Expose()
  itemsPerPage: number;

  @Expose()
  totalPages: number;

  @Expose()
  currentPage: number;
}
