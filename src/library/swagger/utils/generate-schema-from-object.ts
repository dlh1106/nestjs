import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * @author 이기봉
 * @since 2023.08.01
 * @description javascript object 를 가지고 스웨거에서 필요한 schema 생성
 */
export function generateSchemaFromObject(obj: Object): SchemaObject {
  const schema = {
    properties: recursive(obj),
  };
  return schema;
}

export function recursive(obj: any): Record<string, SchemaObject> {
  const schema: Record<string, SchemaObject> = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && Array.isArray(obj[key])) {
      schema[key] = {
        type: 'array',
        items: {
          type: 'object',
          properties: recursive(obj[key][0]),
        },
      };
    } else if (typeof obj[key] === 'object') {
      schema[key] = {
        type: 'object',
        properties: recursive(obj[key]),
      };
    } else {
      schema[key] = { type: typeof obj[key], example: obj[key] };
    }
  }
  return schema;
}
