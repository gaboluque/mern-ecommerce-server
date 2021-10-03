import dotenv from "dotenv";

dotenv.config();

type nodeEnvs = "development" | "production" | "staging";
export const nodeEnv: nodeEnvs = (process.env.NODE_ENV as nodeEnvs) || "development";
export const frontUrl = process.env.FRONT_URL || "";
export const serverConf = {
  port: process.env.PORT || 8000,
};
export const dbConf = {
  host: process.env.MONGODB_URL || "",
  name: process.env.DATABASE_NAME || "",
};
export const authConf = {
  jwtSecret: process.env.JWT_SECRET || "",
};
