import { registerAs } from '@nestjs/config';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary Winston 설정옵션
 */
export const winstonLoggerOptions = registerAs(
  'winstonLoggerOptions',
  (): winston.LoggerOptions => ({
    transports: [
      // DailyRotateFile 전송 객체 생성
      new DailyRotateFile({
        level: 'debug',
        filename: `${process.env.LOG_PATH}/debug/debug-%DATE%.log`, // 로그 파일 경로 및 이름 설정
        datePattern: 'YYYY-MM-DD', // 날짜 패턴 설정
        zippedArchive: true, // 압축 아카이브 여부 설정
        maxSize: '20m', // 로그 파일 최대 크기 설정
        maxFiles: '14d', // 로그 파일 최대 보존 기간 설정
        format: winston.format.combine(
          // 로그 포맷 설정
          winston.format.timestamp(), // 타임스탬프 추가
          winston.format.json(), // JSON 형식으로 로그 저장
        ),
      }),
      // DailyRotateFile 전송 객체 생성
      new DailyRotateFile({
        level: 'error',
        filename: `${process.env.LOG_PATH}/errors/error-%DATE%.log`, // 로그 파일 경로 및 이름 설정
        datePattern: 'YYYY-MM-DD', // 날짜 패턴 설정
        zippedArchive: false, // 압축 아카이브 여부 설정
        maxSize: '20m', // 로그 파일 최대 크기 설정
        maxFiles: '30d', // 로그 파일 최대 보존 기간 설정
        format: winston.format.combine(
          // 로그 포맷 설정
          winston.format.timestamp(), // 타임스탬프 추가
          winston.format.json(), // JSON 형식으로 로그 저장
        ),
      }),
      // 콘솔 출력 전송 객체 생성
      new winston.transports.Console({
        level: 'debug', // 로그 레벨 설정
        handleExceptions: true, // 예외 처리 여부 설정
        format: winston.format.combine(
          winston.format.colorize({ all: true }), // 로그에 색상 추가
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 타임스탬프 추가
          winston.format.simple(), // 간단한 로그 형식
          winston.format.errors({ stack: true }),
          winston.format.printf(({ level, message, context, timestamp }) => {
            const _head = `\x1b[32m[Winston]\x1b[0m`; // 색깔별 이스케이프문자열을 반환하는
            const _message = `\x1b[32m${message}\x1b[0m`;
            const _context = context ? `\x1b[33m[${context}]\x1b[0m` : '';
            const _timestamp = `\x1b[37m${timestamp}\x1b[0m`;
            const formattedMessage = `${_head} ${_timestamp} ${level} ${_context} ${_message}`;
            return formattedMessage;
          }),
        ),
      }),
    ],
    exitOnError: false, // 에러 발생 시 프로세스 종료 여부 설정
  }),
);
