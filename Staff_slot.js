import mongoose from "mongoose";
import { Schema } from 'mongoose'

//Create Schema
const StaffSlotSchema = new Schema({
    Staff_Slot: [{
    
        day_date: String,

        slot_time: [String]  
    }]

});

const Staff_Slot = mongoose.model("Staffslots", StaffSlotSchema);

export default Staff_Slot;
