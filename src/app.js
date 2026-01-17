import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import crypto from "crypto"

const app = express()
app.use(cors({
  origin: "https://to-do-management.netlify.app",
  credentials: true
}));
app.options("*", cors());
app.use(morgan())
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)
//Generate secret key
// const key = crypto.randomBytes(64).toString("hex")
// console.log(key)

app.get("/",(req,res)=>{
    res.send("<h1>helloworld</h1>")
})


export default app

