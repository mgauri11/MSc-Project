import mongoose from "mongoose";
import { Schema } from 'mongoose'
//Create Schema
//Reference for register and login is taken from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
//I have made modifications to the solutiona and used it in both staff and student backend and mongoDB database model files.

const UserSchema = new Schema({
    
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }  
});

const User = mongoose.model("users", UserSchema);

export default User;
