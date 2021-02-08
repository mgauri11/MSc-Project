import mongoose from "mongoose";
import { Schema } from 'mongoose'

//Create Schema
const InfoSchema = new Schema({
    
    Module: {

        type: String,

        required: true
        
    },
    Module_Leader: {
        
        type: String,

        required: true
    },
    Course: {

        type: String,

        required: true

    },
   
    Semester: {

        type: String,

        required: true

    }
      
});

const Info = mongoose.model("infos", InfoSchema);
export default Info;
