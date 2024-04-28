import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.STORE_DB_HOST || process.env.DB_HOST,
  port: parseInt(process.env.STORE_DB_PORT || process.env.DB_PORT),
  database: process.env.STORE_DB_DATABASE || process.env.DB_DATABASE,
  username: process.env.STORE_DB_USER || process.env.DB_USER,
  password: process.env.STORE_DB_PASSWORD || process.env.DB_PASSWORD,
  migrations: ['migration-resource/migrations/**'],
  migrationsTableName: 'migration_tb',
});