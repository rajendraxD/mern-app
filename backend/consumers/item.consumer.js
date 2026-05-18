import amqplib from "amqplib";
import Redis from "ioredis";
import env from "../config/env.config.js";
import { isRedisConnected, redisDel } from "../utils/redis.utils.js";
import { redisClient } from "../utils/redis.utils.js";

const RABBITMQ_URL = env.RABBITMQ_URL;

export const startItemConsumer = async () => {
  try {
    const conn = await amqplib.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue("item-events", { durable: true });

    const queueName = "invalidate_cache"; //publishToQueue
    await channel.assertQueue(queueName, { durable: true });

    console.log("✅ Item-consumer is ready to receive messages...");

    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        try {
          const content = JSON.parse(msg.content.toString());
          console.log("Received cache invalidate event:", content);

          if (content.action === "invalidate_cache") {
            for (const pattern of content.key) {
              const keys = await redisClient.keys(pattern);
              if (keys.length > 0) {
                await redisDel(keys);

                console.log(
                  `Item consumer invalidated cache for ${pattern}: ${keys.length}`,
                );

                //action after cache invalidation - publish event to rabbitMQ
              }
            }
          }
          channel.ack(msg);
        } catch (err) {
          console.error(
            "❌ Error processing cache invalidation in item consumer",
            err,
          );
          channel.nack(msg, false, true); // Reject the message without requeueing
        }
      }
    });
  } catch (err) {
    console.error(
      "❌ Failed to start item consumer for cache invalidation",
      err,
    );
  }
};
