

import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';


const bookSchema = new Schema<IBook>(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String},
    isbn: { type: String},
    description: { type: String},
    copies: { type: Number },
    available: { type: Boolean },
  },
  { timestamps: true,
    versionKey: false,
   },
  
);

const Book = model<IBook>('Book', bookSchema);
export default Book;
