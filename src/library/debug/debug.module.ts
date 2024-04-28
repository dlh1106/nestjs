import { Module, DynamicModule } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DebugExplorer } from './debug.explorer';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './debug.module-definition';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 디버그 데커레이터 사용을 위한 모듈
 */
@Module({})
export class DebugModule extends ConfigurableModuleClass {
  public static override forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const module = super.forRoot(options);

    if (process.env.NODE_ENV !== 'production') {
      (module.imports ||= []).push(DiscoveryModule);
      (module.providers ||= []).push(DebugExplorer);
    }

    return module;
  }
}
