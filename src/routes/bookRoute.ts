// src/routes/book.route.ts
import express, { Request, Response } from 'express';
import { bookSchema } from '../schemas/book.schema';
import Book from '../models/bookModule';


export const bookRoute = express.Router();

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
