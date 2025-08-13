import JWT from "jsonwebtoken"
import config from "../config/config.js"

//Checking for logged in
export const isLoggedIn = (req,res,next) => {
    try{
        const decode = JWT.verify(req.headers.authorization,config.JWT_SECRET)
        res.user =decode
        next()

    }catch(error){
        console.log(error)
    }
}