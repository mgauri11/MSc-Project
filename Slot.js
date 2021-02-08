import mongoose from "mongoose";
import { Schema} from 'mongoose'

//Create Schema
const SlotSchema = new Schema({
    
    Slot: {

        type: String,

        required: true

    }  
});

const Slot = mongoose.model("slots", SlotSchema);

export default Slot;
