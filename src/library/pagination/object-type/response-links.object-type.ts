import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class Links {
  @Expose()
  @Field()
  first: string;

  @Expose()
  @Field()
  previous: string;

  @Expose()
  @Field()
  next: string;

  @Expose()
  @Field()
  last: string;
}
