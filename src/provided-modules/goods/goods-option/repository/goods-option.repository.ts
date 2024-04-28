import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsOptionTb } from '../entities/goods-option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoodsOptionRepository extends Repository<GoodsOptionTb> {
  constructor(
    @InjectRepository(GoodsOptionTb)
    private readonly optionRepo: Repository<GoodsOptionTb>,
  ) {
    super(optionRepo.target, optionRepo.manager, optionRepo.queryRunner);
  }
  //옵션 생성
  async createOption(params: GoodsOptionTb[]) {
    return this.optionRepo.insert(params);
  }
}
