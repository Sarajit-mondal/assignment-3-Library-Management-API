

import { z } from 'zod';

const genreEnum = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY"
] as const;
 export const bookSchema  = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
 genre: z.string().refine(
    (val) => genreEnum.includes(val as any),
    { message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY" }
  ),
  isbn: z.string().min(10).max(17), // You can refine with regex if needed
  description: z.string().min(10, "Description should be at least 10 characters"),
  copies: z.number().int().positive(),
  available: z.boolean(),
});

