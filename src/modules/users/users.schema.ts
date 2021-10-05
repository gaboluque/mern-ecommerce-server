import mongoose from "mongoose";
import { IUser, userRoleList } from "./users.types";
import { LooseObject } from "../../lib/commonTypes";

type LeanUser = Omit<IUser, "_id" | "id" | "__v">;

const userSchemaFields: Record<keyof LeanUser, LooseObject> = {
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: {
      values: userRoleList,
    },
  },
  address: {
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
  },
};

const userSchema = new mongoose.Schema(userSchemaFields, {
  _id: true,
  timestamps: true,
});

export default userSchema;
