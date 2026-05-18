import mongoose from "mongoose";
import env from "./env.config.js";
export default async function connectDB() {
  try {
    const conn = await mongoose.connect(env.MONGODB_URL);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
}
