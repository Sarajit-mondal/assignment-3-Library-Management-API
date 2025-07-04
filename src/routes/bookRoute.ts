// src/routes/book.route.ts
import express, { Request, Response, NextFunction } from 'express';
import Book from '../models/bookModule';
import { bookSchema, BookUpdateSchema } from '../schemas/book.schema';


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
bookRoute.post('/', async (req: Request, res: Response | any, next) => {
  const parsed = bookSchema.safeParse(req.body);

  if (!parsed.success) {
     // 1. Get the tidy { field: ["msg"] } map
  const fieldErrors = parsed.error.flatten().fieldErrors;

  // 2. Pick the first error string for a human‑readable summary
  const firstMessage =
    Object.values(fieldErrors).flat()[0] ?? "Validation error";

  // 3. Respond with both pieces
  return res.status(400).json({
    message: firstMessage,  // ← toast‑friendly summary
    errors: fieldErrors,    // ← detailed map for inline field displays
  })
  }

  try {
    const newBook = await Book.create(parsed.data);

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    return next(error); // Pass to global error handler
  }
});


// PUT /api/books/:bookId
bookRoute.put("/:bookId", async (req: Request, res: Response | any,next) => {
  const bookId = req.params.bookId;
 
  const parsed = BookUpdateSchema.safeParse(req.body);
  const available = parsed.data?.copies === 0 ? false : true;
  const updateData ={
    ...parsed.data,
    available
  }

  if (!parsed.success) {
       // 1. Get the tidy { field: ["msg"] } map
  const fieldErrors = parsed.error.flatten().fieldErrors;

  // 2. Pick the first error string for a human‑readable summary
  const firstMessage =
    Object.values(fieldErrors).flat()[0] ?? "Validation error";

  // 3. Respond with both pieces
  return res.status(400).json({
    message: firstMessage,  // ← toast‑friendly summary
    errors: fieldErrors,    // ← detailed map for inline field displays
  })
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      updateData,
      { new: true, runValidators: true }
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
bookRoute.delete("/:bookId", async (req: Request, res: Response | any,next) => {
  const bookId = req.params.bookId;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
     
    const error: any = new Error("Book not found");
    error.statusCode = 400;
  
    return next(error);
  
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