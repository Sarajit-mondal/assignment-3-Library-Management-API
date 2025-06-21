import { Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: 'SCIENCE' | 'FICTION' | 'HISTORY' | 'BIOGRAPHY' | 'TECHNOLOGY' | 'OTHER'; // You can expand genres as needed
  isbn: string;
  description: string;
  copies: number;
  available: boolean;

  deductCopies(quantity:number):void;
}