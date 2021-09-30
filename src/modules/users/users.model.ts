import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import userSchema from "./users.schema";
import { IUser } from "./users.types";

export const USER_MODEL_NAME = "User";

// @ts-ignore
userSchema.plugin(AutoIncrementFactory(mongoose.connection), {
  id: "user_ref",
  inc_field: "id",
});

export const UserModel = mongoose.model<mongoose.Document<IUser>>(
  USER_MODEL_NAME,
  userSchema,
  "users"
);
