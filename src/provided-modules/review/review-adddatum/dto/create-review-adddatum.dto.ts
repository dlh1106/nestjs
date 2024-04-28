import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateReviewAdddatumDto {
  @ApiProperty({ example: 1, description: '리뷰 추가 항목 id' })
  @IsInt()
  ra_id: number;

  @ApiProperty({ example: 1, description: '리뷰 번호' })
  @IsInt()
  ra_review_id: number;

  @ApiProperty({ example: 2, description: '리뷰 추가 항목 key' })
  @IsInt()
  ra_key: number;

  @ApiProperty({ example: 3, description: '리뷰 추가 항목 값' })
  @IsInt()
  ra_value: number;
}
