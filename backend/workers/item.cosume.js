import amqplib from "amqplib";
import redis from "redis";

const RABBIT_URL = env.RABBIT_URL || "amqp://localhost";
const redisClient = redis.createClient();
await redisClient.connect();

const start = async () => {
  const conn = await amqplib.connect(RABBIT_URL);
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
        await redisClient.del(`items:all`);
      }

      // acknowledge
      ch.ack(msg);
    },
    { noAck: false },
  );
};

start().catch(console.error);
