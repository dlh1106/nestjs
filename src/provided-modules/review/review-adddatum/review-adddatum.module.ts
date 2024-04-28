import { Module } from '@nestjs/common';
import { ReviewAdddatumService } from './review-adddatum.service';
import { ReviewAdddataController } from './review-adddatum.controller';
import { ReviewAddDatum } from './entities/review-adddatum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewAddDatum])],
  controllers: [ReviewAdddataController],
  providers: [ReviewAdddatumService],
})
export class ReviewAdddataModule { }
