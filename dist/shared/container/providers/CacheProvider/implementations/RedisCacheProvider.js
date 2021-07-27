"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const cache_1 = __importDefault(require("@config/cache"));
class RedisCacheProvider {
    constructor() {
        this.client = new ioredis_1.default(cache_1.default.config.redis);
    }
    async save(key, value) {
        await this.client.set(key, JSON.stringify(value));
    }
    async recover(key) {
        const data = await this.client.get(key);
        if (!data) {
            return null;
        }
        const parsedData = JSON.parse(data);
        return parsedData;
    }
    async invalidate(key) {
        await this.client.del(key);
    }
    async invalidatePrefix(prefix) {
        const keys = await this.client.keys(`${prefix}:*`);
        const pipeline = this.client.pipeline();
        keys.forEach(key => {
            pipeline.del(key);
        });
        await pipeline.exec();
    }
}
exports.default = RedisCacheProvider;
