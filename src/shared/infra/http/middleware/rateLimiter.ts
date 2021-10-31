import { Request, Response, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'

import AppError from '@shared/errors/AppError'

let redisClient: any = {}

if (!process.env.REDIS_TLS_URL) {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined
  })
} else {
  const redisURL = (new URL(process.env.REDIS_URL) as unknown) as {
    port: number
    hostname: string
    password: string
  }
  redisClient = redis.createClient(redisURL.port, redisURL.hostname, {
    no_ready_check: true
  })
  redisClient.auth(redisURL.password)
  // redisClient = redis.createClient(process.env.REDIS_TLS_URL, {
  //   tls: {
  //     rejectUnauthorized: false
  //   }
  // })
}

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
