import { Type } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger';

/**
 * @author 이기봉
 * @since 2023.08.01
 * @description swagger ApiProperty 데커레이터의 ApiPropertyOptions 값을 가지고 example 을 생성
 * @warning DTO생성자 재정의 한 경우 에러발생함
 */
export function makeExampleByApiProperty<T>(
  dtoClass: Type,
  isOnlyDescription?: boolean,
): T {
  const exampleData = {};
  const propertiesArray: string[] =
    Reflect.getMetadata(API_MODEL_PROPERTIES_ARRAY, dtoClass.prototype) || [];

  const properties: ApiPropertyOptionsWithFieldName[] = propertiesArray.map(
    (field) => {
      const fieldName = field.slice(1); // 앞에 ':' 문자 제거
      return {
        ...Reflect.getMetadata(
          API_MODEL_PROPERTIES,
          dtoClass.prototype,
          fieldName,
        ),
        fieldName,
      };
    },
  );

  properties.map((property) => {
    const propertyType = property.type;
    if (propertyType) {
      if (isPrimitiveType(propertyType)) {
        processPrimitiveType(property);
      } else if (isLazyTypeFunc(propertyType as Function | Type<unknown>)) {
        processLazyType(property);
      } else {
        processGeneralType(property);
      }
    }
  });

  function processPrimitiveType(property) {
    if (typeof property.example !== 'undefined' && isOnlyDescription !== true) {
      exampleData[property.fieldName] = property.example;
    } else {
      exampleData[property.fieldName] = property.description;
    }
  }

  function processLazyType(property) {
    const constructorType = (property.type as Function)();
    if (Array.isArray(constructorType)) {
      exampleData[property.fieldName] = [
        makeExampleByApiProperty(constructorType[0]),
      ];
    } else if (property.isArray) {
      exampleData[property.fieldName] = [
        makeExampleByApiProperty(constructorType),
      ];
    } else {
      exampleData[property.fieldName] =
        makeExampleByApiProperty(constructorType);
    }
  }

  function processGeneralType(property) {
    if (property.isArray) {
      exampleData[property.fieldName] = [
        makeExampleByApiProperty(property.type),
      ];
    } else {
      exampleData[property.fieldName] = makeExampleByApiProperty(property.type);
    }
  }

  return exampleData as T;
}

/**
 * @author swagger
 * @description 메타데이터 키의 접두사(prefix)로 사용되는 값.
 * @constant /node_modules/@nestjs/swagger/dist/constants.js
 */
const DECORATORS_PREFIX = 'swagger';

/**
 * @author swagger
 * @description API Model 속성에 대한 메타데이터 키
 * @constant /node_modules/@nestjs/swagger/dist/constants.js
 */
const API_MODEL_PROPERTIES = `${DECORATORS_PREFIX}/apiModelProperties`;

/**
 * @author swagger
 * @description API Model 배열 속성에 대한 메타데이터 키
 * @constant /node_modules/@nestjs/swagger/dist/constants.js
 */
const API_MODEL_PROPERTIES_ARRAY = `${DECORATORS_PREFIX}/apiModelPropertiesArray`;

/**
 * @description ApiPropertyOption에 fieldName 추가
 */
type ApiPropertyOptionsWithFieldName = ApiPropertyOptions & {
  fieldName: string;
};

/**
 * @author dhkehd2
 * @example DTO 맴버가 다음과 같은 구조 일경우 필요하다.
 *
 * @ApiProperty({ type: () => ResponseProductDto })
 * @Type(() => ResponseProductDto)
 * @Expose()
 * data: ResponseProductDto;
 */
function isLazyTypeFunc(type: unknown): type is { type: Function } {
  return typeof type === 'function' && (type as Function).name === 'type';
}

/**
 * @author dhkehd2
 * @description 원시 타입 확인
 */
function isPrimitiveType(type: unknown): boolean {
  return [
    String,
    Boolean,
    Number,
    null,
    undefined,
    'string',
    'boolean',
    'number',
    'null',
    'undefined',
  ].some((item) => item === type);
}
