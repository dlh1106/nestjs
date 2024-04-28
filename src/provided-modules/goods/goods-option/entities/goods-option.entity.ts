import { Field, Int } from '@nestjs/graphql';
import { GoodsTb } from 'src/provided-modules/goods/entities/goods.entity';
import { YesNoEnum } from 'src/provided-modules/goods/enums/y-n.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'goods_option_tb' })
export class GoodsOptionTb {
  @PrimaryGeneratedColumn({ name: 'go_id' })
  @Field(() => Int)
  go_id: number;

  @Column({ name: 'go_service_id', type: 'varchar', length: 200 })
  @Field()
  go_service_id: string;

  @Column({ name: 'go_goods_id', type: 'int', unsigned: true, default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  go_goods_id: number;

  @Column({ name: 'go_sort', type: 'int', unsigned: true, default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  go_sort: number;

  @Column({
    name: 'go_type',
    type: 'enum',
    enum: ['SELECT', 'CUSTOM'],
    default: 'SELECT',
  })
  @Field()
  go_type: 'SELECT' | 'CUSTOM';

  @Column({ name: 'go_name', type: 'varchar', length: 200, default: '' })
  @Field()
  go_name: string;

  @Column({ name: 'go_value', type: 'text' })
  @Field()
  go_value: string;

  @Column({
    name: 'go_is_require',
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
  })
  @Field()
  go_is_require: YesNoEnum;

  @Column({
    name: 'go_is_mix',
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
  })
  @Field()
  go_is_mix: YesNoEnum;

  @Column({
    name: 'go_is_use',
    type: 'enum',
    enum: YesNoEnum,
    default: YesNoEnum.Y,
  })
  @Field()
  go_is_use: YesNoEnum;

  @CreateDateColumn({ name: 'go_created_at', type: 'datetime' })
  @Field()
  go_created_at: Date;

  @UpdateDateColumn({ name: 'go_updated_at', type: 'datetime' })
  @Field()
  go_updated_at: Date;

  // @ManyToOne(() => GoodsTb, (goods) => goods.g_id)
  // @JoinColumn({ name: 'go_goods_id', referencedColumnName: 'g_id' })
  // goods: GoodsTb;
}
