import mongoose from "mongoose";
import { Schema } from 'mongoose'

//Create Schema
const   YearSchema = new Schema({

    Year: {

        type: String,

        required: true

    }    
 
});



const Year = mongoose.model("years", YearSchema);

export default Year;
