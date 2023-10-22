import Express from "express";
import {connectDb} from "./db/db.js";
import Router from "./routes/user.js";
const app = Express();
app.use(Express.json());


connectDb();


app.use("/api/v1", Router);
app.use("/api/v1", Router);
app.listen(4000, (req, res) => {
    console.log("server connected with port 4000")
})