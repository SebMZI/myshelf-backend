import { Router } from "express";
import { createBook } from "../controllers/book.controllers.js";
import authorize from "../middlewares/auth.middleware.js";

const bookRouter = Router();

bookRouter.get("/", (req, res, next) => {
  res.send({ message: "GET all books" });
});

bookRouter.get("/:id", (req, res, next) => {
  res.send({ message: "GET a book" });
});

bookRouter.post("/", authorize, createBook);

bookRouter.put("/:id", (req, res, next) => {
  res.send({ message: "PUT a book" });
});

bookRouter.delete("/:id", (req, res, next) => {
  res.send({ message: "DELETE a book" });
});

export default bookRouter;
