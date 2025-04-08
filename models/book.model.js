import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book Title is required"],
    },
    description: {
      type: String,
    },
    author: {
      type: String,
      required: [true, "Book Author is required"],
    },
    thumbnail: {
      type: String,
    },
    year: {
      type: Number,
    },
    publisher: {
      type: String,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
    },
    language: {
      type: String,
    },
    pages: {
      type: Number,
    },
    genres: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
