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
// All Task
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

// Single Task
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
// Delete Task
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
            message : "Sucessfully delted Your Task"
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

// Update Task
export const updateTask = async (req,res) => {
    try {
    const { name, description, status, color, frequency, days, repeat, tag } = req.body;

    // Validate fields
   

    // Update task by slug
    const task = await Task.findOneAndUpdate(
      { slug: req.params.slug },         
      { ...req.body, slug: slugify(name) },
      { new: true }                     
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error updating task: ${error.message}`,
      error,
    });
  }
}