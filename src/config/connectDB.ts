import mongoose from "mongoose";
import env from "./env";


async function connectDB() {
    try {
        await mongoose.connect(env.mongodb_url as string)
        console.log("mongodb connected")
    } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1); // Exit if DB connection fails
    }
}

export default connectDB;
