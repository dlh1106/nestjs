import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsEnum } from 'class-validator';

export class CreateReviewCommentDto {
  @ApiProperty({ example: 1, description: '리뷰 번호' })
  @IsInt()
  rc_review_id: number;

  @ApiProperty({ example: 2, description: '회원 id' })
  @IsInt()
  rc_user_id: number;

  @ApiProperty({ example: 'John Doe', description: '작성자명' })
  @IsString()
  rc_writer: string;

  @ApiProperty({ example: 'password123', description: '작성 비밀번호(비회원)' })
  @IsString()
  rc_passwd: string;

  @ApiProperty({ example: 'This is a comment content.', description: '내용' })
  @IsString()
  rc_content: string;

  @ApiProperty({
    enum: ['Y', 'N'],
    example: 'N',
    description: '관리자 작성 여부',
  })
  @IsEnum(['Y', 'N'])
  rc_is_staff: string;
}
