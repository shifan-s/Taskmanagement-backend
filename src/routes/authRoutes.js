import express from "express"
import { login, logOut, signUp, testController } from "../controllers/authControllers.js"
import { isLoggedIn } from "../middlewares/authMiddlewares.js"

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logOut)
router.get("/test",isLoggedIn,testController)
router.get("/user-auth",isLoggedIn,(req,res)=>{
    res.status(200).json({
        ok : true
    })
})

export default router