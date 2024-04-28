import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { DefaultDirectEnum } from 'src/provided-modules/goods/enums/default-direct.enum';
import { WonPercentEnum } from 'src/provided-modules/goods/enums/won-percent.enum';
import { YesNoEnum } from 'src/provided-modules/goods/enums/y-n.enums';
import { CreateGoodsOptionDto } from 'src/provided-modules/goods/goods-option/dto/request/create';
// import { CreateGoodsStockDto } from 'src/provided-modules/goods-option/dto/request/create/create-goods-stock.dto';
// import { CreateGoodsOptionDto } from '../../../goods-option/dto/request/create/index';

enum GoodsStatus {
  SELL = 'SELL',
  STOP = 'STOP',
  TEMP_SOLDOUT = 'TEMP_SOLDOUT',
}

@InputType()
export class CreateGoodsDto {
  @Field(() => String)
  g_service_id: string;

  @ApiProperty({ default: '티셔츠', required: true })
  @IsNotEmpty()
  @MaxLength(100)
  @Field(() => String)
  g_name: string;

  @ApiProperty({ default: 'Y', enum: ['Y', 'N'] })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_use_price: YesNoEnum;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Field(() => Int)
  g_price_sell: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Field(() => Int)
  g_price_cost: number;

  @ApiProperty({ default: '' })
  @IsString()
  @Field(() => String)
  g_price_replace: string;

  @ApiProperty({ default: 'SELL' })
  @IsEnum(GoodsStatus)
  @Field(() => String)
  g_status: GoodsStatus;

  /*
  @ApiProperty({ default: 'N' })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_soldout: YesNoEnum;
  */

  @ApiProperty({ default: 'Y' })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_display: YesNoEnum;

  @ApiProperty({ default: 'N' })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_use_sell_period: YesNoEnum;

  @ApiProperty({ example: '2023-07-18 12:30:32' })
  @IsDateString()
  @Field(() => Date)
  g_sell_started_at: Date;

  @ApiProperty({ example: '2023-07-18 12:30:32' })
  @IsDateString()
  @Field(() => Date)
  g_sell_ended_at: Date;

  @ApiProperty()
  @IsString()
  @Field(() => String)
  g_code: string;

  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  g_standard_category_id: number;

  @ApiProperty({ default: 'N' })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_use_discount: YesNoEnum;

  @ApiProperty({ default: 'PERCENT' })
  @IsEnum(WonPercentEnum)
  @Field(() => String)
  g_discount_type: WonPercentEnum;

  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  g_discount_price: number;

  @ApiProperty({ example: '2023-07-18 12:30:32' })
  @IsDateString()
  @Field(() => Date)
  g_discount_period_started_at: Date;

  @ApiProperty({ example: '2023-07-18 12:30:32' })
  @IsDateString()
  @Field(() => Date)
  g_discount_period_ended_at: Date;

  @ApiProperty({ default: 'N' })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_use_select_option: YesNoEnum;

  @ApiProperty({ default: 'N' })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_use_custom_option: YesNoEnum;

  @ApiProperty({ default: '' })
  @IsOptional()
  @Field(() => String)
  g_image_detail: string;

  @ApiProperty({ default: '' })
  @IsOptional()
  @Field(() => String)
  g_image_list: string;

  @ApiProperty({ default: '' })
  @IsOptional()
  @Field(() => String)
  g_image_add: string;

  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  g_manufacturer: number;

  //TODO
  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  g_brand: number;

  @ApiProperty({ description: '제조일자', example: '2023-07-18' })
  @IsDateString()
  @Field(() => Date)
  g_manufactured_at: Date;

  @ApiProperty({ description: '유효일자', example: '2023-07-18' })
  @IsDateString()
  @Field(() => Date)
  g_expired_at: Date;

  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  g_origin_area_code: number;

  @ApiProperty({ default: '' })
  @IsString()
  @Field(() => String)
  g_origin_area_etc: string;

  @ApiProperty({ default: 'Y' })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_use_delivery: YesNoEnum;

  @ApiProperty({ default: 'DEFAULT' })
  @IsEnum(DefaultDirectEnum)
  @Field(() => String)
  g_delivery_type: DefaultDirectEnum;

  @ApiProperty({ default: 'Y' })
  @IsEnum(YesNoEnum)
  @Field(() => String)
  g_is_pccc: YesNoEnum;

  @ApiProperty({ default: '' })
  @IsString()
  @Field(() => String)
  g_keyword: string;

  @ApiProperty({ default: '' })
  @IsString()
  @Field(() => String)
  g_icons: string;

  @ApiProperty({ example: '2023-07-18 12:30:32' })
  @IsDateString()
  @Field(() => Date)
  g_icons_display_started_at: Date;

  @ApiProperty({ example: '2023-07-18 12:30:32' })
  @IsDateString()
  @Field(() => Date)
  g_icons_display_ended_at: Date;

  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  g_count_sell: number;

  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  g_count_hit: number;

  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  g_count_review: number;

  @ApiPropertyOptional({
    type: [CreateGoodsOptionDto],
    description: '상품 옵션',
  })
  @IsOptional()
  @ApiProperty({
    example: [
      {
        "go_sort": 0,
        "go_type": "SELECT",
        "go_name": "사이즈",
        "go_value": [
          { id: 0, val: 20, sort: 0 },
          { id: 1, val: 30, sort: 1 },
          { id: 2, val: 40, sort: 2 },
        ],
      },
      {
        "go_sort": 1,
        "go_type": "SELECT",
        "go_name": "색상",
        "go_value": [
          { id: 0, val: "빨", sort: 0 },
          { id: 1, val: "주", sort: 1 },
          { id: 2, val: "노", sort: 2 },
        ],
      }
    ]
  })
  @Field(() => Array)
  g_goods_options: CreateGoodsOptionDto[];

}
