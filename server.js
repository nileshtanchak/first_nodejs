import Express from "express";
import http from "http";
import Router from "./routes/user.js";
import {connectDb} from "./db/db.js";
import bodyParser from "body-parser";
import {init} from './Socket/socket.js';
const app = Express();
app.use(Express.json());
app.use(bodyParser.json());


connectDb();


app.use("/api/v1", Router);



const server = http.createServer(app);

server.listen(3000, "0.0.0.0", (req, res) => {
    console.log("server connected with port 3000")
})
// init(server);   