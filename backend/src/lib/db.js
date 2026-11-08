import mongoose from "mongoose"
import dotenv from 'dotenv'

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Connected to MONGO DB successfully');
  } catch (error) {
    console.error("🔴 Error connection to MONGO DB : ", error);
    process.exit(1)
  }
}