import { ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartOption } from "./cart_option.entity";

@Entity('cart_tb')
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column({ name: 'product_id', type: 'int', unsigned: true })
  product_id: number;

  @Column({ type: 'smallint', unsigned: true })
  stock: number;

  @Column({ name: 'user_id', type: 'varchar', length: 20 })
  user_id: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => CartOption, cart_option => cart_option.cart, { cascade: true })
  cart_options: CartOption[]
}
