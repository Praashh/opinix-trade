import { createClient } from "redis";
import { config } from 'dotenv';
config();

const redis = createClient({
  //   password: process.env.REDIS_PASSWORD, // revert while pushing
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT as unknown as number,
  },
});
(async function connectClient() {
  await redis.connect();
  console.log("connected to redis server");
})();

export default redis;
