const Redis = require('ioredis');

class RedisClient {
  constructor() {
    if (!RedisClient.instance) {
      this.client = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      });
      RedisClient.instance = this;
    }
  }

  getClient() {
    return this.client;
  }

  checkKeyExists(key) {
    return this.getClient().exists(key);
  }

  setTemporaryKey(key, ttl) {
    this.getClient().expire(key, ttl);
  }
}

const redisClientSingleton = new RedisClient();
Object.freeze(redisClientSingleton); //  객체 immutable하게 만들어 변경 제약 === final

module.exports = {
  redisClientSingleton,
};
