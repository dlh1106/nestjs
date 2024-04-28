import {
  BadRequestException,
  Type,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ValidationError } from 'class-validator';
import iterate from 'iterare';
import { makeExampleByApiProperty } from 'src/library/swagger/utils';
import { GLOBAL_VALIDATION_ERROR_CODE } from './constants';
import { UnitValidateExceptionType } from './types/unit-validate-exception.type';

/**
 * @author 이기봉
 * @since 2023.08.01
 * @summary 전역 파이프
 * @description 파이프단 파라미터 유효성 체크시 기존 평탄화 메시지 배열에서 아래 예시처럼 커스텀.
 * @example 			
      {
				"property": "a_email",
				"propertyKo": "이메일",
				"message": "유효한 이메일 주소가 아닙니다."
			}
 */
export class GlobalValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options);
  }

  public createExceptionFactory() {
    return (validationErrors = []) => {
      if (super.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      // [1] 이 부분이 기존 평탄화 배열.
      // const errors = this.flattenValidationErrors(validationErrors);
      // return new HttpErrorByCode[this.errorHttpStatusCode](errors);

      // [2] example 와 같은 형태로 에서 반환.
      const errors = this.extractionValidationErrors(validationErrors);

      return new BadRequestException({
        code: GLOBAL_VALIDATION_ERROR_CODE,
        message: errors,
      });
    };
  }

  mapChildrenToValidationErrors(error, parentPath?: string) {
    if (!(error.children && error.children.length)) {
      return [error];
    }
    const validationErrors = [];
    parentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;
    for (const item of error.children) {
      if (item.children && item.children.length) {
        validationErrors.push(
          ...this.mapChildrenToValidationErrors(item, parentPath),
        );
      }
      validationErrors.push(
        this.prependConstraintsWithParentProp(parentPath, item),
      );
    }
    return validationErrors;
  }
  prependConstraintsWithParentProp(parentPath, error) {
    const constraints = {};
    for (const key in error.constraints) {
      constraints[key] = `${parentPath}.${error.constraints[key]}`;
    }
    return Object.assign(Object.assign({}, error), { constraints });
  }

  extractionValidationErrors(validationErrors) {
    const res = iterate(validationErrors);

    const childrenMergeErrors = res.toArray().map((error: ValidationError) => {
      const childrenMergeError = this.mapChildrenToValidationErrors(error);
      return childrenMergeError;
    });

    const constraintsFilterErrors = iterate(childrenMergeErrors)
      .flatten()
      .filter((item: ValidationError) => !!item.constraints)
      .filter((item: ValidationError) => {
        return Object.keys(item.constraints).length > 0;
      })
      .toArray();

    const extractionErrors = constraintsFilterErrors.map((item) => {
      const classInstance = item.target;

      const classConstructor: Type<any> =
        classInstance.constructor as Type<any>;
      const classPropertyData = makeExampleByApiProperty(
        classConstructor,
        true,
      );
      const propertyKoName = classPropertyData[item.property] ?? item.property;
      const constantsValue = Object.values(item.constraints).shift() as string;
      const constantsKey = Object.keys(item.constraints).shift();
      const message = getErrorMessage(
        item.property,
        constantsKey,
        constantsValue,
      );

      return {
        classInstance: classConstructor.name,
        property: item.property,
        propertyKo: propertyKoName,
        message: message,
        // error: item,
      } as UnitValidateExceptionType;
    });
    return extractionErrors;
  }
}

function getErrorMessage(
  property: string,
  constantsKey: string,
  message: string,
): string {
  if (constantsKey === 'whitelistValidation') {
    return `${property} 는 포함되지 않은 속성입니다.`;
  } else {
    return message;
  }
}
