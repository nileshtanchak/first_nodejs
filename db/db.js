
import mongoose from "mongoose";
import dotEnv from "dotenv";
dotEnv.config();



export const connectDb = () => {
console.log("Mongo Url " + process.env.MONGOURL);


    mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true,
useUnifiedTopology: true}).then(() => {
    console.log("dbconnected");
}).catch ((e) => {
    console.log(`Error ${e.message}`);
})
}