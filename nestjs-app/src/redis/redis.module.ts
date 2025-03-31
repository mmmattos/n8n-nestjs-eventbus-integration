// src/redis/redis.module.ts
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'REDIS_CLIENT',
          useFactory: (config: ConfigService) => {
            return new Redis({
              host: config.get('REDIS_HOST') || 'localhost',
              port: parseInt(config.get('REDIS_PORT') || '6379', 10),
              password: config.get('REDIS_PASSWORD'),
              db: parseInt(config.get('REDIS_DB') || '0', 10),
            });
          },
          inject: [ConfigService],
        },
        RedisService,
      ],
      exports: ['REDIS_CLIENT', RedisService],
    };
  }
}