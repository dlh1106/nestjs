import { Module } from '@nestjs/common';
import { ReviewListService } from './review-list.service';
import { ReviewListController } from './review-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewList } from './entities/review-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewList])],
  controllers: [ReviewListController],
  providers: [ReviewListService],
})
export class ReviewListModule { }
