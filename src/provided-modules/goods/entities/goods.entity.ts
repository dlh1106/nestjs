import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumberString,
  Min,
  MaxDate,
  IsDateString,
  IsString,
  MaxLength,
} from 'class-validator';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { YesNoEnum } from '../enums/y-n.enums';
import { WonPercentEnum } from '../enums/won-percent.enum';
import { DefaultDirectEnum } from '../enums/default-direct.enum';

enum GoodsStatus {
  SELL = 'SELL',
  STOP = 'STOP',
  TEMP_SOLDOUT = 'TEMP_SOLDOUT',
}

@ObjectType()
@Entity('goods_tb')
export class GoodsTb {
  @PrimaryGeneratedColumn()
  g_id: number;

  @Column({
    type: 'varchar',
    length: 200,
    comment: '서비스 유일코드(s_uuidv4)',
  })
  @IsNotEmpty()
  @Field(() => String)
  g_service_id: string;

  @Column({ type: 'varchar', length: 200, comment: '상품명' })
  @IsNotEmpty()
  @MaxLength(100)
  @Field(() => String)
  g_name: string;

  @Column({
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
    comment: '가격 사용 여부',
  })
  @IsEnum(YesNoEnum)
  @Field(() => String, { defaultValue: YesNoEnum.Y })
  g_is_use_price: YesNoEnum;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '판매가' })
  @IsNumberString()
  @Field(() => Int)
  g_price_sell: number;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '정가' })
  @IsNumberString()
  @Field(() => Int)
  g_price_cost: number;

  @Column({
    type: 'varchar',
    length: 40,
    default: '',
    comment: '가격 대체 문구',
  })
  @Field(() => String)
  g_price_replace: string;

  @Column({
    type: 'enum',
    enum: GoodsStatus,
    default: GoodsStatus.SELL,
    comment: '판매상태 (판매중, 판매중지, 일시품절)',
  })
  @IsEnum(GoodsStatus)
  @Field(() => String, { defaultValue: GoodsStatus.SELL })
  g_status: GoodsStatus;

  @Column({
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.N,
    comment: '품절 여부',
  })
  @IsEnum(YesNoEnum)
  @Field(() => String, { defaultValue: YesNoEnum.N })
  g_is_soldout: YesNoEnum;

  @Column({
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
    comment: '전시 상태 (전시, 미전시)',
  })
  @IsEnum(YesNoEnum)
  @Field(() => String, { defaultValue: YesNoEnum.Y })
  g_is_display: YesNoEnum;

  @Column({
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.N,
    comment: '판매기간 사용 여부',
  })
  @IsEnum(YesNoEnum)
  @Field(() => String, { defaultValue: YesNoEnum.N })
  g_is_use_sell_period: YesNoEnum;

  @Column({ type: 'datetime', comment: '판매기간 시작 (기본: 현재시간)' })
  @IsDateString()
  @Field(() => Date)
  g_sell_started_at: Date;

  @Column({ type: 'datetime', comment: '판매기간 종료 (기본: maximum 날짜)' })
  @IsDateString()
  @Field(() => Date)
  g_sell_ended_at: Date;

  @Column({
    type: 'varchar',
    length: 100,
    default: '',
    comment: '판매자 상품코드',
  })
  @Field(() => String)
  g_code: string;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '표준 카테고리' })
  @IsNumberString()
  @Field(() => Int)
  g_standard_category_id: number;

  @Column({
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.N,
    comment: '할인 사용 여부',
  })
  @IsEnum(YesNoEnum)
  @Field(() => String, { defaultValue: YesNoEnum.N })
  g_is_use_discount: YesNoEnum;

  @Column({
    type: 'enum',
    enum: WonPercentEnum,
    default: WonPercentEnum.Percent,
    comment: '할인 타입(%, 원)',
  })
  @IsEnum(WonPercentEnum)
  @Field(() => Float)
  g_discount_type: WonPercentEnum;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '할인 금액' })
  @IsNumberString()
  @Field(() => Int)
  g_discount_price: number;

  @Column({ type: 'datetime', comment: '할인기간 시작' })
  @IsDateString()
  @Field(() => Date)
  g_discount_period_started_at: Date;

  @Column({ type: 'datetime', comment: '할인기간 종료' })
  @IsDateString()
  @Field(() => Date)
  g_discount_period_ended_at: Date;

  @Column({ type: 'varchar', length: 255, default: '', comment: '상세 이미지' })
  @IsOptional()
  @Field(() => String)
  g_image_detail: string;

  @Column({ type: 'varchar', length: 255, default: '', comment: '목록 이미지' })
  @IsOptional()
  @Field(() => String)
  g_image_list: string;

  @Column({ type: 'text', comment: '(json) 추가 이미지' })
  @IsOptional()
  @Field(() => String)
  g_image_add: string;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '상품 주요정보 - 제조사',
  })
  @IsNumberString()
  @Field(() => Int)
  g_manufacturer: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '상품 주요정보 - 브랜드',
  })
  @IsNumberString()
  @Field(() => Int)
  g_brand: number;

  @Column({ type: 'date', comment: '상품 주요정보 - 제조일자' })
  @IsDateString()
  @Field(() => Date)
  g_manufactured_at: Date;

  @Column({ type: 'date', comment: '상품 주요정보 - 유효일자' })
  @IsDateString()
  @Field(() => Date)
  g_expired_at: Date;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '상품 주요정보 - 원산지 code',
  })
  @IsNumberString()
  @Field(() => Int)
  g_origin_area_code: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
    comment: '상품 주요정보 - 원산지 기타 직접 입력',
  })
  @IsString()
  @Field(() => String)
  g_origin_area_etc: string;

  @Column({
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
    comment: '배송 사용 여부',
  })
  @IsEnum(YesNoEnum)
  @Field(() => String, { defaultValue: YesNoEnum.Y })
  g_is_use_delivery: YesNoEnum;

  @Column({
    type: 'enum',
    enum: DefaultDirectEnum,
    default: DefaultDirectEnum.DEFAULT,
    comment: '배송비 타입 (기본/상품별 배송비)',
  })
  @IsEnum(DefaultDirectEnum)
  @Field(() => String, { defaultValue: DefaultDirectEnum.DEFAULT })
  g_delivery_type: DefaultDirectEnum;

  @Column({
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
    comment: '개인 통관 고유번호(Personal Customs Clearance Code) 사용 여부',
  })
  @IsEnum(YesNoEnum)
  @Field(() => String, { defaultValue: YesNoEnum.Y })
  g_is_pccc: YesNoEnum;

  @Column({ type: 'text', comment: '검색어' })
  @IsString()
  @Field(() => String)
  g_keyword: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
    comment: '아이콘 (1차 - 신상품/베스트/세일/주문폭주)',
  })
  @IsString()
  @Field(() => String)
  g_icons: string;

  @Column({ type: 'datetime', comment: '아이콘 노출 기간 시작' })
  @IsDateString()
  @Field(() => Date)
  g_icons_display_started_at: Date;

  @Column({ type: 'datetime', comment: '아이콘 노출 기간 종료' })
  @IsDateString()
  @Field(() => Date)
  g_icons_display_ended_at: Date;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '판매수' })
  @IsNumberString()
  @Field(() => Int)
  g_count_sell: number;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '조회수' })
  @IsNumberString()
  @Field(() => Int)
  g_count_hit: number;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '리뷰수' })
  @IsNumberString()
  @Field(() => Int)
  g_count_review: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '등록일자',
  })
  @Field(() => Date)
  g_created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '수정일자',
  })
  @Field(() => Date)
  g_updated_at: Date;

  // @OneToMany(() => GoodsOptionTb, (goodsoption) => goodsoption.goods, {
  //   cascade: true,
  // })
  // g_goods_options: GoodsOptionTb[];
}
