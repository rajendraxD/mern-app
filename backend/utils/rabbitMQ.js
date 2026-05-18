import env from "../config/env.config.js";
import amqplib from "amqplib";

const RABBIT_URL = env.RABBIT_URL || "amqp://localhost";

let channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect(env.RABBITMQ_URL);

    channel = await connection.createChannel();
    console.log("✅ RabbitMQ connected");
  } catch (err) {
    console.error("❌ Failed to connect to RabbitMQ", err);
  }
};

export const publishEvent = async (type, payload) => {
  if (!channel) {
    console.warn("RabbitMQ channel not ready");
    return;
  }
  await channel.assertQueue(type, {
    durable: true,
  });

  channel.sendToQueue(type, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
  });
  // await channel.close();
};

export const invalidateCacheJob = async (cacheKey) => {
  if(!env.REDIS_ENABLED){
    return;
  }
  try {
    const payload = {
      action: "invalidate_cache",
      key: cacheKey,
    };
    await publishEvent("cache_invalidate", payload);
    console.log("✅ Cache invalidation event published to RabbitMQ");
  } catch (err) {
    console.error("❌ Failed to Publish cache on RabbitMQ", err);
  }
};
