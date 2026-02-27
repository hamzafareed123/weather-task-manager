import mongoose from "mongoose";
import { ENV } from "../config/env";

beforeAll(async () => {
  await mongoose.connect(ENV.MONGO_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});  
  }
});