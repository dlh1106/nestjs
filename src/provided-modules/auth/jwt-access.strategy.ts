import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

// PassportStrategy
// 인증 미들웨어 : 자격증명(JWT, 사용자 이름/암호)을 확인하여 사용자를 인증
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwtGuard') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // req.headers.Authorization...
      secretOrKey: 'randmall_secret',
    });
  }

  // 인증 결과를 확인하고 필요한 정보를 반환
  validate(payload) {
    //console.log(payload);
    return {
      user: payload.user,
    };
  }
}
