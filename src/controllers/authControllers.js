import User from "../models/userSchema.js";
import config from "../config/config.js";
import JWT from "jsonwebtoken";
/* SignUp Controller for user
Validates user input, creates a new user record
Responds with appropriate error messages for invalid input or duplicate accounts. */ 

export const signUp = async (req,res) => {
    try{

        const {name,email,password} = req.body

        //Validation
        if(!name || !email || !password){
            res.status(400).json({
                success : false,
                message : "Please fill all the required fields : : name, email, password"
            })
        }

        //check if the data is already exist
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(200).json({
                success : false,
                message :"you have already signup"
            })
        }
        //Create a new User in db
        const user = await User.create({
            name,
            email,
            password
        })
        //for safety
        user.password =undefined
        //send sucess message to frontend
        res.status(201).json({
            success : true,
            message : "user successfully signed",
            user
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in Sign Up ${error}`,
            error
        })
    }
}

export const cookieOptions ={
    expires :  new Date (Date.now()+10*24*60*60*1000),
    httpOnly : true
}

export const login = async (req,res) => {
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Fill All The Fields"
            })
        }

        const user =await User.findOne({email}).select("+password")

        if (!user){
            return res.status(404).json({
                success : false,
                message : "User not found please signup"
            })
        }

        const isPasswordMatched = await user.comparePassword(password)
        if(!isPasswordMatched){
            return res.status(400).json({
                success : false,
                message : "password Invalid"
            })
        }
        //if password match generate JWT token
        const token = JWT.sign({id :user._id},config.JWT_SECRET , {expiresIn :config.JWT_EXPIRY})

        user.password = undefined

        res.cookie("token",token,cookieOptions)

        res.status(200).json({
            success : true,
            message : "Sucessfully logged in",
            user : {
                id:user._id,
                name : user.name,
                email : user.email
            },
            token
        })



    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in Login ${error}`,
            error
        })
    }
}

export const logOut = async (req,res) => {
    try{
        res.cookie("token",null,{
            expires : new Date (Date.now()),
            httpOnly : true,
        })

        res.status(200).json({
            success : true,
            message : "Successfully logged out"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in LogOut ${error}`,
            error
        })
    }
}

export const testController = (req,res) =>{
    res.send("protect route")
}