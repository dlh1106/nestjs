import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { YesNoEnum } from '../enums/y-n.enums';
import { DefaultDirectEnum } from '../enums/default-direct.enum';
import { GoodsTb } from './goods.entity';

@ObjectType()
@Entity('goods_detail_tb')
export class GoodsDetailTb {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  gd_id: number;

  @Column()
  @Field(() => Int)
  gd_goods_id: number;

  @Column({
    type: 'varchar',
    length: 200,
    comment: '서비스 유일코드(s_uuidv4)',
  })
  @IsNotEmpty()
  @Field(() => String)
  gd_service_id: string;

  @IsOptional()
  @Column({ type: 'mediumtext', default: '', comment: '상품 상세설명' })
  @Field(() => String)
  gd_content: string;

  @IsOptional()
  @Column({
    type: 'mediumtext',
    default: '',
    comment: '(json) 상품 정보 제공 고시',
  })
  @Field(() => String)
  gd_information_notice: string;

  @IsOptional()
  @Column({
    enum: DefaultDirectEnum,
    default: DefaultDirectEnum.DEFAULT,
    comment: '공통 안내사항 - 결제안내 (기본/직접입력 여부)',
  })
  @Field(() => String)
  gd_common_info_pay_type: DefaultDirectEnum;

  @IsOptional()
  @Column({ type: 'text', default: '', comment: '공통 안내사항 - 결제안내' })
  @Field(() => String)
  gd_common_info_pay: string;

  @IsOptional()
  @Column({
    enum: DefaultDirectEnum,
    default: DefaultDirectEnum.DEFAULT,
    comment: '공통 안내사항 - 배송안내 (기본/직접입력 여부)',
  })
  @Field(() => String)
  gd_common_info_delivery_type: DefaultDirectEnum;

  @IsOptional()
  @Column({ type: 'text', default: '', comment: '공통 안내사항 - 배송안내' })
  @Field(() => String)
  gd_common_info_delivery: string;

  @IsOptional()
  @Column({
    enum: DefaultDirectEnum,
    default: DefaultDirectEnum.DEFAULT,
    comment: '공통 안내사항 - 교환,반품안내 (기본/직접입력 여부)',
  })
  @Field(() => String)
  gd_common_info_claim_type: DefaultDirectEnum;

  @IsOptional()
  @Column({
    type: 'text',
    default: '',
    comment: '공통 안내사항 - 교환,반품안내',
  })
  @Field(() => String)
  gd_common_info_claim: string;

  @IsOptional()
  @Column({
    enum: DefaultDirectEnum,
    default: DefaultDirectEnum.DEFAULT,
    comment: '공통 안내사항 - 고객센터 (기본/직접입력 여부)',
  })
  @Field(() => String)
  gd_common_info_cs_type: DefaultDirectEnum;

  @IsOptional()
  @Column({
    type: 'text',
    default: '',
    comment: '공통 안내사항 - 고객센터 안내',
  })
  @Field(() => String)
  gd_common_info_cs: string;

  @Column({
    enum: YesNoEnum,
    default: YesNoEnum.N,
    comment: 'SEO 검색 엔진 노출 설정',
  })
  @Field(() => String)
  gd_is_display_seo: YesNoEnum;

  @IsOptional()
  @Column({
    type: 'text',
    default: '',
    comment: '(json) SEO 입력항목 (타이틀, 메타태그 1~3)',
  })
  @Field(() => String)
  gd_seo_meta_data: string;
}
