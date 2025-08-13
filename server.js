import app from "./src/app.js";
import colors from "colors"
import config from "./src/config/config.js";
import mongoose from "mongoose";

//DB Connection
(async(req,res) => {
    try{
        await mongoose.connect(config.MONGODB_URL)
        console.log("Successfully Connected to the mongoDB".bgBlack.green)
    }catch(error){
        console.log(`Error in DB connection ${error}`.bgRed.white)
        res.status(500).json({
            success : false,
            message :" Error in DB Connection",
            error
        })
    }
})()

const PORT = config.PORT

app.listen(PORT , ()=>{
    console.log(`App is running at PORT :${PORT} successfully`.rainbow)
})