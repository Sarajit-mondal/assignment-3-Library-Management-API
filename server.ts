import { Server } from "http";
import app from "./app";
import env from "./src/config/env";
import connectDB from "./src/config/connectDB";

let server : Server;
const port = env.port;


async function main() {
  try {
     // mongodb connect with mongoose
     connectDB()

      server =  app.listen(port ,()=>{
     console.log(`server is ranning  http://localhost:${port}`)
})
  } catch (error) {
     console.log(error)
  }
}

main()