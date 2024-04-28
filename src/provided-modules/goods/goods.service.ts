import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateGoodsDto } from './dto/request/create/create-goods.dto';
import { GoodsAndMessageReponseDto } from './dto/reponse/response-goods-and-message.dto';
import { GoodsRepository } from './repositories/goods.repository';
import { plainToInstance } from 'class-transformer';
import { GoodsTb } from './entities/goods.entity';
import { GoodsOptionService } from './goods-option/goods-option.service';

@Injectable()
export class GoodsService {
  protected service_id: string;

  constructor(
    @InjectRepository(GoodsRepository)
    private readonly goodsRepo: GoodsRepository,
    private readonly goodsOptionService: GoodsOptionService,
    private readonly dataSource: DataSource,
  ) {
    this.service_id = 'e5e4deb7-1513-4b90-95f6-b72f792fb460';
  }

  /**
   * 상품 등록
   * @param request CreateGoodsDto
   * @returns {object}
   */
  async create(request: CreateGoodsDto) {
    if (!this.service_id) {
      throw new HttpException('service_id가 없습니다.', HttpStatus.BAD_REQUEST);
    }

    let new_g_id: number = 0;
    let responseOption;
    // transaction 처리
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      request.g_service_id = this.service_id;

      const {
        g_goods_options,
        ...goodsData
      } = request;

      // 1. goods 저장
      const goods = plainToInstance(GoodsTb, goodsData);
      const newGoods = await this.goodsRepo.save(goods);

      if (!newGoods) {
        throw new UnprocessableEntityException('등록 실패');
      }
      new_g_id = newGoods.g_id;

      // 2. goods_option 저장 
      if (request.g_goods_options) {
        responseOption = await this.goodsOptionService.createOption(
          new_g_id,
          request.g_goods_options,
        );
      }
      // TODO : goods_detail, goods_category 처리 
      const responseData = {
        Goods: newGoods,
        GoodsOption: responseOption.generatedMaps,
      };

      // 리턴
      const response = plainToInstance(
        GoodsAndMessageReponseDto,
        { data: responseData, message: '상품 등록에 성공하였습니다.' },
      );
      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new HttpException(
        {
          message: '상품 등록에 실패하였습니다.',
          error: error.sqlMessage,
        },
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      await queryRunner.release();
    }
  }

  // 상품 상세 등록
  async createDetail() {
  }

  // 상품/ 카테고리 매핑 테이블 등록
  async createCategoryMap() {
  }
}
