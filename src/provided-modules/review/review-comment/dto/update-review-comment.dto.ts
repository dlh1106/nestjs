import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewCommentDto } from './create-review-comment.dto';

export class UpdateReviewCommentDto extends PartialType(
  CreateReviewCommentDto,
) { }
