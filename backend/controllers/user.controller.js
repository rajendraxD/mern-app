import { tryCatchHandler } from "../middleware/errorHandler.middleware.js";
import axios from "axios";
import {
  isRedisConnected,
  redisGetJson,
  redisSetJson,
} from "../utils/redis.utils.js";

export const register = tryCatchHandler(async (req, res) => {
  let users;

  // Check cache
  if (isRedisConnected()) {
    const cachedUsers = await redisGetJson("users:all");

    if (cachedUsers) {
      console.log("Users fetched from Redis");

      return res.status(200).json({
        status: "success",
        source: "redis",
        data: cachedUsers,
      });
    }
  }

  // Fetch from API
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  users = data;

  // Save to Redis (1 hour cache)
  if (isRedisConnected()) {
    await redisSetJson("users:all", users, 3600);
  }

  res.status(200).json({
    status: "success",
    data: users,
  });
});