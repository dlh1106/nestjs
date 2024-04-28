import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TableNamingStrategy } from 'src/database/strategy';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary TypeOrmModuleOptions 설정
 */
export const typeOrmOption = registerAs(
  'typeOrmOption',
  (): TypeOrmModuleOptions => ({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true, // 이 옵션을 true 로 줌으로서, entity를 수동으로 알릴 필요가 없음.
    subscribers: [],
    synchronize: true, // 동기화 여부
    logging: false,
    namingStrategy: new TableNamingStrategy(),
  }),
);
