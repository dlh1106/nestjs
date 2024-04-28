import { ValidationPipeOptions } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 전역 ValidationPipeOptions 설정
 */
export const validationPipeOptions = registerAs(
  'validationPipeOptions',
  (): ValidationPipeOptions => ({
    whitelist: true, // DTO 맴버가 아니면 전달자체가 되지 않는 옵션.
    forbidNonWhitelisted: true, // DTO 맴버가 아니면 요청을 막을 수 있음. error 를 반환 (whitelist: true와 같이 사용해야함.)
    transform: true, // 컨트롤러 매개변수 타입으로 transform
    validateCustomDecorators: true,
  }),
);
