import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewConfigDto } from './create-review-config.dto';

export class UpdateReviewConfigDto extends PartialType(CreateReviewConfigDto) {}
