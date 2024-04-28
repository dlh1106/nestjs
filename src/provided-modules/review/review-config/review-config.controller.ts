import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewConfigService } from './review-config.service';
import { CreateReviewConfigDto } from './dto/create-review-config.dto';
import { UpdateReviewConfigDto } from './dto/update-review-config.dto';

@Controller('review-config')
export class ReviewConfigController {
  constructor(private readonly reviewConfigService: ReviewConfigService) {}

  @Post()
  create(@Body() createReviewConfigDto: CreateReviewConfigDto) {
    return this.reviewConfigService.create(createReviewConfigDto);
  }

  @Get()
  findAll() {
    return this.reviewConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewConfigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewConfigDto: UpdateReviewConfigDto) {
    return this.reviewConfigService.update(+id, updateReviewConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewConfigService.remove(+id);
  }
}
