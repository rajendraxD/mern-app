import { tryCatchHandler } from "../middleware/errorHandler.middleware.js";
import axios from "axios";
import {
  isRedisConnected,
  redisGetJson,
  redisSetJson,
} from "../utils/redis.utils.js";

export const register = tryCatchHandler(async (req, res) => {
  // Fetch from API
  const { data: users } = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );

  res.status(200).json({
    status: "success",
    data: users,
  });
});
