import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateGoodsOptionDto } from './dto/request/create/create-goods-option.dto';
import { GoodsOptionTb } from './entities/goods-option.entity';
import { GoodsOptionRepository } from './repository/goods-option.repository';

@Injectable()
export class GoodsOptionService {
  private service_id: string;

  constructor(
    @InjectRepository(GoodsOptionRepository)
    private readonly optionRepo: GoodsOptionRepository,
  ) {
    this.service_id = 'e5e4deb7-1513-4b90-95f6-b72f792fb460';
  }

  // 옵션 생성
  async createOption(goods_id: number, options: CreateGoodsOptionDto[]) {
    if (!goods_id || goods_id == 0) {
      throw new HttpException('ID가 없습니다.', HttpStatus.BAD_REQUEST);
    }
    
    const params: GoodsOptionTb[] = [];
    try {
      options.forEach((option) => {
        const param = plainToInstance(GoodsOptionTb, {
          ...option,
          go_service_id: this.service_id,
          go_goods_id: goods_id,
          go_value: JSON.stringify(option.go_value),
        });
        params.push(param);
      });
      return await this.optionRepo.createOption(params);
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new HttpException(
        {
          message: '상품 옵션 등록에 실패하였습니다.',
          error: error.sqlMessage,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // 옵션 수정
  async updateOption() {

  }
}
