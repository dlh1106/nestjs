import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewAdddatumService } from './review-adddatum.service';
import { CreateReviewAdddatumDto } from './dto/create-review-adddatum.dto';
import { UpdateReviewAdddatumDto } from './dto/update-review-adddatum.dto';

@Controller('review-adddata')
export class ReviewAdddataController {
  constructor(private readonly reviewAdddataService: ReviewAdddatumService) { }

  @Post()
  create(@Body() createReviewAdddatumDto: CreateReviewAdddatumDto) {
    return this.reviewAdddataService.create(createReviewAdddatumDto);
  }

  @Get()
  findAll() {
    return this.reviewAdddataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewAdddataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewAdddatumDto: UpdateReviewAdddatumDto,
  ) {
    return this.reviewAdddataService.update(+id, updateReviewAdddatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewAdddataService.remove(+id);
  }
}
