import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/request/create/create-goods.dto';

@ApiTags('상품 API')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) { }

  @Post('/createGoods')
  @ApiOperation({ summary: '상품 등록', description: '상품을 등록합니다' })
  async createGoods(@Body(ValidationPipe) request: CreateGoodsDto) {
    const result = this.goodsService.create(request);
    return result;
  }
}
