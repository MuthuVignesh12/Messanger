
import dotenv from "dotenv";

dotenv.config();
const config = {
  mongodbUrl: process.env.MONGODB_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  isDev: process.env.NODE_ENV === "development"
}

export default config;