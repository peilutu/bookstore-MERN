import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

//Route for Save a now book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.publishYear || !req.body.author) {
      return res.status(400).send({
        message: "Send all required fields:title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    console.log("get all books");
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Get one book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const book = await Book.find({ _id: id });
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Update a book
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, { ...req.body });
    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).json({ message: "book updated successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//delete a book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "book not found" });
    }
    return res.status(200).json("book deleted");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
