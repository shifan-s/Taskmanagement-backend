import express from "express"
import { createTask, deleteTask, getAllTasks, getSingleTask, updateTask } from "../controllers/taskControllers.js"
import { isLoggedIn } from "../middlewares/authMiddlewares.js"

const router =express.Router()

router.post("/create-task",isLoggedIn,createTask)
router.get("/all-tasks",getAllTasks)
router.get("/single-task/:slug",getSingleTask)
router.delete("/delete-task/:tid",isLoggedIn,deleteTask)
router.put("/update-task/:tid",isLoggedIn,updateTask)

export default router