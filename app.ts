import { Application, Request, Response } from "express"
import { bookRoute } from "./src/routes/bookRoute"
import express from 'express';
import { borrowBookRoute } from "./src/routes/borrowBookRoute";
import globalErrorHandler from "./src/middlewares/globalErrorHandler";
import cors from 'cors';
const app:Application = express()
app.use(express.json())

app.use(
  cors({
    origin: ['http://localhost:5174', 'https://labrary-mangement-clint.vercel.app',"*"],
    credentials:true
   })
);

// routers
 app.use('/api/books',bookRoute)
 app.use('/api/borrow',borrowBookRoute)



// ✅ Error handler should be the **last middleware**
app.use(globalErrorHandler);
app.get('/', (req:Request, res:Response) => {
  res.send('Library Management sever is ranning....')
})



export default app;

