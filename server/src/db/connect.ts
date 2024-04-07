import mongoose from "mongoose";

const connectDataBase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error.message);
  }
}

export default connectDataBase;
