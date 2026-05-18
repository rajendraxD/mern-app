
  import env from "../config/env.js";
  import amqplib from "amqplib";
  
  const RABBIT_URL = env.RABBIT_URL || "amqp://localhost";

  export const getChannel = async () => {
    const conn = await amqplib.connect(RABBIT_URL);
    const ch = await conn.createChannel();
    await ch.assertQueue("item-events", { durable: true });
    return ch;
  };

  export const publishEvent = async (type, payload) => {
    const ch = await getChannel();
    const msg = Buffer.from(JSON.stringify({ type, payload }));
    ch.sendToQueue("item-events", msg, { persistent: true });
    await ch.close();
  };