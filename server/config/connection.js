import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/golf-courses-db"
    );
    console.log(">>> DB Connected");
  } catch (error) {
    console.log(error);
  }
};
