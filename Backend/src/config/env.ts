import dotenv from "dotenv";



  dotenv.config();


export const ENV = {
  PORT: parseInt(process.env.PORT || "8000", 10),
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET as string,
  CLIENT_URL: process.env.CLIENT_URL,
  MONGO_TEST_URI: process.env.MONGO_TEST_URI as string
};