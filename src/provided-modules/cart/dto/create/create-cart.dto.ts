import { InputType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CreateCartOptionDto } from "./create-cart-option.dto";

@InputType()
export class CreateCartDto {
  @ApiProperty({
    description: '상품id',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @ApiProperty({
    description: '수량',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  stock: number;

  @ApiProperty({
    description: '회원id',
    example: 'test',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  user_id: string;

  @ApiPropertyOptional({
    type: [CreateCartOptionDto],
    example: [
      {
        option_id: 1,
        option_value: 'size:s, color:pink',
        option_price: 1000,
      },
      {
        option_id: 2,
        option_value: 'size:m',
        option_price: 0,
      }
    ]
  })
  @IsOptional()
  cart_options: CreateCartOptionDto[]
}
