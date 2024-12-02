import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1); // process code 1 means exit with failure, 0 means success
    // wwv7DWhDW1MRFOZv
  }
};
