import { InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum BasketStatus {
  Ready = 'READY',
  DeliveryReady = 'DELI_READY',
  DeliveryInProgress = 'DELI_ING',
  DeliveryEnd = 'DELI_END',
}

@InputType()
export class CreateOrderBasketDto {
  @ApiProperty({
    description: '주문번호',
    example: 'ORD123456',
  })
  @IsString()
  ordernum: string;

  @ApiProperty({
    description: '주문상품 번호',
    example: 1,
  })
  @IsInt()
  @Min(1)
  basket_num: number;

  @ApiProperty({
    description: '배송 번호',
    example: 'DELIVERY123',
  })
  @IsNotEmpty()
  @IsString()
  delivery_num: string;

  @ApiProperty({
    description: '상품 ID',
    example: 123,
  })
  @IsInt()
  product_id: number;

  @ApiProperty({
    description: '바구니 재고',
    example: 5,
  })
  @IsInt()
  @Min(0)
  basket_stock: number;

  @ApiProperty({
    description: '상품 가격',
    example: 20000,
    required: false,
  })
  @IsInt()
  @IsOptional()
  product_price: number = 0;

  @ApiProperty({
    description: '바구니 상태',
    enum: BasketStatus,
    example: BasketStatus.Ready,
  })
  @IsNotEmpty()
  @IsEnum(BasketStatus)
  basket_status: BasketStatus = BasketStatus.Ready;
}
