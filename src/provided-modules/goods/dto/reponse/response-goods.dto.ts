import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';
import { DefaultDirectEnum } from 'src/provided-modules/goods/enums/default-direct.enum';
import { WonPercentEnum } from 'src/provided-modules/goods/enums/won-percent.enum';
import { YesNoEnum } from 'src/provided-modules/goods/enums/y-n.enums';

enum GoodsStatus {
  SELL = 'SELL',
  STOP = 'STOP',
  TEMP_SOLDOUT = 'TEMP_SOLDOUT',
}

@ObjectType()
export class ResponseGoodsDto {
  @Field(() => String)
  @Expose()
  g_name: string;

  @Field(() => String)
  @Expose()
  g_is_use_price: YesNoEnum;

  @Field(() => Int)
  @Expose()
  g_price_sell: number;

  @Field(() => Int)
  @Expose()
  g_price_cost: number;

  @Field(() => String)
  @Expose()
  g_price_replace: string;

  @Field(() => String)
  @Expose()
  g_status: GoodsStatus;

  @Field(() => String)
  @Expose()
  g_is_soldout: YesNoEnum;

  @Field(() => String)
  @Expose()
  g_is_display: YesNoEnum;

  @Field(() => String)
  @Expose()
  g_is_use_sell_period: YesNoEnum;

  @Field(() => Date)
  @Expose()
  g_sell_started_at: Date;

  @Field(() => Date)
  @Expose()
  g_sell_ended_at: Date;

  @Field(() => String)
  @Expose()
  g_code: string;

  @Field(() => Int)
  @Expose()
  g_standard_category_id: number;

  @Field(() => String)
  @Expose()
  g_is_use_discount: YesNoEnum;

  @Field(() => String)
  @Expose()
  g_discount_type: WonPercentEnum;

  @Field(() => Int)
  @Expose()
  g_discount_price: number;

  @Field(() => Date)
  @Expose()
  g_discount_period_started_at: Date;

  @Field(() => Date)
  @Expose()
  g_discount_period_ended_at: Date;

  @Field(() => String)
  @Expose()
  g_is_use_select_option: YesNoEnum;

  @Field(() => String)
  @Expose()
  g_is_use_custom_option: YesNoEnum;

  @Field(() => String)
  @Expose()
  g_image_detail: string;

  @Field(() => String)
  @Expose()
  g_image_list: string;

  @Field(() => String)
  @Expose()
  g_image_add: string;

  @Field(() => Int)
  @Expose()
  g_manufacturer: number;

  @Field(() => Int)
  @Expose()
  g_brand: number;

  @Field(() => Date)
  @Expose()
  g_manufactured_at: Date;

  @Field(() => Date)
  @Expose()
  g_expired_at: Date;

  @Field(() => Int)
  @Expose()
  g_origin_area_code: number;

  @Field(() => String)
  @Expose()
  g_origin_area_etc: string;

  @Field(() => YesNoEnum)
  @Expose()
  g_is_use_delivery: YesNoEnum;

  @Field(() => DefaultDirectEnum)
  @Expose()
  g_delivery_type: DefaultDirectEnum;

  @Field(() => YesNoEnum)
  @Expose()
  g_is_pccc: YesNoEnum;

  @Field(() => String)
  @Expose()
  g_keyword: string;

  @Field(() => String)
  @Expose()
  g_icons: string;

  @Field(() => Date)
  @Expose()
  g_icons_display_started_at: Date;

  @Field(() => Date)
  @Expose()
  g_icons_display_ended_at: Date;

  @Field(() => Int)
  @Expose()
  g_count_sell: number;

  @Field(() => Int)
  @Expose()
  g_count_hit: number;

  @Field(() => Int)
  @Expose()
  g_count_review: number;

  @Field(() => Date)
  @Expose()
  g_created_at: Date;

  @Field(() => Date)
  @Expose()
  g_updated_at: Date;
}
