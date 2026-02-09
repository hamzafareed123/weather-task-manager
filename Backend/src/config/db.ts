import mongoose from "mongoose";
import { ENV } from "./env";


export const dbConnect=async()=>{
    try {
        if (!ENV.MONGO_URL) {
            throw new Error("MONGO_URL not set in environment variables");
        }
        await mongoose.connect(ENV.MONGO_URL)
        console.log("✅ Database Connected Successfully")
    } catch (error) {
        console.error("❌ Error in connecting Database:", error)        
    }
}