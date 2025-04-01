import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module'; // Add this import

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRoot(),
    UserModule, // Add this line
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}