import mongoose from "mongoose";




const borrowBookModule = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true }
  },
  { timestamps: true,
    versionKey: false
   }
);

const BorrowBook = mongoose.model("BorrowBook", borrowBookModule);
export default BorrowBook;
