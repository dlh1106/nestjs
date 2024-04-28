import { plainToInstance } from 'class-transformer';

export class PaginationTransform {
  public static toInstance<T, Object>(
    dtoClass: new () => T,
    data: Object & { list: any[] },
  ) {
    data.list = plainToInstance(dtoClass, data.list, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    return data;
  }
}
