import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

 const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("database connected"));
};

export default connectDb

