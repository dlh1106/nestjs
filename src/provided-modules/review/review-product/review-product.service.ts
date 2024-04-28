import { Injectable } from '@nestjs/common';
import { CreateReviewProductDto } from './dto/create-review-product.dto';
import { UpdateReviewProductDto } from './dto/update-review-product.dto';

@Injectable()
export class ReviewProductService {
  create(createReviewProductDto: CreateReviewProductDto) {
    return 'This action adds a new reviewProduct';
  }

  findAll() {
    return `This action returns all reviewProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewProduct`;
  }

  update(id: number, updateReviewProductDto: UpdateReviewProductDto) {
    return `This action updates a #${id} reviewProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewProduct`;
  }
}
