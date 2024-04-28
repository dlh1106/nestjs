import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewAdddatumDto } from './create-review-adddatum.dto';

export class UpdateReviewAdddatumDto extends PartialType(
  CreateReviewAdddatumDto,
) { }
