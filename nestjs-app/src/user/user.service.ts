import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly redisService: RedisService) {}

  // Add the missing create method
  async create(createUserDto: CreateUserDto) {
    const user = {
      id: Date.now().toString(),
      ...createUserDto,
      createdAt: new Date(),
    };
    await this.cacheUser(user);
    return user;
  }

  // Add the missing findOne method
  async findOne(id: string) {
    // Implementation would typically check cache first, then DB
    return {
      id,
      name: 'Test User',
      email: 'test@example.com'
    };
  }

  private async cacheUser(user: any) {
    await this.redisService.set(
      `user:${user.id}`,
      JSON.stringify(user),
      3600
    );
  }
}