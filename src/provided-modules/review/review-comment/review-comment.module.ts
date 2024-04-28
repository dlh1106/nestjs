import { Module } from '@nestjs/common';
import { ReviewCommentService } from './review-comment.service';
import { ReviewCommentController } from './review-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewComment } from './entities/review-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewComment])],
  controllers: [ReviewCommentController],
  providers: [ReviewCommentService],
})
export class ReviewCommentModule { }
