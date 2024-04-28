import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { OrderBasket } from './order_basket.entity';

enum OrderStatus {
  Yes = 'Y',
  No = 'N',
  Cancelled = 'C',
}

enum PaymentMethod {
  Bank = 'BANK',
  Card = 'CARD',
  Payco = 'PAYCO',
  Escrow = 'ESCROW',
}

@Entity('order_tb')
export class Order {
  @PrimaryColumn({ type: 'varchar', length: 26 })
  ordernum: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  user_id: string;

  @Column({ unsigned: true, type: 'int', default: 0 })
  pay_price: number;

  @Column({ unsigned: true, type: 'int', default: 0 })
  deli_price: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.No })
  order_status: OrderStatus;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.Bank })
  paymethod: PaymentMethod;

  @Column({ type: 'varchar', length: 100 })
  paydata: string;

  @Column({ type: 'varchar', length: 30 })
  sender: string;

  @Column({ type: 'varchar', length: 30 })
  sender_mobile: string;

  @Column({ type: 'varchar', length: 50 })
  sender_email: string;

  @Column({ type: 'text' })
  order_msg: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => OrderBasket, (order_baskets) => order_baskets.order)
  // @JoinColumn({ name: 'ordernum' })
  order_baskets: OrderBasket[];
}
