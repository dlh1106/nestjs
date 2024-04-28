import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GoodsOptionService } from './goods-option.service';
import * as CreateDto from './dto/request/create/index';

@ApiTags('상품옵션 API')
@Controller('/api/goods-option')
export class GoodsOptionController {
  constructor(private readonly goodsOptService: GoodsOptionService) { }

  @ApiOperation({ summary: '옵션 등록', description: '옵션을 등록합니다' })
  @ApiBody({ type: [CreateDto.CreateGoodsOptionDto] })
  @Post('/createOption')
  createOption(@Body(ValidationPipe) request: CreateDto.CreateGoodsOptionDto[]) {
    return this.goodsOptService.createOption(1, request);
  }
}
