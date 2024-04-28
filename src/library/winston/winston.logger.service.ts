import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 기존 로거에서 윈스턴 로거 사용을 위한 서비스클래스
 */
@Injectable()
export class WinstonLoggerService {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const loggerOptions = this.configService.get(
      'winstonLoggerOptions',
    ) as winston.LoggerOptions;
    this.logger = winston.createLogger(loggerOptions);
  }

  log(message: string, context?: string) {
    if (context) {
      this.logger.info(`${message}`, { context: `${context}` });
    } else {
      this.logger.info(message);
    }
  }

  info(message: string, context?: string): void {
    if (context) {
      this.logger.info(`${message}`, { context: `${context}` });
    } else {
      this.logger.info(message);
    }
  }

  debug(message: string, context?: string): void {
    if (context) {
      this.logger.debug(`${message}`, { context: `${context}` });
    } else {
      this.logger.debug(message);
    }
  }

  verbose(message: string, context?: string): void {
    if (context) {
      this.logger.verbose(`${message}`, { context: `${context}` });
    } else {
      this.logger.verbose(message);
    }
  }

  error(message: string, context?: string): void {
    if (context) {
      this.logger.error(`${message}`, { context: `${context}` });
    } else {
      this.logger.error(message);
    }
  }

  warn(message: string, context?: string): void {
    if (context) {
      this.logger.warn(`${message}`, { context: `${context}` });
    } else {
      this.logger.warn(message);
    }
  }
}
