import Task from "../models/taskSchema.js";
import slugify from "slugify";

export const createTask = async(req,res) => {
    try{
        const {name,description,status,cardColor,frequency,days,repeat,tag} = req.body
        console.log(req.body)
        if(!name || !description || !status || !cardColor || !frequency || !repeat || !tag ){
            return res.status(400).json({
                success : false,
                message : "please fill all tasks field"
            })
        }

        const task = new Task({...req.body,slug:slugify(name)})

        await task.save()
        res.status(201).json({
            success : true,
            message : "New Task has been Created Successfully",
            task
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in Task Creation ${error}`,
            error
        })
    }
}

export const getAllTasks = async(req,res) => {
    try{
        const tasks = await Task.find({})

        res.status(200).json({
            success : true,
            message : "Successfully fetch all Tasks",
            count :tasks.length,
            tasks
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in fetching all Task ${error}`,
            error
        })
    }
}

export const getSingleTask = async(req,res) => {
    try{
        const task = await Task.findOne({ slug : req.params.slug})

        res.status(200).json({
            success : true,
            message : "Successfully fetch Task",
            task
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in fetching all Task ${error}`,
            error
        })
    }
}

export const deleteTask = async (req,res) => {
    try{
        const alreadyDeleteTask = await Task.findById(req.params.tid)

        if(!alreadyDeleteTask){
            return res.status(200).json({
                success : false,
                message : "NO Task found"
            })
        }

        await Task.findByIdAndDelete(req.params.tid)

        res.status(200).json({
            success : true,
            message : "Product has been deleted successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in Delete Task ${error}`,
            error
        })
    }
}

export const updateTask = async (req,res) => {
    try{
        const {name,description,status,cardColor,frequency,days,repeat,tag} = req.body

        if(!name || !description || !status || !cardColor || !frequency || !days || !repeat || !tag ){
            return res.status(400).json({
                success : false,
                message : "please fill"
            })
        }

        const task = await Task.findByIdAndUpdate(
            req.params.tid,
            {...req.body,slug:slugify(name)},
            {new:true}
        )

        await task.save()

        res.status(201).json({
            success : true,
            message : "Product updated Successfully",
            task
        })
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false ,
            message :`Error in update Task ${error}`,
            error
        })
    }
}