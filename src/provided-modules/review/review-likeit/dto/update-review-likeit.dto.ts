import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewLikeitDto } from './create-review-likeit.dto';

export class UpdateReviewLikeitDto extends PartialType(CreateReviewLikeitDto) {}
