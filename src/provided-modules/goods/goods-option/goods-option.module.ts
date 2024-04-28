import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsOptionTb } from './entities/goods-option.entity';
import { GoodsOptionController } from './goods-option.controller';
import { GoodsOptionService } from './goods-option.service';
import { GoodsOptionRepository } from './repository/goods-option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsOptionTb])],
  controllers: [GoodsOptionController],
  providers: [GoodsOptionService, GoodsOptionRepository],
  exports: [GoodsOptionService],
})
export class GoodsOptionModule { }
