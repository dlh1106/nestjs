import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewProductService } from './review-product.service';
import { CreateReviewProductDto } from './dto/create-review-product.dto';
import { UpdateReviewProductDto } from './dto/update-review-product.dto';

@Controller('review-product')
export class ReviewProductController {
  constructor(private readonly reviewProductService: ReviewProductService) {}

  @Post()
  create(@Body() createReviewProductDto: CreateReviewProductDto) {
    return this.reviewProductService.create(createReviewProductDto);
  }

  @Get()
  findAll() {
    return this.reviewProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewProductDto: UpdateReviewProductDto) {
    return this.reviewProductService.update(+id, updateReviewProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewProductService.remove(+id);
  }
}
