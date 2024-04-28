import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestContextDidResolveOperation,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener,
} from '@apollo/server';
import { GraphQLResponseBody } from '@apollo/server/dist/esm/externalTypes/graphql';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { FormattedExecutionResult } from 'graphql';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary Graphql 쿼리 요청 로깅
 */
@Plugin()
export class LoggerPlugin implements ApolloServerPlugin {
  async requestDidStart(
    context: GraphQLRequestContext<any>,
  ): Promise<GraphQLRequestListener<any>> {
    Logger.debug('GraphQL 요청.', LoggerPlugin.name);
    return {
      didResolveOperation: async (
        reqContext: GraphQLRequestContextDidResolveOperation<any>,
      ) => {
        Logger.log(reqContext.operationName, `연산 유형`);
        Logger.log(reqContext.queryHash, '요청 연산 해시'); // 쿼리 추척 | 캐싱 | 쿼리 식별
        Logger.log(`\n` + reqContext.source.trim(), '요청 쿼리');
        // [IntrospectionQuery] 은 스키마를 읽어가기 위한 요청이다.
      },
      willSendResponse: async (
        resContext: GraphQLRequestContextWillSendResponse<any>,
      ) => {
        Logger.log(`GraphQL 응답.`, LoggerPlugin.name);
        this.loggingResponseData(resContext.response.body);
      },
      didEncounterErrors: async (
        errorContext: GraphQLRequestContextDidEncounterErrors<any>,
      ) => {
        errorContext.errors.map((err) => {
          Logger.error(`${this.extractErrorMessage(err)}`);
        });
      },
    };
  }

  private loggingResponseData(response: GraphQLResponseBody) {
    switch (response.kind) {
      case 'single': // 쿼리 또는 뮤테이션의 실행 결과
        const formattedResult: FormattedExecutionResult = response.singleResult;
        Logger.log(formattedResult.data);
        break;
      case 'incremental': // 실시간 업데이트를 제공하는 구독(subscription)
        Logger.debug(`실시간 업데이트 제공`);
        break;
      default:
        Logger.error('알수없는 응답형태입니다.', LoggerPlugin.name);
        break;
    }
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
    Logger.error(`미확인 ERROR...`, LoggerPlugin.name);
    return '알 수 없는 에러가 발생하였습니다.';
  }
}
