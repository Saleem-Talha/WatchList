import mongoose from 'mongoose';
import "dotenv/config"; 

const uri = process.env.MONGODB_URI;
export async function connectMongo(uri){
    try{
       await mongoose.connect(uri);
        console.log("MongoDB connected");
    }catch(err){
        console.error("MongoDB connection error:", err);
    }
}