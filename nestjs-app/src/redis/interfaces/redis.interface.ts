// 1. Redis connection configuration
export interface RedisConnectionConfig {
    host: string;
    port: number;
    password?: string;
    db?: number;
    tls?: boolean;
    retryStrategy?: (times: number) => number | void;
  }
  
  // 2. Redis key-value pair with TTL
  export interface RedisSetOptions {
    key: string;
    value: any;
    ttl?: number; // in seconds
    mode?: 'EX' | 'PX' | 'NX' | 'XX'; // Redis SET modes
  }
  
  // 3. Pub/Sub message format
  export interface RedisMessage<T = any> {
    channel: string;
    message: T;
    timestamp: Date;
  }
  
  // 4. Service method signatures
  export interface IRedisService {
    set(options: RedisSetOptions): Promise<boolean>;
    get<T = any>(key: string): Promise<T | null>;
    publish<T = any>(channel: string, message: T): Promise<number>;
    subscribe(channel: string): Promise<void>;
    unsubscribe(channel: string): Promise<void>;
    quit(): Promise<void>;
  }
  
  // 5. Stream payload example (optional)
  export interface RedisStreamPayload {
    stream: string;
    values: Record<string, string | number>;
    id?: string;
  }