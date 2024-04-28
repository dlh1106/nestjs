import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

enum BasketStatus {
  Ready = 'READY',
  DeliveryReady = 'DELI_READY',
  DeliveryInProgress = 'DELI_ING',
  DeliveryEnd = 'DELI_END',
}

@Entity('order_basket_tb')
export class OrderBasket {
  @PrimaryGeneratedColumn()
  basket_num: number;

  @PrimaryColumn({ type: 'varchar', length: 26 })
  ordernum: string;

  @Column({ type: 'varchar', length: 23 })
  delivery_num: string;

  @Column({ type: 'int', unsigned: true })
  product_id: number;

  @Column({ type: 'smallint', unsigned: true })
  basket_stock: number;

  @Column({ type: 'int', default: 0 })
  product_price: number;

  @Column({ type: 'enum', enum: BasketStatus, default: BasketStatus.Ready })
  basket_status: BasketStatus;

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

  @ManyToOne(() => Order, (order) => order.order_baskets, {
    onDelete: 'CASCADE', // Specify the delete behavior
  })
  @JoinColumn({ name: 'ordernum' }) // Link to the ordernum column in Order entity
  order: Order;
}
