import { ExamplesObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ErrorDefine } from 'src/common/errors-define';

/**
 * @author 이기봉
 * @since 2023.08.01
 * @description 정의된 ErrorDefine 을 가지고 스웨거에서 필요한 에러 응답 ExamplesObject 생성
 */
export function makeErrorExamplesByErrorDefine(
  errorDefine: ErrorDefine,
  errorDefineCodes?: string[],
): ExamplesObject {
  const targetErrorDefine = errorDefineCodes
    ? errorDefineCodes
    : Object.keys(errorDefine);

  return targetErrorDefine.reduce((acc, code) => {
    if (errorDefine[code]) {
      acc[code] = {
        value: {
          error: {
            code,
            message: errorDefine[code].message,
          },
        },
        externalValue: errorDefine[code].exampleTitle,
        description: errorDefine[code].exampleDescription,
      };
    }
    return acc;
  }, {});
}
