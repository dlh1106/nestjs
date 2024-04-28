import { Injectable } from '@nestjs/common';
import { CreateReviewListDto } from './dto/create-review-list.dto';
import { UpdateReviewListDto } from './dto/update-review-list.dto';

@Injectable()
export class ReviewListService {
  create(createReviewListDto: CreateReviewListDto) {
    return 'This action adds a new reviewList';
  }

  findAll() {
    return `This action returns all reviewList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewList`;
  }

  update(id: number, updateReviewListDto: UpdateReviewListDto) {
    return `This action updates a #${id} reviewList`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewList`;
  }
}
