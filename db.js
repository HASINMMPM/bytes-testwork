import mongoose from "mongoose";

import "dotenv/config";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect;