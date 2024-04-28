import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonLoggerService } from './library/winston/winston.logger.service';
import { setupSwagger } from './library/swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 프로젝트내 설정 불러오기
  const configService = app.get(ConfigService);

  // 애플리케이션 로거를 winston 으로 대체
  app.useLogger(new WinstonLoggerService(configService));

  // 애플리케이션의 Global Prefix 설정
  app.setGlobalPrefix(await configService.getOrThrow('API_STORE_PREFIX'));

  if (['development'].includes(await configService.getOrThrow('NODE_ENV'))) {
    // SWAGGER SETUP
    await setupSwagger(app, configService);

    // graphql 파비콘요청 때문에 추가.
    app.use('/favicon.ico', (req, res) => {
      res.sendStatus(200);
    });
  }

  await app.listen(3000);
}
bootstrap();
