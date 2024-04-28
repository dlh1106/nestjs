import { Logger } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

/**
 * @author 이기봉
 * @augment_1 class
 * @augment_2 plain
 * @return plainToInstance(class, plain, { excludeExtraneousValues: true, enableImplicitConversion: true })
 */
export function commonPlainToInstance<T>(
  cls: ClassConstructor<T>,
  plain: Object | Object[],
): T {
  Logger.debug(`${cls.name}`, commonPlainToInstance.name);
  return plainToInstance(cls, plain, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });
}
