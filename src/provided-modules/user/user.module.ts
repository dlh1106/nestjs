import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExitUserTb } from '../exit-user/entities/exit-user.entity';
import { UserTb } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAccessStrategy } from '../auth/jwt-access.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserTb, ExitUserTb])],
  controllers: [UserController],
  providers: [UserService, JwtAccessStrategy],
})
export class UserModule { }
