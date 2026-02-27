import express from "express";
import { ENV } from "./config/env";
import userRouter from "./routes/user.routes";
import todoRouter from "./routes/todo.routes";
import { dbConnect } from "./config/db";
import { OutputHandler } from "./middleware/outputHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true,
}));

app.use("/auth", userRouter);
app.use("/todo", todoRouter);

app.use((error: any, req: any, res: any, next: any) => {
  (res as any).error = error;
  const status =
    error instanceof Error &&
    "statusCode" in error &&
    typeof (error as any).statusCode === "number"
      ? (error as any).statusCode
      : 500;
  OutputHandler(status, req, res, next);
});

if (process.env.NODE_ENV !== "test") {
  dbConnect();
  app.listen(ENV.PORT, () => {
    console.log("Sever Running on Port", ENV.PORT);
  });
}

export default app;