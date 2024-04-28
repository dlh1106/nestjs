import { Injectable } from '@nestjs/common';
import { CreateReviewLikeitDto } from './dto/create-review-likeit.dto';
import { UpdateReviewLikeitDto } from './dto/update-review-likeit.dto';

@Injectable()
export class ReviewLikeitService {
  create(createReviewLikeitDto: CreateReviewLikeitDto) {
    return 'This action adds a new reviewLikeit';
  }

  findAll() {
    return `This action returns all reviewLikeit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewLikeit`;
  }

  update(id: number, updateReviewLikeitDto: UpdateReviewLikeitDto) {
    return `This action updates a #${id} reviewLikeit`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewLikeit`;
  }
}
