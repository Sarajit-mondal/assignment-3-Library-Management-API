
import express, { Request, Response } from 'express'
import { borrowBookSchems } from '../schemas/borrowBook.schema';
import Book from '../models/bookModule';
import BorrowBook from '../models/borrowBookModule';

export const borrowBookRoute = express.Router();


borrowBookRoute.post('/',async(req:Request,res:Response | any)=>{
   const body = borrowBookSchems.safeParse(req.body);
   const quantity = body.data?.quantity;
   const bookId= body.data?.book;

   if(!body.success){
   return res.status(404).json({message: "'Validation error'"})
   }

   try {
    const book = await Book.findById(bookId)
    if(!book) return res.status(404).json({message: "Book not found"})
    
//    check book copies less then quantity
 if(book.copies < quantity!){
     return res.status(400).json({ message: "Not enough copies available" });
 }

 //deduct copies
  book.deductCopies(quantity!);
  await book.save()

 const borrow = await BorrowBook.create(body.data)

 res.status(201).json({
    success:true,
    message : "Book borrowed successfully",
    data : borrow
 })
   } catch (error) {
    console.error("Borrow error:", error);
    res.status(500).json({ message: "Failed to borrow book", error });
   }

   
})