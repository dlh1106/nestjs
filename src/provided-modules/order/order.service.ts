import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderBasket } from './entities/order_basket.entity';
import { CreateOrderDto } from './dto/create/create-order.dto';
import { UpdateOrderDto } from './dto/update/update-order.dto';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderBasket)
    private readonly orderBasketRepo: Repository<OrderBasket>,

    private readonly connection: Connection,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    console.log(createOrderDto);

    try {
      const { order_baskets, ...order } = createOrderDto;

      const orderData = plainToInstance(Order, order);
      const newOrder = await this.orderRepo.create(orderData);
      await queryRunner.manager.save(newOrder);

      //const OrderBasketData = plainToInstance(OrderBasket, order_baskets);

      if (newOrder) {
        var basket_num = 1;
        const orderBaskets = order_baskets.map((basketData) => {
          basketData.basket_num = basket_num;
          basket_num += 1;
          return {
            ...basketData,
            ordernum: newOrder.ordernum,
          };
        });

        console.log(orderBaskets);

        const newOrderBakset = await this.orderBasketRepo.create(orderBaskets);
        await queryRunner.manager.save(newOrderBakset);

        if (newOrderBakset) {
          await queryRunner.commitTransaction();

          const response = {
            newOrder,
            newOrderBakset
          }

          return response;
        } else {
          await queryRunner.rollbackTransaction();
        }
      } else {
        await queryRunner.rollbackTransaction();
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: '상품 등록에 실패하였습니다.',
          error: error.sqlMessage,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
