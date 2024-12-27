import express from "express"
import cors from "cors"
import { connectDB } from "./utils/config.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"  // Add this import
import userRouter from "./routes/user.js"
import chatRouter from "./routes/chat.js"

// Load environment variables first
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());  
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// using multer for avatar so no need to use urlencoded middleware


// mongoose connect with env var
connectDB(process.env.DB_URI);

app.use("/user",userRouter);
app.use("/chat",chatRouter);

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})