import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDb Database${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDb connection error\n${error}`);
  }
};

export default connectDB;
