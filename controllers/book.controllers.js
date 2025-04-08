export const createBook = async (req, res, next) => {
  try {
    res.send({ message: "POST a book" });
  } catch (error) {
    next(error);
  }
};
