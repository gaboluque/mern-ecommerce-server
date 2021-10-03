import mongoose from "mongoose";
import { dbConf, nodeEnv } from "../config";

export const connectDB = (): void => {
  if (nodeEnv !== "production") {
    mongoose.set("debug", true);
  }

  mongoose.connect(`${dbConf.host}/${dbConf.name}`, {}, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
};
