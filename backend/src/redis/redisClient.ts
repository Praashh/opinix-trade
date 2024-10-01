import Redis from "ioredis";
import { createClient } from "redis";

export const redisClient = new Redis(process.env.REDIS_URL!);

redisClient.on("error", (err) => {
  console.error("Error connecting to redis", err);
});


