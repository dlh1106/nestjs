import { Expose } from 'class-transformer';
import { Links, MetaData } from '.';

export class ResponseListDto<T> {
  @Expose()
  list: T[];

  @Expose()
  metaData: MetaData;

  @Expose()
  links: Links;
}
