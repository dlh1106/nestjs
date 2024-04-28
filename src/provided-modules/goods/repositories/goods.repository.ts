import { Repository } from 'typeorm';
import { GoodsTb } from '../entities/goods.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoodsDto } from '../dto/request/create';

@Injectable()
export class GoodsRepository extends Repository<GoodsTb> {
  constructor(
    @InjectRepository(GoodsTb)
    private readonly goodsRepo: Repository<GoodsTb>,
  ) {
    super(
      goodsRepo.target,
      goodsRepo.manager,
      goodsRepo.queryRunner,
    );
  }

  async CreateProduct(data: CreateGoodsDto) {
    return this.goodsRepo.save(data);
  }
}
