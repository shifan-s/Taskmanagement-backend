import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required "],
        trim : true,
        maxLength :[20,"Name should not exceed 20 chars"]

    },
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : true //set for unique
    },
    password : {
        type : String,
        required : true,
        minLength : [8,"Password Should contain at least 8 char"],
        select : false //password protection
    }
},{
    timestamps:true //  timestamps create creating time and updating time in model
})

//for password hashing and protection
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next()
    this.password = await bcrypt.hash(this.password,10)
})

//compare password
userSchema.methods = {
    comparePassword : async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword,this.password)
    }
}

export default mongoose.model("User",userSchema)