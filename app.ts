import { Application, Request, Response } from "express"
import { bookRoute } from "./src/routes/bookRoute"
import express from 'express';

const app:Application = express()
app.use(express.json())

 app.use('/api/books',bookRoute)


app.get('/', (req:Request, res:Response) => {
  res.send('Library Management sever is ranning....')
})



export default app;

