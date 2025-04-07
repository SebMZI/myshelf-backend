import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "FETCH All users" });
});

userRouter.get("/:id", (req, res) => {});

userRouter.put("/:id", (req, res) => {});

userRouter.delete("/:id", (req, res) => {});

export default userRouter;
