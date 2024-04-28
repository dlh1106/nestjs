import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GoodsTb } from './goods.entity';

@ObjectType()
@Entity('goods_category_map_tb')
export class GoodsCategoryMapTb {
  @PrimaryGeneratedColumn({ comment: '상품 카테고리 매핑 번호' })
  @Field(() => Int)
  gcm_id: number;

  @Column({ comment: '서비스 유일코드(s_uuidv4)' })
  @Field(() => String)
  gcm_service_id: string;

  @Column({ comment: '상품 번호' })
  @Field(() => Int)
  gcm_goods_id: number;

  @Column({ comment: '분류 번호' })
  @Field(() => Int)
  gcm_category_id: number;

  @Column({
    name: 'gcm_created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '등록일자',
  })
  @Field(() => Date)
  gcm_created_at: Date;

  // @ManyToOne(() => GoodsTb, (goods) => goods.goods_category)
  // @JoinColumn({ name: 'gcm_goods_id' })
  // @Field(() => GoodsTb)
  // GoodsTb: GoodsTb;
}
