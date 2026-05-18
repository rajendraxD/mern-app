import amqplib from "amqplib";
import Redis from "ioredis";
import env from "../config/env.config.js";
import { isRedisConnected, redisDel } from "../utils/redis.utils.js";
import { redisClient } from "../utils/redis.utils.js";

const RABBITMQ_URL = env.RABBITMQ_URL || "amqp://localhost";

export const startItemConsumer = async () => {
  const conn = await amqplib.connect(RABBITMQ_URL);
  const ch = await conn.createChannel();
  await ch.assertQueue("item-events", { durable: true });

  ch.consume(
    "item-events",
    async (msg) => {
      if (!msg) return;
      const { type, payload } = JSON.parse(msg.content.toString());

      // Example: invalidate a derived cache or trigger other services
      if (type === "item.deleted") {
        // maybe clean up related list caches
        await redisDel(`items:getAllItems`);

        // maybe clean up related item cache
        if (payload?.id) {
          await redisDel(`items:${payload.id}`);
        }

        console.log(`Redis cache cleared for ${type}`);
      }

      // acknowledge
      ch.ack(msg);
    },
    { noAck: false },
  );
};
