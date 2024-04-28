import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from '../create/create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) { }
