import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { GoodsRepository } from './repositories/goods.repository';
import { GoodsTb } from './entities/goods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsOptionModule } from './goods-option/goods-option.module';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsTb]), GoodsOptionModule],
  controllers: [GoodsController],
  providers: [GoodsService, GoodsRepository],
})
export class GoodsModule { }
