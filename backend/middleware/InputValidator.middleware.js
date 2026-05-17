import { validationResult } from "express-validator";
import { ApiError } from "./errorHandler.middleware.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    throw new ApiError(errorMessages, 422);
  }
  next();
};
