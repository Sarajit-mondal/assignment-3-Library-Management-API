

import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';


const bookModule = new Schema<IBook>(
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
    versionKey: false
  }
);

// instance method
bookModule.methods.deductCopies = function(quantity:any){
  this.copies -= quantity
  if(this.copies <=0){
    this.available = false;
    this.copies = 0;
  }
}


const Book = model<IBook>('Book', bookModule);
export default Book;
