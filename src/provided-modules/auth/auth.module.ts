import { Module } from '@nestjs/common';
import { UserTb } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ExitUserTb } from '../exit-user/entities/exit-user.entity';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserTb, ExitUserTb]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule { }
