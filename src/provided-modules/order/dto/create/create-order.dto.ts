import { InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateOrderBasketDto } from './create-order-basket.dto';

enum OrderStatus {
  Yes = 'Y',
  No = 'N',
  Cancelled = 'C',
}

enum PaymentMethod {
  Bank = 'BANK',
  Card = 'CARD',
  Payco = 'PAYCO',
  Escrow = 'ESCROW',
}

@InputType()
export class CreateOrderDto {
  @ApiProperty({
    description: '주문번호',
    example: 'ORD123456',
  })
  @IsNotEmpty()
  @IsString()
  ordernum: string;

  @ApiProperty({
    description: '사용자 아이디',
    example: 'user123',
    required: false,
  })
  @IsOptional()
  @IsString()
  user_id: string;

  @ApiProperty({
    description: '결제 금액',
    example: 15000,
    required: false,
  })
  @IsInt()
  @IsOptional()
  pay_price: number;

  @ApiProperty({
    description: '배송비',
    example: 3000,
    required: false,
  })
  @IsInt()
  @IsOptional()
  deli_price: number;

  @ApiProperty({
    description: '주문 상태',
    enum: OrderStatus,
    example: OrderStatus.Yes,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  order_status: OrderStatus = OrderStatus.No;

  @ApiProperty({
    description: '결제 수단',
    enum: PaymentMethod,
    example: PaymentMethod.Bank,
  })
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymethod: PaymentMethod = PaymentMethod.Bank;

  @ApiProperty({
    description: '결제 데이터',
    example: 'Transaction ID: 123456',
  })
  @IsNotEmpty()
  @IsString()
  paydata: string;

  @ApiProperty({
    description: '보내는 사람',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty({
    description: '보내는 사람의 전화번호',
    example: '123-456-7890',
  })
  @IsNotEmpty()
  @IsString()
  sender_mobile: string;

  @ApiProperty({
    description: '보내는 사람의 이메일',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsString()
  sender_email: string;

  @ApiProperty({
    description: '주문 메시지',
    example: '배송 시 요청 사항',
  })
  @IsNotEmpty()
  @IsString()
  order_msg: string;

  @ApiPropertyOptional({
    type: [CreateOrderBasketDto],
    example: [
      {
        delivery_num: 'DELIVERY123',
        product_id: 111,
        basket_stock: 2,
        product_price: 10000,
        basket_status: 'READY',
      },
      {
        delivery_num: 'DELIVERY124',
        product_id: 222,
        basket_stock: 5,
        product_price: 30000,
        basket_status: 'READY',
      },
    ],
  })
  @IsOptional()
  order_baskets: CreateOrderBasketDto[];
}
