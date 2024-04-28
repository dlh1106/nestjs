import { Injectable } from '@nestjs/common';
import { CreateReviewAdddatumDto } from './dto/create-review-adddatum.dto';
import { UpdateReviewAdddatumDto } from './dto/update-review-adddatum.dto';

@Injectable()
export class ReviewAdddatumService {
  create(createReviewAdddatumDto: CreateReviewAdddatumDto) {
    return 'This action adds a new reviewAdddatum';
  }

  findAll() {
    return `This action returns all reviewAdddata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewAdddatum`;
  }

  update(id: number, updateReviewAdddatumDto: UpdateReviewAdddatumDto) {
    return `This action updates a #${id} reviewAdddatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewAdddatum`;
  }
}
