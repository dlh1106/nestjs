import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewListModule } from './review-list/review-list.module';
import { ReviewConfigModule } from './review-config/review-config.module';
import { ReviewCommentModule } from './review-comment/review-comment.module';
import { ReviewProductModule } from './review-product/review-product.module';
import { ReviewLikeitModule } from './review-likeit/review-likeit.module';
import { ReviewAdddataModule } from './review-adddatum/review-adddatum.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    ReviewListModule,
    ReviewConfigModule,
    ReviewCommentModule,
    ReviewProductModule,
    ReviewLikeitModule,
    ReviewAdddataModule,
  ],
})
export class ReviewModule { }
