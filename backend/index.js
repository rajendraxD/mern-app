import "dotenv/config";
import express from "express";
import env from "./config/env.config.js";
import configureCors from "./config/cors.config.js";
import { addTimeStamp, requestLogger } from "./middleware/custom.middleware.js";
import { globalErrorHandler } from "./middleware/errorHandler.middleware.js";
import { urlVersioning } from "./middleware/urlVersioning.middleware.js";
import { rateLimiter } from "./middleware/rateLimiter.middleware.js";

const app = express();
// Middleware
app.use(requestLogger, addTimeStamp);
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(configureCors());
app.use(rateLimiter());

// Routes
app.use(urlVersioning("v1"));
// app.use("/api/v1", userRouter);
app.get("/api/v1/", (req, res) => {
  res.json({ status: "success", message: "API is healthy" });
});

//global error handler
app.use(globalErrorHandler);

// Start the server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
