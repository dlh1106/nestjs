import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  typeOrmOption,
  validationPipeOptions,
  winstonLoggerOptions,
} from './options';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 설정옵션 관리모듈
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [
        typeOrmOption,
        validationPipeOptions,
        winstonLoggerOptions,
      ],
    }),
  ],
})
export class ConfigureModule { }
