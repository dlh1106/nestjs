import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewLikeitService } from './review-likeit.service';
import { CreateReviewLikeitDto } from './dto/create-review-likeit.dto';
import { UpdateReviewLikeitDto } from './dto/update-review-likeit.dto';

@Controller('review-likeit')
export class ReviewLikeitController {
  constructor(private readonly reviewLikeitService: ReviewLikeitService) { }

  @Post()
  create(@Body() createReviewLikeitDto: CreateReviewLikeitDto) {
    return this.reviewLikeitService.create(createReviewLikeitDto);
  }

  @Get()
  findAll() {
    return this.reviewLikeitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewLikeitService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewLikeitDto: UpdateReviewLikeitDto,
  ) {
    return this.reviewLikeitService.update(+id, updateReviewLikeitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewLikeitService.remove(+id);
  }
}
