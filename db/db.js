
import mongoose from "mongoose";


export const connectDb = () => {
    mongoose.connect("mongodb://localhost:27017/myDB" ,{useNewUrlParser: true,
useUnifiedTopology: true}).then(() => {
    console.log("dbconnected");
}).catch ((e) => {
    console.log(`Error ${e.message}`);
})
}