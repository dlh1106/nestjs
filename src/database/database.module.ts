import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        await configService.getOrThrow('typeOrmOption'),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
