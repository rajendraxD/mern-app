import env from "./env.config.js";
import Redis from "ioredis";

const redisClient = new Redis(env.REDIS_URL);
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.info("Redis Client Connected"));

export default redisClient;