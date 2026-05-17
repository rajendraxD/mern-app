import rateLimit from "express-rate-limit";

export const rateLimiter = () => {
  return rateLimit({
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });
};
