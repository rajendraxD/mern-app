import {
  ApiError,
  tryCatchHandler,
} from "../middleware/errorHandler.middleware.js";
import sanitize from "mongo-sanitize";
import axios from "axios";
export const register = tryCatchHandler(async (req, res) => {
  // Fetch placeholder users
  const {data: users} = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  // Return the fetched users
  res.status(200).json({
    status: "success",
    data: users,
  });
});
