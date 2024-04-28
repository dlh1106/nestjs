import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateReviewListDto } from './create-review-list.dto';

export class UpdateReviewListDto extends PickType(
  PartialType(CreateReviewListDto),
  ['r_score', 'r_content', 'r_attach'] as const,
) { }
