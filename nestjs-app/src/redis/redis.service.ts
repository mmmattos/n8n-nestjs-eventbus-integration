// src/redis/redis.service.ts
import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly client: Redis,
  ) {}

  async set(key: string, value: any, ttl?: number): Promise<'OK'> {
    if (ttl) {
      return this.client.set(key, JSON.stringify(value), 'EX', ttl);
    }
    return this.client.set(key, JSON.stringify(value));
  }

  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async publish<T = any>(channel: string, message: T): Promise<number> {
    return this.client.publish(channel, JSON.stringify(message));
  }

  // Add other required methods
  async quit(): Promise<void> {
    await this.client.quit();
  }
}