import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 전역 응답 인터셉터
 */
@Injectable()
export class GlobalResponseTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const requestType = context.getType();

    return next.handle().pipe(
      map((response) => {
        switch (requestType.toLocaleLowerCase()) {
          case 'graphql':
          case 'http':
            return this.defaultResponse(response);
          default:
            return new HttpException(
              `unknown request type by ${GlobalResponseTransformInterceptor.name}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }),
    );
  }

  private defaultResponse(response) {
    Logger.log('ResponseTransform', GlobalResponseTransformInterceptor.name);
    // console.log(response);
    return response ?? {};
  }
}
