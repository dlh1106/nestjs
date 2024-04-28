import { Injectable } from '@nestjs/common';
import { CreateReviewCommentDto } from './dto/create-review-comment.dto';
import { UpdateReviewCommentDto } from './dto/update-review-comment.dto';

@Injectable()
export class ReviewCommentService {
  create(createReviewCommentDto: CreateReviewCommentDto) {
    return 'This action adds a new reviewComment';
  }

  findAll() {
    return `This action returns all reviewComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewComment`;
  }

  update(id: number, updateReviewCommentDto: UpdateReviewCommentDto) {
    return `This action updates a #${id} reviewComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewComment`;
  }
}
