import { Injectable } from '@nestjs/common';
import { CreateReviewConfigDto } from './dto/create-review-config.dto';
import { UpdateReviewConfigDto } from './dto/update-review-config.dto';

@Injectable()
export class ReviewConfigService {
  create(createReviewConfigDto: CreateReviewConfigDto) {
    return 'This action adds a new reviewConfig';
  }

  findAll() {
    return `This action returns all reviewConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewConfig`;
  }

  update(id: number, updateReviewConfigDto: UpdateReviewConfigDto) {
    return `This action updates a #${id} reviewConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewConfig`;
  }
}
