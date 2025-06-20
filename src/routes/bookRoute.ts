// src/routes/book.route.ts
import express, { Request, Response } from 'express';
import { bookSchema } from '../schemas/book.schema';
import Book from '../models/bookModule';


export const bookRoute = express.Router();

// ✅ GET /books - Get all books
bookRoute.get('/', async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('GET /books error:', error);
    res.status(500).json({ message: 'Server error' });
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
