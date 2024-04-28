import { BadRequestException } from '@nestjs/common';
import { ErrorDefine } from 'src/common/errors-define';
import { GLOBAL_VALIDATION_ERROR_CODE } from '../constants';
import { UnitValidateExceptionType } from '../types/unit-validate-exception.type';

export const GlobalValidateErrorDefine: ErrorDefine = {};
GlobalValidateErrorDefine[GLOBAL_VALIDATION_ERROR_CODE] = {
  exceptionClass: BadRequestException,
  exampleDescription: '파라미터 유효성 검사를 통과 하지못했을때 발생하는 오류',
  exampleTitle: '파라미터 유효성 검사 실패',
  message: [
    {
      property: '예외 발생 파라미터 명',
      propertyKo: '파라미터 한글명',
      message: '메시지',
    } as UnitValidateExceptionType,
  ],
  code: GLOBAL_VALIDATION_ERROR_CODE,
};
