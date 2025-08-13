import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true ,"Task Name is Required"],
        trim : true,
        maxLength : [15,"Task Name should not exceed 15 chars"]
    },
    slug : {
        type : String,
        lowercase : true
    },
    description : {
        type : String,
        required : [true,"Product description is required"],
        trim : true,
        maxlength:[100,"description should not exceed 100 char"]
    },
    status : {
        type : String,
        required : true
    },
    cardColor : {
        type : String,
        required : true
    },
    frequency :{
        type : String,
        required : true
    },
    days :{
        type : [String],
        required : false
    },
    repeat : {
        type : String,
        required : true
    },
    tag : {
        type :String,
        required : true
    }
},{
    timestamps:true //  timestamps create creating time and updating time in model
})

export default  mongoose.models.Task || mongoose.model("Task",taskSchema)