import {
  asyncHandler,
  ApiError,
} from "../middleware/errorHandler.middleware.js";
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiError("Please provide username, email and password.", 400);
  }
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
  });
});
