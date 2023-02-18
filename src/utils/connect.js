import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { dbConnectionURI } = process.env;

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbConnectionURI).then(() => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log("Error while connecting to the database :", error);
  }
};

export default connect;
