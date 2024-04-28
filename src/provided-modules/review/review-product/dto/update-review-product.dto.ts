import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewProductDto } from './create-review-product.dto';

export class UpdateReviewProductDto extends PartialType(CreateReviewProductDto) {}
