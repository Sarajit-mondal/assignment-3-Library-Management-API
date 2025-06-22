import { Application, Request, Response } from "express"
import { bookRoute } from "./src/routes/bookRoute"
import express from 'express';
import { borrowBookRoute } from "./src/routes/borrowBookRoute";
import globalErrorHandler from "./src/middlewares/globalErrorHandler";

const app:Application = express()
app.use(express.json())


// routers
 app.use('/api/books',bookRoute)
 app.use('/api/borrow',borrowBookRoute)



// ✅ Error handler should be the **last middleware**
app.use(globalErrorHandler);
app.get('/', (req:Request, res:Response) => {
  res.send('Library Management sever is ranning....')
})



export default app;

