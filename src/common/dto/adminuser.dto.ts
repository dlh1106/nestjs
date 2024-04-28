import { IsOptional, IsString, Length } from 'class-validator';

export class AdminuserDto {
  @IsString()
  @Length(3, 20)
  loginid: string

  @IsString()
  @Length(36)
  @IsOptional()
  serviceid: string;
}