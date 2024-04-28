import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderBasket } from './entities/order_basket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderBasket])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
