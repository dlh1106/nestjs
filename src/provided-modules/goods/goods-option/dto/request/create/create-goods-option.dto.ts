import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { YesNoEnum } from 'src/provided-modules/goods/enums/y-n.enums';

@InputType()
export class CreateGoodsOptionDto {
  @ApiProperty({ description: '상점 id', example: 'shoptest' })
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  go_service_id: string;

  @ApiProperty({ description: '정렬값', example: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number, { defaultValue: 0 })
  go_sort: number;

  @ApiProperty({
    description: '옵션 타입',
    enum: ['SELECT', 'CUSTOM'],
    default: 'SELECT',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  go_type: 'SELECT' | 'CUSTOM';

  @ApiProperty({ description: '옵션 명', example: '사이즈' })
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  go_name: string;

  @ApiProperty({
    description: '옵션 값',
    example: [
      { id: 0, val: 20, sort: 0 },
      { id: 1, val: 30, sort: 1 },
      { id: 2, val: 40, sort: 2 },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionValue)
  @Field(() => Array<OptionValue>)
  go_value: OptionValue[];

  @ApiProperty({
    description: '필수 여부',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
  })
  @IsEnum(YesNoEnum)
  @IsNotEmpty()
  @Field(() => String)
  go_is_require: YesNoEnum;

  @ApiProperty({
    description: '조합 여부',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
  })
  @IsEnum(YesNoEnum)
  @IsNotEmpty()
  @Field(() => String)
  go_is_mix: YesNoEnum;

  @ApiProperty({
    description: '사용 여부',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
  })
  @IsEnum(YesNoEnum)
  @IsNotEmpty()
  @Field(() => String)
  go_is_use: YesNoEnum;
}

export class OptionValue {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  val: string;

  @IsNumber()
  @IsNotEmpty()
  sort: number;
}
