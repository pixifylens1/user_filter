import mongoose from "mongoose"; // Importing mongoose

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }

},{timestamps:true});

export default mongoose.model("User",userSchema); // Exporting model "User" that uses the userSchema