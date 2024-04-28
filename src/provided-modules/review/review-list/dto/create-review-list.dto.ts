import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateReviewListDto {
  @ApiProperty({ example: 123, description: '상품 id' })
  @IsInt()
  r_goods_id: number;

  @ApiProperty({ example: 789, description: '주문번호' })
  @IsInt()
  r_ordernum: number;

  @ApiProperty({ example: 1, description: '주문상품번호' })
  @IsInt()
  r_basketnum: number;

  @ApiProperty({ example: 'John Doe', description: '작성자명' })
  @IsString()
  r_writer: string;

  @ApiProperty({ example: 'password123', description: '작성 비밀번호(비회원)' })
  @IsString()
  r_passwd: string;

  @ApiProperty({ example: 'This is a review content.', description: '내용' })
  @IsString()
  r_content: string;

  @ApiProperty({
    example: 'attachment1.jpg',
    description: '첨부 파일명 리스트',
  })
  @IsString()
  r_attach: string;

  @ApiProperty({ example: 4, description: '평점' })
  @IsInt()
  r_score: number;
}
