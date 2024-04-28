import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminuserDto } from '../dto/adminuser.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private httpService: HttpService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 토큰 인증 로직 추가
      //this.httpService.post('http://localhost', { token: token });
    } catch {
      throw new UnauthorizedException();
    }
    // 토큰에서 사용자 정보와 service id를 가져와 사용 가능한 서비스인지 확인하기
    const adminuser: AdminuserDto = this.decodePayload(token)
    request.adminuser = adminuser;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private base64UrlToBase64(base64Url) {
    return base64Url.replace(/-/g, '+').replace(/_/g, '/') + "==";
  }

  private decodePayload(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('The token is invalid');
    }

    const payload = parts[1];
    const base64 = this.base64UrlToBase64(payload);
    const json = atob(base64);

    return JSON.parse(json);
  }
}
