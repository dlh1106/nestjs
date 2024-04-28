import {
  DynamicModule,
  Global,
  InternalServerErrorException,
  Logger,
  Module,
} from '@nestjs/common';
import { ErrorDefine } from 'src/common/errors-define';
import { ERROR_DEFINE } from './constants';

/**
 * @author 이기봉
 * @since 2023.08.01
 * @summary 예외 응답 관리 모듈
 */
@Global()
@Module({})
export class ErrorDefineModule {
  static register(errorDefines: ErrorDefine[]): DynamicModule {
    const mergedErrorDefine: ErrorDefine = {};
    for (const errorDefine of errorDefines) {
      for (const key in errorDefine) {
        /**
         * @description key 중복
         */
        if (mergedErrorDefine[key]) {
          Logger.error(`Duplicate key found: ${key}`, ErrorDefineModule.name);
          throw new InternalServerErrorException(`Duplicate key found: ${key}`);
        }

        /**
         * @description key 와 code 가 동일하지 않을 경우
         */
        if (key !== errorDefine[key].code) {
          Logger.error(
            `Key mismatch found for error code: ${key}. Expected: ${key}, Actual: ${errorDefine[key].code}`,
            ErrorDefineModule.name,
          );
          throw new InternalServerErrorException(
            `Key mismatch found for error code: ${key}. Expected: ${key}, Actual: ${errorDefine[key].code}`,
          );
        }
        mergedErrorDefine[key] = errorDefine[key];
      }
    }
    return {
      module: ErrorDefineModule,
      providers: [{ provide: ERROR_DEFINE, useValue: mergedErrorDefine }],
      exports: [ERROR_DEFINE],
    };
  }
}
