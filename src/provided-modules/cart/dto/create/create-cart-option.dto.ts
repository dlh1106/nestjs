import { InputType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateCartOptionDto {
  // @IsNotEmpty()
  // @IsInt()
  // cart_id: number;

  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  option_id: number;

  @IsNotEmpty()
  @IsString()
  option_value: string;

  @IsNotEmpty()
  @IsInt()
  option_price: number;
}