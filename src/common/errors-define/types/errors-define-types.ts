import { HttpException, Type } from '@nestjs/common';
import { UnitValidateExceptionType } from 'src/common/pipes/validate/types/unit-validate-exception.type';
import { TypeORMError } from 'typeorm';

/**
 * @author 이기봉
 * @since 2023.08.01
 * @summary 이 타입으로 에러를 정의
 */
export type ErrorCode = string;
export type ErrorDefine = Record<
  ErrorCode,
  {
    /**
     * @description 예외클래스 기술
     */
    exceptionClass: Type<HttpException | TypeORMError>;

    /**
     * @description 에러 메시지 기술
     */
    readonly message:
      | string
      | Record<string, Array<string>>
      | UnitValidateExceptionType[];

    /**
     * @description 정의할 에러 코드 기술
     */
    readonly code: ErrorCode;

    /**
     * @description 예시의 제목 기술
     */
    readonly exampleTitle: string;

    /**
     * @description 어떠한 상황일 때 오류가나는지 기술
     */
    readonly exampleDescription: string;
  }
>;
