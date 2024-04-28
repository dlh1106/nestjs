import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewCommentService } from './review-comment.service';
import { CreateReviewCommentDto } from './dto/create-review-comment.dto';
import { UpdateReviewCommentDto } from './dto/update-review-comment.dto';

@Controller('review-comment')
export class ReviewCommentController {
  constructor(private readonly reviewCommentService: ReviewCommentService) {}

  @Post()
  create(@Body() createReviewCommentDto: CreateReviewCommentDto) {
    return this.reviewCommentService.create(createReviewCommentDto);
  }

  @Get()
  findAll() {
    return this.reviewCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewCommentDto: UpdateReviewCommentDto) {
    return this.reviewCommentService.update(+id, updateReviewCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewCommentService.remove(+id);
  }
}
