import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import bookRouter from "./routes/book.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/books", bookRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});
