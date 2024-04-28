import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  getAccessToken({ user }, res) {
    const payload = { user: { u_id: user.u_login_id, u_email: user.u_email } };

    // accesstoken 발행
    const accesstoken = this.jwtService.sign(payload, {
      secret: 'randmall_secret',
      expiresIn: '1h',
    });

    // refreshtoekn 발행
    const refreshToken = this.jwtService.sign(payload, {
      secret: 'randmall_refresh_secret',
      expiresIn: '2h',
    });

    res.setHeader('Authorization', 'Bearer ' + accesstoken);

    // cookie 생성
    res.setHeader('Set-Cookie', [
      'accesstoken=' + accesstoken + '; HttpOnly; Path=/; Max-Age=3600;',
      'refreshToken=' + refreshToken + '; HttpOnly; Path=/; Max-Age=7200;',
    ]);

    const data = {
      accesstoken: accesstoken,
      refreshtoken: refreshToken,
    };

    return res.json(data);
  }

  logout() {
    return `Authentication=; refreshToken=; HttpOnly; Path=/; Max-Age=0`;
  }
}
