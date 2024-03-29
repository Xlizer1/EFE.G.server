import dotenv from "dotenv";
import express from "express";
import router from "./router.js";
import connect from "./utils/connect.js";

dotenv.config();

const app = express();

const { PORT } = process.env;

const start = async () => {
  try {
    await connect();

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    router(app);

    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
