import {
  FindManyOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary Repository & queryBuilder Pagination
 */
export class Pagination {
  public static async queryBuilderExecute<T>(
    query: SelectQueryBuilder<T>,
    page: number = 1,
    limit: number = 10,
    route: string = '',
  ) {
    const totalCount = await query.getCount();
    const list = await query
      .limit(limit)
      .offset((page - 1) * limit)
      .getMany();
    return Pagination.createPaginateResult(
      totalCount,
      list,
      page,
      limit,
      route,
    );
  }

  public static async repositoryExecute<T>(
    repository: Repository<T>,
    page: number = 1,
    limit: number = 10,
    route: string = '',
    queryOptions?: FindManyOptions<T>,
  ) {
    const _queryOptions = queryOptions || {};
    const totalCount = await repository.count(_queryOptions);
    _queryOptions.take = limit;
    _queryOptions.skip = (page - 1) * limit;
    const list = await repository.find(_queryOptions);
    return Pagination.createPaginateResult(
      totalCount,
      list,
      page,
      limit,
      route,
    );
  }

  private static createPaginateResult(
    totalCount: number,
    list: ObjectLiteral[],
    page: number,
    limit: number,
    route: string,
  ) {
    const totalPages = Math.ceil(totalCount / limit);
    const hasFirstPage = true;
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;
    const hasLastPage = totalPages > 0;

    const symbol = new RegExp(/\?/).test(route) ? '&' : '?';
    const limitLabel = 'limit';
    const pageLabel = 'page';
    const links = {
      first: hasFirstPage ? `${route}${symbol}${limitLabel}=${limit}` : '',
      previous: hasPreviousPage
        ? `${route}${symbol}${pageLabel}=${page - 1}&${limitLabel}=${limit}`
        : '',
      next: hasNextPage
        ? `${route}${symbol}${pageLabel}=${page + 1}&${limitLabel}=${limit}`
        : '',
      last: hasLastPage
        ? `${route}${symbol}${pageLabel}=${totalPages}&${limitLabel}=${limit}`
        : '',
    };

    const metaData = {
      totalCount,
      listCount: list.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    };

    const result = {
      list,
      metaData,
      links,
    };

    return result;
  }
}
