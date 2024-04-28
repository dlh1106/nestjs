import { Module } from '@nestjs/common';
import { ReviewLikeitService } from './review-likeit.service';
import { ReviewLikeitController } from './review-likeit.controller';

@Module({
  controllers: [ReviewLikeitController],
  providers: [ReviewLikeitService]
})
export class ReviewLikeitModule {}
