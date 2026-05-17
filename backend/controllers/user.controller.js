import {
  ApiError,
  tryCatchHandler,
} from "../middleware/errorHandler.middleware.js";
import sanitize from "mongo-sanitize";
export const register = tryCatchHandler(async (req, res) => {
  const { username, email, password } = sanitize(req.body);

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
  });
});
