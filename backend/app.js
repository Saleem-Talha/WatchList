import mongoose from "mongoose";
import "dotenv/config";
import express from "express";
import {connectMongo} from "./lib/mongo.js";
import router from "./routes/mediaItems.routes.js";
import authRouter from "./routes/auth.routes.js";
import planRouter from "./routes/planned.routes.js";


import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",               
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/media-items", router);
app.use("/api/reminders", planRouter);



const uri = process.env.MONGODB_URI;  
const port = process.env.PORT || 4000;  
await connectMongo(uri);
app.listen(port, () => {
    console.log("Server is running on port", port);
});