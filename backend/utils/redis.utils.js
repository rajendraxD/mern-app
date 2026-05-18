import env from "../config/env.config.js";
import Redis from "ioredis";

let redisClient = null;
const REDIS_EXPIRY_SECONDS = env.REDIS_EXPIRY_SECONDS; // 1 hour

function initRedis() {
  if (env.REDIS_ENABLED === "true") {
    console.info("Redis is disabled");
    return;
  }

  redisClient = new Redis(env.REDIS_URL);
  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  redisClient.on("connect", () => console.info("Redis Client Connected"));
}

export async function redisGet(key) {
  if (!redisClient) return null;
  return await redisClient.get(key);
}

export async function redisSet(
  key,
  value,
  expirySeconds = REDIS_EXPIRY_SECONDS,
) {
  if (!redisClient) return null;
  if (expirySeconds) {
    return await redisClient.set(key, value, "EX", expirySeconds);
  }
  return await redisClient.set(key, value);
}

export async function redisDel(key) {
  if (!redisClient) return null;
  return await redisClient.del(key);
}

export async function redisExists(key) {
  if (!redisClient) return false;
  return await redisClient.exists(key);
}

export async function redisGetJson(key) {
  const data = await redisGet(key);
  return data ? JSON.parse(data) : null;
}

export async function redisSetJson(
  key,
  value,
  expirySeconds = REDIS_EXPIRY_SECONDS,
) {
  return await redisSet(key, JSON.stringify(value), expirySeconds);
}

// Helper function
export function isRedisConnected() {
  return redisClient !== null;
}
initRedis();
