import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

interface logDataInterface {
  message: string;
  logContext: string;
}

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 전역 로그 인터셉터
 */
@Injectable()
export class GlobalLoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const requestType = context.getType();
    const now = Date.now();

    return next.handle().pipe(
      tap((json) => {
        let logData: logDataInterface = {
          message: '',
          logContext: '',
        };

        switch (requestType.toLocaleLowerCase()) {
          case 'graphql':
            logData = this.graphqlLogging(context, now);
            break;
          case 'http':
            logData = this.httpLogging(context, now);
            break;
          case 'rpc':
            logData = this.rpcLogging(context, now);
            break;
          default:
            Logger.error(`unknown request type`, GlobalLoggingInterceptor.name);
        }

        const result = JSON.stringify(json).substring(0, 200);
        Logger.log(`[${requestType}] ${logData.message}`, logData.logContext);
      }),
    );
  }

  private graphqlLogging(context: ExecutionContext, now: number) {
    const ctx: any = GqlExecutionContext.create(context);
    const resolverName = ctx.constructorRef.name;
    const info = ctx.getInfo();

    const resultMessage: logDataInterface = {
      message: `${info.parentType} "${info.fieldName}" +${Date.now() - now}ms`,
      logContext: resolverName,
    };
    return resultMessage;
  }

  private rpcLogging(context: ExecutionContext, now: number) {
    const controllerName = context.getClass().name;
    const resultMessage: logDataInterface = {
      message: `${context.switchToRpc().getContext().args[1] || ''} +${Date.now() - now
        }ms`,
      logContext: controllerName,
    };
    return resultMessage;
  }

  private httpLogging(context: ExecutionContext, now: number) {
    const ctx = context.switchToHttp();
    const controllerName = context.getClass().name;
    const request = ctx.getRequest<Request>();
    const method = request.method;
    const url = request.url;

    const resultMessage: logDataInterface = {
      message: `${method} ${url} +${Date.now() - now}ms`,
      logContext: controllerName,
    };
    return resultMessage;
  }
}
