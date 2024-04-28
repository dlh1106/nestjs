import { Module } from '@nestjs/common';
import { ReviewProductService } from './review-product.service';
import { ReviewProductController } from './review-product.controller';

@Module({
  controllers: [ReviewProductController],
  providers: [ReviewProductService]
})
export class ReviewProductModule { }
