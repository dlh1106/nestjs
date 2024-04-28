import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class MetaData {
  @Expose()
  @Field(() => Int)
  totalCount: number;

  @Expose()
  @Field(() => Int)
  listCount: number;

  @Expose()
  @Field(() => Int)
  itemsPerPage: number;

  @Expose()
  @Field(() => Int)
  totalPages: number;

  @Expose()
  @Field(() => Int)
  currentPage: number;
}
