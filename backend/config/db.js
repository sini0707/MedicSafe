import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
     export const baseURL = "https://medicsafe.online/api/v1";
    //  export const baseURL = "http://localhost:8000/api/v1";

export default connectDB;