"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const redis_1 = __importDefault(require("redis"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const redisClient = redis_1.default.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
});
const limiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5,
    duration: 1,
});
async function rateLimiter(request, response, next) {
    try {
        await limiter.consume(request.ip);
        return next();
    }
    catch (err) {
        throw new AppError_1.default('Too many requests', 429);
    }
}
exports.default = rateLimiter;
