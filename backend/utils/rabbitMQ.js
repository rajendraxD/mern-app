import env from "../config/env.config.js";
import amqplib from "amqplib";

const RABBIT_URL = env.RABBIT_URL || "amqp://localhost";

let channel;

export const connectRabbitMQ = async () => {
  const connection = await amqplib.connect(
    env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672",
  );

  channel = await connection.createChannel();

  await channel.assertQueue("item_events", {
    durable: true,
  });

  console.log("RabbitMQ connected");
};

export const publishEvent = async (type, payload) => {
  if (!channel) {
    console.warn("RabbitMQ channel not ready");
    return;
  }

  const event = {
    type,
    payload,
    createdAt: new Date().toISOString(),
  };

  channel.sendToQueue("item_events", Buffer.from(JSON.stringify(event)), {
    persistent: true,
  });
  await channel.close();
};
