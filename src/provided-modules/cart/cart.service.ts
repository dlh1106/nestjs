import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create/create-cart.dto';
import { UpdateCartDto } from './dto/update/update-cart.dto';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>
  ) { }

  async create(createCartDto: CreateCartDto) {
    try {
      const newOrder = plainToInstance(Cart, createCartDto)
      return await this.cartRepo.save(newOrder);
    } catch (error) {
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
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
