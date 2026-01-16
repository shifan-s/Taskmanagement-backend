import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import crypto from "crypto"

const app = express()
const API = import.meta.env.VITE_API_URL;
app.use(cors({
  origin: [
    "https://todo-management-frontend-ecru.vercel.app"
  ],
  credentials: true
}));
res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // REQUIRED for https
  sameSite: "None"     // REQUIRED for cross-site
});


app.use(morgan())
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)
// axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`)
axios.post(`${API}/login`, data, {
  withCredentials: true
});

//Generate secret key
// const key = crypto.randomBytes(64).toString("hex")
// console.log(key)

app.get("/",(req,res)=>{
    res.send("<h1>helloworld</h1>")
})


export default app

