// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule], // Makes RedisService available
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // If other modules need UserService
})
export class UserModule {}