import { Module } from '@nestjs/common';
import { ReviewConfigService } from './review-config.service';
import { ReviewConfigController } from './review-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewConfig } from './entities/review-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewConfig])],
  controllers: [ReviewConfigController],
  providers: [ReviewConfigService],
})
export class ReviewConfigModule { }
