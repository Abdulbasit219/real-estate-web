import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB);
    console.log(`successfully connected to DB ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
