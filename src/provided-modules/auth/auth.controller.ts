import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }
  @Post('/login')
  @ApiCreatedResponse({ description: '로그인 accesstoken 발행' })
  @ApiOperation({ summary: '로그인 accesstoken 발행' })
  @ApiBody({
    schema: {
      properties: { u_id: { type: 'string' }, u_password: { type: 'string' } },
    },
  })
  @ApiResponse({ description: 'accesstoken' })
  async login(
    @Body() login_param: { u_id: string; u_password: string },
    @Response() res,
  ) {
    // id에 해당하는 회원 있는지 확인
    const user = await this.userService.getOneUser(login_param.u_id);
    if (!user)
      throw new UnprocessableEntityException('해당하는 회원이 없습니다.');

    // 비번이 같은지 확인
    const isAuth = await bcrypt.compare(
      login_param.u_password,
      user.u_password,
    );
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다');

    // accesstoken, refreshtoken 발행
    return this.authService.getAccessToken({ user }, res);
  }

  @Post('/restore')
  @UseGuards(AuthGuard('refresh'))
  @ApiCreatedResponse({ description: 'refreshtoken으로 accesstoken 재발급' })
  @ApiOperation({ summary: '3. refreshtoken으로 accesstoken 재발급' })
  restoreAccessToken(@Request() req: any, @Response() res) {
    console.log(req.user);
    return this.authService.getAccessToken(req.user, res);
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwtGuard'))
  @ApiCreatedResponse({ description: '로그아웃' })
  @ApiOperation({ summary: '로그아웃' })
  @ApiBearerAuth()
  logOut(@Request() req, @Response() res) {
    res.setHeader('Set-Cookie', this.authService.logout());
    return res.sendStatus(200);
  }
}
