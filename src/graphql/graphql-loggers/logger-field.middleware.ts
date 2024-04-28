import { Logger } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 필드 처리 시간 로깅
 * - 이 처리시간으로 필드 복잡성 수치를 판단
 */
export const loggerFieldMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const startTime = Date.now(); // 처리 시작 시간 기록
  const fieldName = ctx.info.fieldName;

  const value = await next(); // 값 처리.
  const duration = Date.now() - startTime; // 처리 시간
  Logger.log(`+${duration}ms ${value}`, fieldName);
  return value;
};
