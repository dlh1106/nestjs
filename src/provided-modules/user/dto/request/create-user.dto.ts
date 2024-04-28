import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: '', example: 'dlh1106', description: '아이디' })
  @IsString()
  u_login_id: string;

  @ApiProperty({ default: '', description: '비밀번호' })
  @IsString()
  u_password: string;

  @ApiProperty({ default: 'dlh1106@naver.com', description: '이메일' })
  @IsEmail()
  u_email: string;

  @ApiProperty({ default: '도훈', description: '이름' })
  @IsString()
  u_name: string;

  @ApiProperty({ default: 0, description: '포인트' })
  @IsNumber()
  u_point: number;

  @ApiProperty({ default: '', example: '11111', description: '우편번호' })
  @IsString()
  u_post: string;

  @ApiProperty({ default: '', example: 'test', description: '주소' })
  @IsString()
  u_address1: string;

  @ApiProperty({ default: '', example: 'test', description: '상세 주소' })
  @IsString()
  u_address2: string;

  @ApiProperty({
    default: '',
    example: '010-1111-1111',
    description: '휴대폰 번호',
  })
  @IsString()
  u_cellphone: string;
}