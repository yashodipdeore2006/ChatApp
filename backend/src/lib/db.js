import mongoose from "mongoose"
import { ENV } from "./env.js";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log('🟢 Connected to MONGO DB successfully');
  } catch (error) {
    console.error("🔴 Error connection to MONGO DB : ", error);
    process.exit(1)
  }
}