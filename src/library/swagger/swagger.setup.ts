import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { recursive } from './utils';

export async function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
) {
  const options = new DocumentBuilder()
    .setTitle(await configService.getOrThrow('SWAGGER_TITLE')) // 설정할 Swagger 문서의 제목
    .setDescription(await configService.getOrThrow('SWAGGER_DESCRIPTION')) // Swagger 문서의 설명
    .setVersion(await configService.getOrThrow('SWAGGER_VERSION')) // Swagger 문서의 버전을 지정합니다.
    // .addServer(await configService.getOrThrow('GATEWAY_URL'))
    // .addServer(await configService.getOrThrow('STORE_SERVICE_URL'))
    .build();

  const swaggerOptions: SwaggerCustomOptions = {};

  const document = SwaggerModule.createDocument(app, options); // NestJS 애플리케이션과 Swagger 설정을 기반으로 Swagger 문서를 생성합니다.

  // Define common error object for all API responses
  const errorObject = {
    properties: {
      code: {
        type: 'string',
        example: '서브 코드',
      },
      message: {
        type: 'string',
        example: '메시지',
      },
    },
  };

  // Define common validationError object for all API responses
  const validationError = {
    properties: {
      code: {
        type: 'enum',
        example: '서브 코드 VALIDATION-0000 일시 파라미터 유효성 검증 실패',
      },
      message: {
        type: 'array',
        items: {
          type: 'object',
          properties: recursive({
            property: '예외 발생 파라미터 명',
            propertyKo: '파라미터 한글명',
            message: '메시지',
          }),
        },
      },
    },
  };

  // Define error response schemas
  document.components.schemas.ErrorResponse = errorObject;
  document.components.schemas.ValidationError = validationError;

  SwaggerModule.setup(
    await configService.getOrThrow('SWAGGER_PATH'),
    app,
    document,
    { swaggerOptions },
  ); // Swagger 문서를 지정된 경로에 연결하여 API 문서화를 설정합니다.
}
