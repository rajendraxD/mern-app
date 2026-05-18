import "dotenv/config";
import express from "express";
import env from "./config/env.config.js";
import configureCors from "./config/cors.config.js";
import { addTimeStamp, requestLogger } from "./middleware/custom.middleware.js";
import { globalErrorHandler } from "./middleware/errorHandler.middleware.js";
import { urlVersioning } from "./middleware/urlVersioning.middleware.js";
import { rateLimiter } from "./middleware/rateLimiter.middleware.js";
import userRouter from "./routers/user.router.js";
import itemRouter from "./routers/item.router.js";
//connect to redis
import "./utils/redis.utils.js";
import connectDB from "./config/db.config.js";

// Uncaught Exception coming from synchronous code
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

//connect database
await connectDB();

const app = express();
// Middleware
app.use(requestLogger, addTimeStamp);
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(configureCors());
app.use(rateLimiter());

// Routes
app.use(urlVersioning("v1"));
app.get("/api/v1/", (req, res) => {
  res.json({ status: "success", message: "API is healthy" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRouter);

//global error handler
app.use(globalErrorHandler);

// Start the server
const PORT = env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Unhandled Rejection coming from asynchronous code like database connection
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
