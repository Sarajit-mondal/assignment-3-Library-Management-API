// src/routes/book.route.ts
import express, { Request, Response } from 'express';
import { bookSchema } from '../schemas/book.schema';
import Book from '../models/bookModule';


export const bookRoute = express.Router();


bookRoute.get("/:bookId", async (req: Request, res: Response | any) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success : true,
      message : "Book retrieved successfully",
      data : book
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Failed to fetch book", error });
  }
});

// ✅ GET /books - Get all books
bookRoute.get("/", async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const filterGenre = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Build filter object
    const filter: any = {};
    if (filterGenre) {
      filter.genre = filterGenre.toUpperCase();
    }

    // Query from database
    const books = await Book.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    res.status(200).json({
      success: true,
      message : "Books retrieved successfully",
      data : books
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});




// ✅ POST /books - Create a new book
bookRoute.post('/', async (req: Request, res: Response | any) => {
  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(404).json({
      message: 'Validation error',
      errors: parsed.error.format(),
    });
  }

  try {
    const newBook = await Book.create(parsed.data);
    return res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook
    });
  } catch (error) {
    console.error('POST /books error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


// PUT /api/books/:bookId
bookRoute.put("/:bookId", async (req: Request, res: Response | any) => {
  const bookId = req.params.bookId;
  const updateData = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      updateData,
      { new: true, runValidators: true } // return the updated doc & validate fields
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update book", error });
  }
});


// DELETE /api/books/:bookId
bookRoute.delete("/:bookId", async (req: Request, res: Response | any) => {
  const bookId = req.params.bookId;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete book", error });
  }
});