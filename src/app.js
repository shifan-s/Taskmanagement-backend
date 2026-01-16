import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import crypto from "crypto"

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(morgan())
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)
// axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`)
axios.post(`${API}/login`, data, {
  withCredentials: true
});
const API = import.meta.env.VITE_API_URL;
//Generate secret key
// const key = crypto.randomBytes(64).toString("hex")
// console.log(key)

app.get("/",(req,res)=>{
    res.send("<h1>helloworld</h1>")
})
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://todo-management-frontend-ecru.vercel.app"
  ],
  credentials: true
}));
res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // REQUIRED for https
  sameSite: "None"     // REQUIRED for cross-site
});


export default app