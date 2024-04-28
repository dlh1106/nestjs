import { InputType, PickType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { YesNoEnum } from 'src/provided-modules/goods/enums/y-n.enums';

@InputType()
export class GoodsOpionDto {
  @Expose()
  go_id: number;

  @Expose()
  go_type: 'SELECT' | 'CUSTOM';

  @Expose()
  go_name: string;

  @Expose()
  go_sort: number;

  @Expose()
  go_value: string;

  @Expose()
  go_is_require: YesNoEnum;

  @Expose()
  go_is_mix: YesNoEnum;

  @Expose()
  go_is_use: YesNoEnum;

}

