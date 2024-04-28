import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewListService } from './review-list.service';
import { CreateReviewListDto } from './dto/create-review-list.dto';
import { UpdateReviewListDto } from './dto/update-review-list.dto';

@Controller('review-list')
export class ReviewListController {
  constructor(private readonly reviewListService: ReviewListService) { }

  @Post()
  create(@Body() createReviewListDto: CreateReviewListDto) {
    return this.reviewListService.create(createReviewListDto);
  }

  @Get()
  findAll() {
    return this.reviewListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewListDto: UpdateReviewListDto,
  ) {
    return this.reviewListService.update(+id, updateReviewListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewListService.remove(+id);
  }
}
