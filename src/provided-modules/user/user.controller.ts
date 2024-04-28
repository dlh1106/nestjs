import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/list_id/:u_id')
  @ApiOperation({ summary: '특정 회원 정보(u_id)' })
  async getUser(@Param('u_id') u_id: string) {
    return this.userService.getOneUser(u_id);
  }

  @Post('/')
  create(@Body() request: CreateUserDto) {
    return this.userService.create(request);
  }

  @Delete(':id')
  remove(@Param('id') u_id: string) {
    return this.userService.delete(u_id);
  }

  @Post('/validate')
  @ApiOperation({ summary: 'accesstoken 인가처리 후 회원정보 리턴' })
  @UseGuards(AuthGuard('jwtGuard'))
  @ApiBearerAuth('access-token') // Bearer Token 인증 설정
  // 인증 및 권한 부여를 처리
  // 인증이 성공하면 요청을 허용, 실패하면 401 Unauthorized 응답을 반환
  fetchUser(@Request() req: any) {
    return req.user;
  }
}
