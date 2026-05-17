import mongoose from "mongoose";
import env from "./env.config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URL, {
      dbName: env.DB_NAME,
    });
    cosole.info(`MongoDB connected`);
  } catch (error) {
    console.error("MongoDB connection failed! 💥 Shutting down...");
    process.exit(1);
  }
};

export default connectDB;
