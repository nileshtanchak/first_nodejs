import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,

    },
    email:{
        uniqe: true,
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    createdAt:{
type: Date,
default: Date.now
    }
})


export const user = mongoose.model("user", userSchema);