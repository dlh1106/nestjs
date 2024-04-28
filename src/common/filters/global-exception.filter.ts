import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 전역 예외 필터
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const requestType = host.getType();
    const statusCode = this.getStatus(exception);

    Logger.error(
      exception.stack ||
      exception.message ||
      exception ||
      this.extractErrorMessage(exception),
      GlobalExceptionFilter.name,
    );

    switch (requestType.toLocaleLowerCase()) {
      case 'graphql':
        return exception;
      case 'http':
        const path = this.httpAdapterHost.httpAdapter.getRequestUrl(
          ctx.getRequest(),
        );
        const responseBody: ErrorResponseDataInterface = {
          error: {
            code: exception.response.code ?? statusCode,
            message: this.extractErrorMessage(exception),
          },
        };
        this.httpAdapterReply(responseBody, statusCode, ctx);
        break;
      case 'rpc':
      // throw new RpcException(this.extractErrorMessage(exception));
      default:
        return new HttpException(
          'unknown request type by ',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  private httpAdapterReply(responseBody, statusCode: number, ctx) {
    this.httpAdapterHost.httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      statusCode,
    );
  }

  private getStatus(exception: unknown): number {
    // 예외에 따라 적절한 HTTP 상태 코드를 반환하는 로직 작성, 그 외 예외에 대한 처리 로직을 추가할 수 있음.
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    return httpStatus;
  }

  private extractErrorMessage(err: any): string {
    if (err.response) {
      if (err.response.data && err.response.data.message) {
        return err.response.data.message;
      } else if (err.response.message) {
        return err.response.message;
      }
    } else if (err.graphQLErrors && err.graphQLErrors.length > 0) {
      return err.graphQLErrors[0].message;
    }
    if (err.message) {
      return err.message;
    }
    Logger.error(`미확인 ERROR...`, GlobalExceptionFilter.name);
    return '알 수 없는 에러가 발생하였습니다.';
  }
}

/**
 * @comment 예외 발생시 응답 인터페이스
 */
interface ErrorResponseDataInterface {
  error: {
    code: HttpStatus;
    message: string | [string];
  };
}
