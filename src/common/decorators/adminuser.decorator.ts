import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AdminuserDto } from '../dto/adminuser.dto';

export const Adminuser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return plainToInstance(AdminuserDto, request.adminuser);
  },
);
