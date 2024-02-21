const Redis = require('ioredis');

class RedisClientSingleton {
  constructor() {
    if (!RedisClientSingleton.instance) {
      this.client = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      });
      RedisClientSingleton.instance = this;
    }
  }

  getClient() {
    return this.client;
  }
}

const redisClientSingleton = new RedisClientSingleton();
Object.freeze(redisClientSingleton); //  객체 immutable하게 만들어 변경 제약 === final

module.exports = redisClientSingleton;
