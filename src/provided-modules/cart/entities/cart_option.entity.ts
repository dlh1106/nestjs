import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity('cart_option_tb')
export class CartOption {
  @PrimaryGeneratedColumn()
  cart_option_id: number;

  // @Column({ name: 'cart_id', type: 'int', unsigned: true })
  // cart_id: number;

  @Column({ name: 'option_id', type: 'int', unsigned: true })
  option_id: number;

  @Column({ type: 'text' })
  option_value: string;

  @Column({ name: 'option_price', type: 'int', unsigned: true })
  option_price: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updated_at: Date;

  @ManyToOne(() => Cart, cart => cart.cart_options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}