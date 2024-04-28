import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters';
import {
  GlobalLoggingInterceptor,
  GlobalResponseTransformInterceptor,
} from './common/interceptors';
import { ConfigureModule } from './configures/configure.module';
import { DatabaseModule } from './database/database.module';
import { DebugModule } from './library/debug/debug.module';
import { WinstonModule } from './library/winston/winston.module';
import { HttpModule } from '@nestjs/axios';
import { ErrorDefineModule } from './common/errors-define';
import { GlobalValidationPipe } from './common/pipes/validate/global-validate.pipe';
import { OrderModule } from './provided-modules/order/order.module';
import { CartModule } from './provided-modules/cart/cart.module';
import { UserModule } from './provided-modules/user/user.module';
import { ReviewModule } from './provided-modules/review/review.module';
import { GoodsModule } from './provided-modules/goods/goods.module';
import { AuthModule } from './provided-modules/auth/auth.module';

const coreModules = [
  ConfigureModule,
  DatabaseModule,
  ErrorDefineModule.register([]),
  HttpModule,
];
const libraryModules = [DebugModule.forRoot({}), WinstonModule];

@Module({
  imports: [
    ...coreModules,
    ...libraryModules,
    OrderModule,
    CartModule,
    UserModule,
    ReviewModule,
    GoodsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: async (configService: ConfigService) =>
        new GlobalValidationPipe(
          await configService.getOrThrow('validationPipeOptions'),
        ),
      inject: [ConfigService],
    },
    /*
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    */
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseTransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggingInterceptor,
    },
  ],
})
export class AppModule { }
