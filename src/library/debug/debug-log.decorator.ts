import { Logger } from '@nestjs/common';
import { performance } from 'perf_hooks';
// import { isAsyncFunction } from 'util/types'; // Node.js v15.3.0 이상에서 사용가능
import { types } from 'util';
import * as CircularJSON from 'circular-json'; // 순환참조 객체 string 파싱하기 위한 패키지
import type { Func } from './debug.interface';

const MethodLog =
  (context?: string): MethodDecorator =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): void => {
    const originalMethod: unknown = descriptor.value;
    if (typeof originalMethod !== 'function') {
      return;
    }
    const log = function (time: number, args: unknown[]): void {
      const ownKey = typeof target === 'function' ? `${target.name}` : '';
      const name = context
        ? `${ownKey}.${String(propertyKey)}`
        : String(propertyKey);

      const params =
        args[0] && args.length > 0
          ? `(${CircularJSON.stringify(args, null, 2)})`
          : '()';
      Logger.debug(`${name}${params} +${time.toFixed(2)}ms`, context || ownKey);
    };
    if (types.isAsyncFunction(originalMethod)) {
      descriptor.value = async function (...args: unknown[]): Promise<unknown> {
        const start = performance.now();
        const result: unknown = await originalMethod.apply(this, args);
        const end = performance.now();
        log(end - start, args);
        return result;
      };
    } else {
      descriptor.value = function (...args: unknown[]): unknown {
        const start = performance.now();
        const result: unknown = originalMethod.apply(this, args);
        const end = performance.now();
        log(end - start, args);
        return result;
      };
    }
  };

const ClassLog =
  (context?: string): ClassDecorator =>
  (target: Func): void => {
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
    for (const [propertyKey, descriptor] of Object.entries(descriptors)) {
      const originalMethod: unknown = descriptor.value;
      if (
        !(originalMethod instanceof Function) ||
        propertyKey === 'constructor'
      ) {
        continue;
      }
      MethodLog(context)(target, propertyKey, descriptor);
      if (originalMethod !== descriptor.value) {
        const metadataKeys = Reflect.getMetadataKeys(originalMethod);
        for (const key of metadataKeys) {
          const value: unknown = Reflect.getMetadata(key, originalMethod);
          Reflect.defineMetadata(key, value, <object>descriptor.value);
        }
      }
      Object.defineProperty(target.prototype, propertyKey, descriptor);
    }
  };

export const DebugLog =
  (context?: string): ClassDecorator & MethodDecorator =>
  (
    target: object,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor,
  ): void => {
    if (!descriptor) {
      ClassLog(context)(<Func>target);
    } else if (propertyKey) {
      MethodLog(context)(target, propertyKey, descriptor);
    }
  };
